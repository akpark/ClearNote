class Api::NotesController < ApplicationController

  def index
    @notes = Note.all
  end

  def new
    @note = Note.new(note_params)
    if @note.save!
      redirect_to root_url
    else
      flash.now[:errors] = @note.errors.full_messages
      redirect_to root_url
    end
  end

  def create
    @note = Note.create(note_params)
  end

  def show

  end

  def update
    
  end

  private
  def note_params
    params.require(:note).permit(
      :title,
      :body
    )
  end

end
