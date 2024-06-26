require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe '/metrics', type: :request do
  # This should return the minimal set of attributes required to create a valid
  # Metric. As you add validations to Metric, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) do
    {
      name: 'pv',
      value: 5
    }
  end

  let(:invalid_attributes) do
    {}
  end

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
      value: 5.0
    }.stringify_keys
  end

  let(:response_body) do
    JSON.parse(response.body)
  end

  describe 'POST /create' do
    before do
      travel_to Time.current
    end

    context 'with valid parameters' do
      it 'creates a new Metric' do
        expect do
          post metrics_url,
               params: { metric: valid_attributes }, headers: valid_headers, as: :json
        end.to change(Metric, :count).by(1)
      end

      it 'renders a JSON response with the new metric' do
        post metrics_url,
             params: { metric: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including('application/json'))
        expect(response_body).to include(valid_response)
        expect(Time.parse(response_body['timestamp'])).to eq(Time.current)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Metric' do
        expect do
          post metrics_url,
               params: { metric: invalid_attributes }, as: :json
        end.to change(Metric, :count).by(0)
      end

      it 'renders a JSON response with errors for the new metric' do
        post metrics_url,
             params: { metric: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:bad_request)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end
  end
end
