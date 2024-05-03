# frozen_string_literal: true

# module that handles exceptions
module ExceptionHandler
  extend ActiveSupport::Concern

  class InvalidToken < StandardError; end

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidToken, with: :unauthorized_request
  end

  private

  def four_twenty_two(error)
    render json: { error: error.message, messages: error.record.errors }, status: :unprocessable_entity
  end

  def unauthorized_request(error)
    render json: { error: error.message }, status: :unauthorized
  end
end
