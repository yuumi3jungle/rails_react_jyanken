json.array!(@jyankens) do |jyanken|
  json.extract! jyanken, :id, :human, :computer, :judgment, :created_at
end
