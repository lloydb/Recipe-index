class RecipesController < ApplicationController
  before_filter :find_recipe,
	:only => [:show, :edit, :update]

  # GET /recipes
  # GET /recipes.xml
  def index
    @recipes = Recipe.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @recipes }
    end
  end

  # GET /recipes/1
  # GET /recipes/1.xml
  def show

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @recipe }
    end
  end


  # GET /recipes/new
  # GET /recipes/new.xml
  def new
    @recipe = Recipe.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @recipe }
    end
  end

  # POST /recipes
  # POST /recipes.xml
  def create
    @recipe = Recipe.new(params[:recipe])

    respond_to do |format|
      if @recipe.save
        format.html { redirect_to(@recipe, :notice => 'Recipe was successfully created.') }
        format.xml  { render :xml => @recipe, :status => :created, :location => @recipe }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @recipe.errors, :status => :unprocessable_entity }
      end
    end
  end

  # GET /recipes/1/edit
  def edit
  end

  # PUT /recipes/1
  # PUT /recipes/1.xml
  def update

    respond_to do |format|
      if @recipe.update_attributes(params[:recipe])
        format.html { redirect_to(@recipe, :notice => 'Recipe was successfully updated.') }
        format.xml  { head :ok }
      else 
        format.html { render :action => "edit" }
        format.xml  { render :xml => @recipe.errors, :status => :unprocessable_entity }
      end
    end
  end


  def queryRender

	search_expression="%" + params[:keyWords].gsub(/ /,"%") + "%"

	# The duplication of columns is so that we can find:
	#   cim recipe & recipe cim
 
	@recipes = Recipe.all(:conditions=> ["lower(cim||recipe||pub_page||cim||ingredients||recipe||cim||pub_page||ingredients) like ?", search_expression], :order => "cim", :limit => 500)
	render :partial => "results_list", :layout => false
  end

  private
	def find_recipe
	   @recipe=Recipe.find(params[:id])
	end

end
