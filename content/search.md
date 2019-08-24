---
title: Search
---

<script src="https://cdn.jsdelivr.net/npm/algoliasearch@3.33.0/dist/algoliasearchLite.min.js" integrity="sha256-3Laj91VXexjTlFLgL8+vvIq27laXdRmFIcO2miulgEs=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@3.4.0/dist/instantsearch.production.min.js" integrity="sha256-pM0n88cBFRHpSn0N26ETsQdwpA7WAXJDvkHeCLh3ujI=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous">
<style>
.results {
  text-align: center;
}
.ais-Hits-list {
  max-width: 100%;
  margin-top: 2rem;
  line-height: 2;
}
</style>

<div class="search-form">Loading...</div>
<div class="results">Loading...</div>

<script>
var search = instantsearch({
  indexName: "anand-chowdhary",
  searchClient: algoliasearch(
    "DT9D119WOJ",
    "c7bcffcfcebfd2da4028fb92aec5d89d"
  ),
});
var searchBox = instantsearch.widgets.searchBox({
  container: ".search-form"
});
var results = instantsearch.widgets.hits({
  container: ".results",
  templates: { item: "<a href=\"{{ url }}\">{{#helpers.highlight}}{ \"attribute\": \"title\" }{{/helpers.highlight}}</a>" },
});
search.addWidget(searchBox);
search.addWidget(results);
search.start();
</script>
