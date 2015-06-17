module CasesHelper

  def type_select
    select = []
    Case::TYPES.each_with_index{|index, value| select << [value, index]}
  end
end
