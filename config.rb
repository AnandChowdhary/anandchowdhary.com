# Extensions
activate :autoprefixer do |prefix|
	prefix.browsers = "last 10 versions"
end

activate :aria_current

configure :development do
	activate :livereload, host: "wlan180069.mobiel.utwente.nl"
	activate :directory_indexes
end

configure :build do
	activate :asset_hash
	activate :gzip
	# activate :imageoptim
	activate :minify_html
	activate :minify_css
	activate :minify_javascript
end

activate :deploy do |deploy|
	deploy.deploy_method = :git
	deploy.remote = "https://github.com/AnandChowdhary/anandchowdhary.com.git"
end

activate :blog do |blog|
	# blog.layout = "blog"
	blog.sources = "content/{category}/{year}-{month}-{day}-{title}.html"
	blog.permalink = "{category}/{title}.html"
end

# Layouts
page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false
# page "/path/to/file.html", layout: "other_layout"