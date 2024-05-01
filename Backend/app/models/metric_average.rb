# Stores the average value of a metric in a timespan
class MetricAverage < ApplicationRecord
  enum :timespan, { minute: 'minute', hour: 'hour', day: 'day' }

  class << self
    def calculate_averages
      averages_per_timespan('minute')
      averages_per_timespan('hour')
      averages_per_timespan('day')
    end

    def averages_per_timespan(timespan)
      last_timespan = 1.public_send(timespan).ago.public_send("beginning_of_#{timespan}")
      last_average = MetricAverage.public_send(timespan).last
      return unless last_average.nil? || last_average.timestamp < last_timespan

      # Process old metrics in case there was some issue
      process_timespan_averages_until(timespan, last_timespan)

      # Calculate previous minute average
      average_for(timespan, last_timespan)
    end

    private

    def process_timespan_averages_until(timespan, last_timespan)
      last_average = MetricAverage.public_send(timespan).last
      if last_average.nil? && Metric.first.present?
        process_old_averages(timespan, Metric.first.timestamp, last_timespan)
      elsif last_average.timestamp < last_timespan
        process_old_averages(timespan, last_average.timestamp + 1.public_send(timespan), last_timespan)
      end
    end

    def process_old_averages(timespan, from, to)
      current = from
      while current < to
        average_for(timespan, current)
        current += 1.public_send(timespan)
      end
    end

    def average_for(timespan, datetime)
      timespan_beginning = datetime.public_send("beginning_of_#{timespan}")
      timespan_end = timespan_beginning.public_send("end_of_#{timespan}")
      metrics = Metric.where(timestamp: timespan_beginning..timespan_end)
      averages = metrics.group(:name).average(:value)
      averages.each do |metric_name, average|
        MetricAverage.create!(name: metric_name, average: average, timestamp: timespan_beginning, timespan: timespan)
      end
    end
  end
end
