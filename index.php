<?php
	$GLOBALS["data"] = json_decode(file_get_contents("admin/data.json"));
	function getInfo($slug, $type) {
		switch($type) {
			case "category":
				$contents = $GLOBALS["data"]->categories;
				break;
			case "post":
				$contents = $GLOBALS["data"]->posts;
				break;
			case "author":
				$contents = $GLOBALS["data"]->authors;
				break;
			case "page":
				$contents = $GLOBALS["data"]->pages;
				break;
			case "setting":
				$contents = $GLOBALS["data"]->settings;
				break;
		}
		foreach ($contents as $content) {
			if ($content->slug == $slug) {
				return $content;
				break;
			}
		}
	}
	if (isset($_GET["type"])) {
		$type = $_GET["type"];
	} else {
		$type = "page";
	}
	if (isset($_GET["content"])) {
		$content = $_GET["content"];
	} else {
		$content = "home";
	}
?><!doctype html>
<html lang="en-us">

	<head>

		<title>Anand Chowdhary</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<meta name="twitter:card" content="summary">
		<meta name="twitter:site" content="@AnandChowdhary">
		<link rel="author" href="https://plus.google.com/+AnandChowdhary0">

		<meta name="description" content="Anand Chowdhary solves problems using simple, honest, and beautiful user experiences. He is an interdisciplinary designer and currently a consultant to over 10 startups.">
		<link rel="icon" type="image/png" href="https://anandchowdhary.com/old-versions/5/img/logo.png">
		<link rel="apple-touch-icon-precomposed" href="https://anandchowdhary.com/old-versions/5/img/logo.png">
		<link rel="apple-touch-icon" href="https://anandchowdhary.com/old-versions/5/img/logo.png">

		<link href="bootstrap.css" rel="stylesheet">
		<link href="style.css" rel="stylesheet">

		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

		<script>var host="anandchowdhary.com";host==window.location.host&&"https:"!=window.location.protocol&&(window.location.protocol="https");</script>

	</head>

	<body class="<?php echo $content; ?>">

		<div class="container">
			<div class="col-md-4">
				<div class="fixed">
					<header id="masthead">
						<img class="mugshot" alt="Anand Chowdhary" src="anand.png">
						<h1 class="logo">Anand Chowdhary</h1>
						<p class="description">CEO Oswald Foundation</p>
					</header>
					<nav class="navbar">
						<ul>
							<li class="active"><a href="https://anandchowdhary.com/">Home</a></li>
							<li><a href="https://anandchowdhary.com/old-versions/5">Work</a></li>
							<li><a href="https://anandchowdhary.com/resume">R&eacute;sum&eacute;</a></li>
						</ul>
					</nav>
					<div class="social-links">
						<a href="https://twitter.com/AnandChowdhary" target="_blank" title="Twitter"><img src="twitter.svg"></a>
						<a href="https://github.com/AnandChowdhary" target="_blank" title="Github"><img src="github.svg"></a>
						<a href="https://facebook.com/AnandChowdhary" target="_blank" title="Facebook"><img src="facebook.svg"></a>
					</div>
				</div>
			</div>
			<div class="col-md-8">
				<?php if ($content != "home") echo '<h1 class="page-title">' . getInfo($content, $type)->title . '</h1>'; ?>
				<div class="page-content">
				<?php
					echo getInfo($content, $type)->body;
					if ($content == "blog") {
						foreach($GLOBALS["data"]->posts as $post) {
							echo "<ul>";
							echo "<li><a href='post/$post->slug'>$post->title</a> &middot; $post->datetime</li>";
							echo "</ul>";
						}
					}
				?>
				</div>
			</div>
		</div>

	</body>

</html>