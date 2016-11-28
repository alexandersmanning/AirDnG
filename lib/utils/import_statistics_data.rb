require 'csv'
require 'json'
require 'byebug'
require 'descriptive_statistics'

def parse_file(file_name)
  text = File.read(file_name)
             .encode('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
             .gsub(/(?<!\\)\\"/,'""')

  CSV.parse(text, headers: true, header_converters: :symbol).map do  |csv_line|
    csv_line
  end
end

def neighborhood_breakdown(listings)
  neighborhood_list = Hash.new() { |h,k| h[k] = {
    price: [], num_available: 0, avail_low: 0, avail_high: 0,
    entire_house: { price: [], num_available: 0, avail_low: 0, avail_high: 0 },
    private_room: { price: [], num_available: 0, avail_low: 0, avail_high: 0 },
    shared_room: { price: [], num_available: 0, avail_low: 0, avail_high: 0 }
    }
  }

  listings.each do |entry|
    neighborhood = entry[:neighbourhood]

    case entry[:room_type]
    when "Entire home/apt"
      neighborhood_hash = neighborhood_list[neighborhood][:entire_house]
    when "Private room"
      neighborhood_hash = neighborhood_list[neighborhood][:private_room]
    when "Shared room"
      neighborhood_hash = neighborhood_list[neighborhood][:shared_room]
    end

    update_hash(neighborhood_hash, entry)
    update_hash(neighborhood_list[neighborhood], entry)
  end

  neighborhood_list
end

def update_hash(neighborhood_hash, entry)
  neighborhood_hash[:price].push(entry[:price])
  neighborhood_hash[:num_available] += 1;

  if entry[:availability_365].to_i > 90
    neighborhood_hash[:avail_high] += 1
  else
    neighborhood_hash[:avail_low] += 1
  end

  neighborhood_hash
end

def statistics_by_neighborhood(listing_breakdown)
  byebug
  listing_breakdown.keys.each do |neighborhood|
    set_stats(listing_breakdown[neighborhood])

    [:entire_house, :private_room,:shared_room].each do |room_type|
      neighborhood_hash =  listing_breakdown[neighborhood][room_type]
      set_stats(neighborhood_hash)
    end
  end

  listing_breakdown
end

def set_stats(neighborhood_hash)
  price = neighborhood_hash[:price]
  neighborhood_hash[:average_price] = price.mean
  neighborhood_hash[:median_price] = price.median
  neighborhood_hash[:twenty_fifth] = price.percentile(25)
  neighborhood_hash[:seventy_fifth] = price.percentile(75)
  neighborhood_hash[:std_dev] = price.standard_deviation
end

def write_list(list, file_location)
  File.open(file_location, 'w' ) do |f|
    f.write(list.to_json)
  end
end


#average_price: 0, median_price: 0, twenty_fifth:0, seventy_fifth: 0, std_dev:0