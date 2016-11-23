require 'csv'
require 'json'
require 'byebug'

IGNORE_WORDS = {
 "and"=>true,
 "the"=>true,
 "a"=>true,
 "to"=>true,
 "is"=>true,
 "in"=>true,
 "of"=>true,
 "with"=>true,
 "for"=>true,
 "you"=>true,
 "from"=>true,
 "are"=>true,
 "room"=>true,
 "on"=>true,
 "has"=>true,
 "have"=>true,
 "will"=>true,
 "or"=>true,
 "bedroom"=>true,
 "-"=>true,
 "your"=>true,
 "this"=>true,
 "be"=>true,
 "living"=>true,
 "one"=>true,
 "access"=>true,
 "2"=>true,
 "as"=>true,
 "we"=>true,
 "all"=>true,
 "i"=>true,
 "that"=>true,
 "&"=>true,
 "can"=>true,
 "located"=>true,
 "our"=>true,
 "an"=>true,
 "full"=>true,
 "two"=>true,
 "bed"=>true,
 "blocks"=>true,
 "there"=>true,
 "1"=>true,
 "at"=>true,
 "bathroom"=>true,
 "place"=>true,
 "but"=>true,
 "very"=>true,
 "street"=>true,
 "away"=>true,
 "available"=>true,
 "also"=>true,
 "queen"=>true,
 "block"=>true,
 "floor"=>true,
 "by"=>true,
 "just"=>true,
 "close"=>true,
 "my"=>true,
 "3"=>true,
 "out"=>true,
 "it"=>true,
 "if"=>true,
 "area"=>true,
 "not"=>true,
 "up"=>true,
 "other"=>true,
 "sq"=> true,
 "towels" =>true,
 "bath"=>true,
 "see"=>true,
 "would"=>true,
 "off"=>true,
 "desk"=>true,
 "tv"=>true,
 "stay"=>true,
 "bedrooms"=>true,
 "wifi"=>true,
 "so"=>true,
 "which"=>true,
 "use"=>true,
 "within"=>true,
 "no"=>true,
 "most"=>true,
 "only"=> true,
 "own"=>true,
 "get"=>true,
 "st"=>true,
 "any"=>true,
 "you'll"=>true,
 "shower"=>true,
 "laundry"=>true,
 "few"=>true,
 "its"=>true,
 "dryer"=>true,
 "bathrooms"=>true,
 "mattress"=>true,
 "internet"=>true,
 "washer"=>true,
 "than"=>true,
 "couch"=>true,
 "down"=> true,
 "off"=>true,
 "do"=>true,
 "am"=>true,
 "king"=>true,
 "proivde"=>true,
 "who"=>true,
 "throughout"=>true,
 "ceilings"=> true,
 "may"=>true,
 "come"=>true,
 "through"=>true,
 "etc"=>true,
 "see"=>true,
 "you're"=>true,
 "next"=>true,
 "'s"=>true,
 "dishwasher"=>true,
 "+"=>true,
 "i'll"=>true,
 "it's"=> true,
 "right" => true,
 "san francisco"=> true,
 "sf" => true,
 "kitchen" => true,
 "beds" => true,
 "sleeps"=> true,
 "4" => true,
 "floors"=>true,
 "closet"=> true,
 "guest" => true,
 "free"=>true,
 "rooms"=>true,
 "need"=>true,
 "some"=>true,
 "equipped"=>true,
 "easy" => true,
 "more" => true,
 "entrance" => true,
 "take" => true,
 "best" => true,
 "around" => true,
}

PHRASES = [
  "golden gate park",
  "golden gate bridge",
  "san francisco",
  "the mission",
  "walking distance",
  "ocean beach",
  "legion of honor",
  "lands end",
  "the presidio",
  "gg bridge",
  "gg park",
  "cole valley",
  "dolores park",
  "fisherman's wharf",
  "cable car",
  "noe valley",
  "the castro",
  "russian hill",
  "duboce triangle",
  "hayes valley",
  "microwave",
  "laurel heights",
  "short term",
  "union square",
  "lower haight",
  "caltrain station"
]

def parse_file(file_name)
  text = File.read(file_name)
             .encode('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
             .gsub(/(?<!\\)\\"/,'""')

  CSV.parse(text, headers: true, header_converters: :symbol).map do  |csv_line|
    csv_line
  end
end

def description_to_dictionary(listings)
  word_list = Hash.new() { |h,k| h[k] = Hash.new(0) }

  listings.each do |entry|
    next if entry[:description].nil? || entry[:neighbourhood_cleansed].nil?
    entry_description = clean_text(entry[:description])
    neighborhood = entry[:neighbourhood_cleansed]

    word_list[neighborhood][neighborhood] += 1

    reg = Regexp.new("(#{PHRASES.join('|')})|\s+")
    entry_description.split(reg)
                     .delete_if(&:empty?)
                     .each do |word|
      next if IGNORE_WORDS[word]
      word_list[neighborhood][word] += 1
    end
  end
  #how do I get the number of ads?!
  word_list
end

def convert_to_list_nodes(word_set, limit)
  nodes = Hash.new() { |h,k| h[k] = {count: 0, neighborhood: {} }}
  links = []

  word_set.keys.each do |neighborhood|
    word_set[neighborhood].sort_by { |_,v| v }
      .reverse.each_with_index do |word_list, idx|
      break if idx == limit
      word = word_list[0]
      count = word_list[1]

      nodes[word][:count] += count
      nodes[word][:id] ||= word
      # get the count of words per neighborhood
      nodes[word][:neighborhood][neighborhood] = count.to_f / word_set[neighborhood][neighborhood]

      links.push({source: word, target: neighborhood, count: count}) unless word == neighborhood
    end
  end
  return [nodes, links]
end

def get_neighborhoods(word_set, neighborhood_list)
  word_set.select { |k,v| neighborhood_list.include?(k) }
end


def clean_text(entry_description)
  entry_description.gsub(/[\.\,\:\-\/\(\)\!\?]+/,'').downcase
end

def write_file(word_list, file_location)
  File.open(file_location, 'w' ) do |f|
    word_set = { nodes: word_list[0].values, links: word_list[1] }
    f.write(word_set.to_json)
  end
end


## Things to consider: times they mention themselves vs times they mention other neighborhoods