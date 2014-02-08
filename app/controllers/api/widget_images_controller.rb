class Api::WidgetImagesController < ApplicationController
  def create
    @widget = WidgetImage.new(params[:widget_image]);

    if @widget.save
      render json: @widget
    else
      render json: @widget.errors.full_messages, status: 422
    end
  end

  def update
    @widget = WidgetImage.find(params[:id])

    if @widget.update_attributes(params[:widget_image])
      render json: @widget
    else
      render json: @widget.errors.full_messages, status: 422
    end
  end

  def destroy
    @widget = WidgetImage.find(params[:id])
    @widget.destroy
    render json: @widget
  end
end
