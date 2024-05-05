require 'rails_helper'

RSpec.describe '/metric_averages', type: :request do
  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # MetricsController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) do
    {}
  end

  let(:valid_response) do
    {
      name: 'pv',
      average: 1
    }.stringify_keys
  end

  let(:response_body) do
    JSON.parse(response.body)
  end

  describe 'GET /index' do
    let!(:metric_averages) do
      build_list(:metric_average, 3) do |record, i|
        record.average = i + 1
        record.timestamp = (3 - i).minutes.ago
        record.save!
      end
    end

    # This gets filtered out because of the timestamp
    let!(:out_of_range_average) do
      create(:metric_average, timestamp: 1.hour.ago)
    end

    # This  gets filtered out because of the timespan
    let!(:another_timespan_averate) do
      create(:metric_average, timespan: 'hour')
    end

    let(:query_parameters) do
      {
        timespan: 'minute',
        from: 10.minutes.ago,
        to: Time.current
      }
    end

    it 'returns minute timespans for the past 10 minutes' do
      get metric_averages_url(query_parameters), headers: valid_headers, as: :json
      expect(response).to be_successful
      expect(response_body.count).to eq(3)
      expect(response_body.first).to include(valid_response)
    end
  end
end
