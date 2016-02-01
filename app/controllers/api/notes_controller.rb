class Api::NotesController < ApplicationController

  def index
    @notes = Note.all
  end

  def new
    @note = Note.new
  end

  def create
    @note = Note.new(note_params)
    @note.author_id = current_user.id
    byebug
    if @note.save
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def show
    @note = Note.find(params[:id])
  end

  def update
    @note = Note.find(params[:id])
    if @note.update(note_params)
      render :show
    else
      render json: @note.errors.full_message, status: 422
    end
  end

  private
  def note_params
    params.require(:note).permit(
      :title,
      :body,
      :notebook_id
    )
  end

end
