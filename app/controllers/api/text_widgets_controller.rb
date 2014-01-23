class Api::TextWidgetsController < ApplicationController
  def destroy
    @text_widget = TextWidget.find(params[:id])
    @text_widget.destroy
    render json: @text_widget
  end
end
