require 'rails_helper'

RSpec.describe MetricAverage, type: :model do
  describe 'averages_per_timespan' do
    before do
      create(:metric, name: 'pv', value: '10', timestamp: '2024-04-30 15:59:00')
      create(:metric, name: 'pv', value: '1', timestamp: '2024-04-30 16:00:00')
      create(:metric, name: 'pv', value: '2', timestamp: '2024-04-30 16:00:01')
      create(:metric, name: 'pv', value: '3', timestamp: '2024-04-30 16:00:02')
      create(:metric, name: 'pv', value: '4', timestamp: '2024-04-30 16:01:00')
    end

    it 'calculates minute averages' do
      travel_to '2024-04-30 16:01:00'
      expect { MetricAverage.averages_per_timespan('minute') }.to change(MetricAverage, :count).by(2)
      expect(MetricAverage.first.average).to eq(10)
      expect(MetricAverage.second.average).to eq(2)
    end

    it 'calculates hour averages' do
      travel_to '2024-04-30 17:00:00'
      expect { MetricAverage.averages_per_timespan('hour') }.to change(MetricAverage, :count).by(2)
      expect(MetricAverage.first.average).to eq(10)
      expect(MetricAverage.second.average).to eq(2.5)
    end

    it 'calculates day averages' do
      travel_to '2024-05-01 00:00:00'
      expect { MetricAverage.averages_per_timespan('day') }.to change(MetricAverage, :count).by(1)
      expect(MetricAverage.first.average).to eq(4)
    end
  end
end
