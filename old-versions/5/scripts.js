document.addEventListener("DOMContentLoaded", function() {

	var images = document.querySelectorAll("img");
	for (i = 0; i < images.length; i++) {
		images[i].style.opacity = "0";
		images[i].style.transition = "opacity 0.5s";
		images[i].addEventListener("load", function() {
			this.style.opacity = "1";
		});
	}

});
window.onload = function() {
	var images = document.querySelectorAll("img");
	for (i = 0; i < images.length; i++) {
		images[i].style.opacity = "1";
	}
}

