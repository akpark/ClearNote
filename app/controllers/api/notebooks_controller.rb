class Api::NotebooksController < ApplicationController

  def index
    @notebooks = current_user.notebooks
  end

  def show
    @notebook = Notebook.find(params[:id])
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.author_id = current_user.id
    if @notebook.save
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy
    render :show
  end

  private
  def notebook_params
    params.require(:notebook).permit(:title)
  end

end
