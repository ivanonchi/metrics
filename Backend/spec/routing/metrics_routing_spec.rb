require "rails_helper"

RSpec.describe MetricsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/metrics").to route_to("metrics#index")
    end

    it "routes to #create" do
      expect(post: "/metrics").to route_to("metrics#create")
    end
  end
end
