# frozen_string_literal: true

# GET metric averages
class MetricAveragesController < ApplicationController
  # GET /metric_averages
  # params:
  # timespan: string with valid values (minute hour day)
  # from: iso8601 date
  # to: iso8601 date
  def index
    @metric_average_filter = MetricAverageFilter.new(metric_average_filter_params)

    raise ActiveRecord::RecordInvalid, @metric_average_filter unless @metric_average_filter.valid?

    @metric_averages = MetricAverage.where(
      timespan: params[:timespan],
      timestamp: params[:from]..params[:to]
    )
    render json: @metric_averages
  end

  private

  def metric_average_filter_params
    params.permit(:timespan, :from, :to)
  end
end
