class AddBannerToBlogs < ActiveRecord::Migration
  def change
    add_attachment :blogs, :banner
  end
end
