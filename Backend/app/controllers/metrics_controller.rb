# frozen_string_literal: true

# POST metrics
class MetricsController < ApplicationController
  # POST /metrics
  def create
    @metric = Metric.new(metric_params.merge(timestamp: Time.current))

    render json: @metric, status: :created, location: @metric if @metric.save!
  end

  private

  # Only allow a list of trusted parameters through.
  def metric_params
    params.require(:metric).permit(:name, :value)
  end
end
