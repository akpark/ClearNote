class Api::NotesController < ApplicationController

  def index
    @notes = current_user.notes.order(updated_at: :asc)
  end

  def create
    @note = Note.new(note_params)
    @note.author_id = current_user.id
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

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    render :show
  end

  private
  def note_params
    params.require(:note).permit(
      :title,
      :body,
      :body_delta,
      :notebook_id,
      :author_id
    )
  end

end
