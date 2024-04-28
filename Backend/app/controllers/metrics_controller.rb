# frozen_string_literal: true

# GET and POST metrics
class MetricsController < ApplicationController
  # GET /metrics
  def index
    @metrics = Metric.all

    render json: @metrics
  end

  # POST /metrics
  def create
    @metric = Metric.new(metric_params.merge(timestamp: Time.current))

    if @metric.save
      render json: @metric, status: :created, location: @metric
    else
      render json: @metric.errors, status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def metric_params
    params.require(:metric).permit(:name, :value)
  end
end
