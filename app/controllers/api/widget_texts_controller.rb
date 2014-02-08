class Api::WidgetTextsController < ApplicationController
  def destroy
    @widget = WidgetText.find(params[:id])
    @widget.destroy
    render json: @widget
  end
end
