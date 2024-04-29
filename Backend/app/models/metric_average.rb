class MetricAverage < ApplicationRecord
  enum :timespan, { minute: 'minute', hour: 'hour', day: 'day' }

  class << self
    def calculate_averages
      averages_per_minute
      # averages_per_hour
      # averages_per_day
    end

    def averages_per_minute
      last_minute = 1.minute.ago.beginning_of_minute

      # Process old metrics in case there was some issue
      last_average = MetricAverage.minute.last
      if last_average.nil? && Metric.first.present?
        process_old_metrics(Metric.first.timestamp, last_minute)
      elsif last_average.timestamp < last_minute
        process_old_metrics(last_average.timestamp, last_minute)
      end

      # Process previous minute metrics
      average_for_minute(last_minute)
    end

    def process_old_metrics(from_minute, to_minute)
      current_minute = from_minute
      while current_minute < to_minute
        average_for_minute(current_minute)
        current_minute += 1.minute
      end
    end

    def average_for_minute(minute)
      minute_beginning = minute.beginning_of_minute
      minute_end = minute_beginning.end_of_minute
      metrics = Metric.where(timestamp: minute_beginning..minute_end)
      averages = metrics.group(:name).average(:value)
      averages.each do |metric_name, average|
        MetricAverage.create!(name: metric_name, average: average, timestamp: minute_beginning, timespan: 'minute')
      end
    end
  end
end
