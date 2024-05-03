class MetricAverageFilter
  include ActiveModel::Model
  attr_accessor :timespan, :from, :to

  validates :timespan, :from, :to, presence: true
end
