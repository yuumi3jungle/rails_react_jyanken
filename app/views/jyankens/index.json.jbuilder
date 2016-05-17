json.array!(@jyankens) do |jyanken|
  json.extract! jyanken, :id, :human, :computer, :judgment
  json.url jyanken_url(jyanken, format: :json)
end
