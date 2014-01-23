class Api::SectionsController < ApplicationController
  def destroy
    @section = Section.find(params[:id])
    @section.widgets.each do |widget|
      widget.destroy
    end

    @section.destroy
    render json: @section
  end
end
