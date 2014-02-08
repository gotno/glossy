class Api::SectionsController < ApplicationController
  def destroy
    @section = Section.find(params[:id])
    @section.destroy
    render json: @section
  end
end
