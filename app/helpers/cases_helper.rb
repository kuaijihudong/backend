module CasesHelper

  def type_select
    select = []
    Case::TYPES.each_with_index{|index, value| select << [value, index]}
  end

  def case_type_select
    select = []
    # Case::TYPES.each_with_index{|index, value| select << [value, index]}
    CasesType.all.each do |tag|
      select << [tag.name, tag.id]
    end
    return select
  end


  def tag_type_select
    select = []
    # Case::TYPES.each_with_index{|index, value| select << [value, index]}
    Tag.all.each do |tag|
      select << [tag.name, tag.id]
    end
    return select
  end
end
