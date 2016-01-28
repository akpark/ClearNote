class Api::NotebooksController < ApplicationController

  def index
    @notebooks = Notebook.all
  end

  def new

  end

  def show
    @notebook = Notebook.find(params[:id])
  end

  def create
    @notebook.create(notebook_params)
  end

  def update

  end

  def destroy

  end

  private
  def notebook_params
    params.require(:notebook).permit(:title)
  end

end
