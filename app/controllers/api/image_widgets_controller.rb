class Api::ImageWidgetsController < ApplicationController
  def create
    @widget = ImageWidget.new(params[:image_widget]);

    if @widget.save
      render json: @widget
    else
      render json: @widget.errors.full_messages, status: 422
    end
  end

  def update
    @widget = ImageWidget.find(params[:id])

    if @widget.update_attributes(params[:image_widget])
      render json: @widget
    else
      render json: @widget.errors.full_messages, status: 422
    end
  end

  def destroy
    @widget = ImageWidget.find(params[:id])
    @widget.destroy
    render json: @widget
  end
end
