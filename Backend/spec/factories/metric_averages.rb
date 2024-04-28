FactoryBot.define do
  factory :metric_average do
    name { 'pv' }
    value { 1.5 }
    timespan { 'minute' }
    timestamp { '2024-04-27 12:43:00' }
  end
end
