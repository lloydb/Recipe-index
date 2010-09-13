class CreateRecipes < ActiveRecord::Migration
  def self.up
    create_table :recipes, :id => false do |t|
	t.integer :id
      t.string :recipe
      t.string :cim
      t.string :pub_page
      t.string :ingredients
      t.string :href
    end
  end

  def self.down
    drop_table :recipes
  end
end
