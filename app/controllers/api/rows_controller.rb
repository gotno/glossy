class Api::RowsController < ApplicationController
  def destroy
    @row = Row.find(params[:id])
    @row.widgets.each do |w|
      w.destroy
    end

    @row.destroy
    render json: @row
  end
end
