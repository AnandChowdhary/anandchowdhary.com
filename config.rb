# Extensions
activate :autoprefixer do |prefix|
	prefix.browsers = "last 10 versions"
end

activate :asset_hash
activate :minify_html
activate :aria_current
activate :livereload
activate :minify_css
activate :minify_javascript

activate :deploy do |deploy|
	deploy.deploy_method = :git
	deploy.remote = "https://github.com/AnandChowdhary/anandchowdhary.com.git"
end

# activate :blog do |blog|
# 	blog.layout = "blog"
# 	blog.sources = "content/news/{year}-{month}-{day}-{title}.html"
# 	blog.permalink = "news/{title}.html"
# end

# Layouts
page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false
# page "/path/to/file.html", layout: "other_layout"