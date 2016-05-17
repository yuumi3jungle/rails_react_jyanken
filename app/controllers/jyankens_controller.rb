class JyankensController < ApplicationController
  before_action :set_jyanken, only: [:show, :edit, :update, :destroy]

  # GET /jyankens
  # GET /jyankens.json
  def index
    @jyankens = Jyanken.all
  end

  # GET /jyankens/1
  # GET /jyankens/1.json
  def show
  end

  # GET /jyankens/new
  def new
    @jyanken = Jyanken.new
  end

  # GET /jyankens/1/edit
  def edit
  end

  # POST /jyankens
  # POST /jyankens.json
  def create
    @jyanken = Jyanken.new(jyanken_params)

    respond_to do |format|
      if @jyanken.save
        format.html { redirect_to @jyanken, notice: 'Jyanken was successfully created.' }
        format.json { render :show, status: :created, location: @jyanken }
      else
        format.html { render :new }
        format.json { render json: @jyanken.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /jyankens/1
  # PATCH/PUT /jyankens/1.json
  def update
    respond_to do |format|
      if @jyanken.update(jyanken_params)
        format.html { redirect_to @jyanken, notice: 'Jyanken was successfully updated.' }
        format.json { render :show, status: :ok, location: @jyanken }
      else
        format.html { render :edit }
        format.json { render json: @jyanken.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /jyankens/1
  # DELETE /jyankens/1.json
  def destroy
    @jyanken.destroy
    respond_to do |format|
      format.html { redirect_to jyankens_url, notice: 'Jyanken was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_jyanken
      @jyanken = Jyanken.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def jyanken_params
      params.require(:jyanken).permit(:human, :computer, :judgment)
    end
end
