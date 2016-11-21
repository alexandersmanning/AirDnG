require 'csv'
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
 "i'll"=>true
}

PHRASES = [
  "golden gate park",
  "golden gate bridge",
  "san francisco",
  "the mission",
  "walking distance",
  "ocean beach",
  "lands end",
  "the presidio",
  "gg bridge",
  "gg park"
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
  word_set = Hash.new(0)

  listings.each do |entry|
    next if entry[:description].nil?
    entry_description = clean_text(entry[:description])
    reg =Regexp.new("(#{PHRASES.join('|')})|\s+")
    entry_description.split(reg)
                     .delete_if(&:empty?)
                     .each do |word|
      word_set[word] += 1 unless IGNORE_WORDS[word]
    end
  end

  word_set
end

def clean_text(entry_description)
  entry_description.gsub(/[\.\,\:\-\/]+/,'').downcase
end