# Seed for demo purposes. Do not use in production!

current = 1.months.ago
to = Time.current

loop do
  Metric.create(name: 'pv', value: rand * 100, timestamp: current)
  current += (rand * 60).seconds
  break unless current < to
end

MetricAverage.calculate_averages
