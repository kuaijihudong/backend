module BlogsHelper

  def type_select
    select = []
    Blog::TYPES.each_with_index{|index, value| select << [value, index]}
  end
end
