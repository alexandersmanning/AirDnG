require 'csv'
require 'json'
require 'byebug'
require 'mongo'

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
 "us" => true,
 "minute" => true,
 "minutes" => true,
 "well" => true,
 "please" => true,
 "microware"=> true,
 "both" => true,
 "hour" => true,
 "don't" => true,
 "location" => true,
 "min" => true,
 "newly" => true,
 "enjoy" => true,
 "many" => true,
 "each" => true,
 "here" => true,
 "like" => true,
 "back" => true,
 "while" => true,
 "want" => true,
 "lots" => true,
 "entire" => true,
 "city" => true
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
  "laurel heights",
  "short term",
  "union square",
  "lower haight",
  "caltrain station",
  "city center",
  "treasure island",
  "twin peaks",
  "centrally located",
  "coit tower",
  "cow palace",
  "for mason",
  "cow hollow",
  "palace of fine arts",
  "nob hill",
  "back yard",
  "coit tower",
  "north beach",
  "back yard",
  "haight ashburry",
  "inner sunset",
  "outer sunset",
  "down town",
  "castro theater",
  "public parking",
  "heart of the city",
  "bay area",
  "the bay area"
]

TRANSLATE = {
  "gg bridge" => "golden gate bridge",
  "gg park" => "golden gate park",
  "back yard" => "backyard",
  "mission" => "the mission",
  "haightashbury" => "haight ashbury",
  "the haight" => "haight",
  "castro" => "the castro",
  "down town" => "downtown",
  "bay area" => "the bay area"
}

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
      word = TRANSLATE[word] || word
      word_list[neighborhood][word] += 1
    end
  end
  word_list
end

def clean_text(entry_description)
  entry_description.gsub(/[\.\,\:\-\/\(\)\!\?\$]+/,'').downcase
end

def top_100(word_list)
  limited_list = Hash.new()
  word_list.keys.each do |neighborhood|
    limited_list[neighborhood] = word_list[neighborhood].sort_by { |k,v| v }.reverse.first(100).to_h
  end

  limited_list
end

def write_to_table(word_list, city)
  byebug
  Mongo::Logger.logger.level = ::Logger::FATAL
  client = Mongo::Client.new({process.env.DB})
  word_list.keys.each do |neighborhood|
    doc = client[:wordlist].find('City': city,'Neighborhood': neighborhood)
    unless (doc.count == 0)
      doc.update_one('$set': {'Words': word_list[neighborhood]})
    else
      item = {_id: BSON::ObjectId.new, 'City': city, 'Neighborhood': neighborhood, 'Words': word_list[neighborhood]}
      client[:wordlist].insert_one(item)
    end
  end

  client.close
end


def write_word_list(word_list, file_location)
  File.open(file_location, 'w' ) do |f|
    f.write(word_list.to_json)
  end
end
