# Extensions
activate :autoprefixer do |prefix|
	prefix.browsers = "last 12 versions"
end
activate :asset_hash
activate :minify_html
activate :aria_current
activate :livereload
activate :deploy do |deploy|
	deploy.deploy_method = :git # https://github.com/middleman-contrib/middleman-deploy/issues/100#issuecomment-148635762
	deploy.remote = "https://github.com/AnandChowdhary/anandchowdhary.github.io.git" # default: origin
end

activate :blog do |blog|
	blog.layout = "blog"
	blog.sources = "content/{year}-{month}-{day}-{title}.html"
	blog.permalink = "blog/{title}.html"
end

# Layouts
page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false
# page "/path/to/file.html", layout: "other_layout"

configure :build do
	activate :minify_css
	activate :minify_javascript
end