"use strict";
"use strict";

function initMe() {
  var internal = location.host.replace("www.", "");
  internal = new RegExp(internal, "i");
  var local = "anandchowdhary.com";
  local = new RegExp(local, "i");
  var a = document.getElementsByTagName("a");

  for (var i = 0; i < a.length; i++) {
    var href = a[i].host;

    if (!internal.test(href) && !local.test(href)) {
      a[i].setAttribute("target", "_blank");
      a[i].setAttribute("aria-label", a[i].innerText + " (external link)");
      a[i].setAttribute("rel", "noopener noreferrer");
    }
  }

  var elements = document.querySelectorAll("nav[role='navigation'] ul li a");

  if (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }

    var done = false;

    for (var i = elements.length - 1; i >= 0; i--) {
      if (location.href.includes(elements[i].getAttribute("href"))) {
        elements[i].classList.add("active");
        done = true;
        break;
      } else {
        if (location.href.includes("/work/")) {
          elements[1].classList.add("active");
          done = true;
          break;
        }
      }
    }

    if (!done) {
      elements[0].classList.add("active");
    }
  }

  var postImages = document.querySelectorAll("article p img");

  if (postImages && !document.querySelector(".listicle")) {
    for (var i = 0; i < postImages.length; i++) {
      var imageUrl = postImages[i].getAttribute("src");
      var altText = postImages[i].getAttribute("alt");
      var newElement = document.createElement("div");
      newElement.classList.add("image");
      newElement.innerHTML = postImages[i].parentNode.innerHTML;
      postImages[i].parentNode.parentNode.replaceChild(newElement, postImages[i].parentNode);
    }
  }

  var links = document.querySelectorAll("ul.filter a");

  if (links.length > 0) {
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove("selected");
    }

    var done = false;

    for (var i = links.length - 1; i >= 0; i--) {
      if (location.href.includes(links[i].getAttribute("href"))) {
        links[i].classList.add("selected");
        done = true;
        break;
      }
    }

    if (!done) {
      links[0].classList.add("selected");
    }
  }

  mediumZoom(document.querySelectorAll(".two-images img, .three-images img, .image img")); // var items = document.querySelectorAll(".elements article");
  // var buttons = document.querySelectorAll("[data-filter]");
  // for (var i = 0; i < buttons.length; i++) {
  // 	buttons[i].addEventListener("click", function() {
  // 		var current = document.querySelectorAll(selector);
  // 		console.log(selector, current);
  // 		for (var i = 0; i < current.length; i++) {
  // 			current[i].classList.remove("invisible");
  // 		}
  // 	});
  // }
}

(function () {
  initMe();
  var FadeTransition = Barba.BaseTransition.extend({
    start: function start() {
      Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
    },
    fadeOut: function fadeOut() {
      document.body.classList.add("fade-out");
      return new Promise(function (resolve) {
        window.scrollTo(0, 0);
        resolve();
      });
    },
    fadeIn: function fadeIn() {
      document.body.classList.remove("fade-out");
      this.newContainer.classList.toggle("fade-in");
      this.done();
    }
  });

  Barba.Pjax.getTransition = function () {
    return FadeTransition;
  };

  Barba.Pjax.start();
  Barba.Dispatcher.on("newPageReady", function (currentStatus, oldStatus, container) {
    initMe();
  });
  document.querySelector(".more-button").addEventListener("focus", function () {
    document.querySelector("#masthead").classList.add("hover");
  });
  var allLinks = document.querySelectorAll("a, button");

  for (var i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener("blur", function () {
      setTimeout(function () {
        var show = false;
        var links = document.querySelectorAll(".list a");

        for (var i = 0; i < links.length; i++) {
          if (document.activeElement === links[i]) show = true;
        }

        if (document.activeElement === document.querySelector(".more-button")) show = true;

        if (show) {
          document.querySelector("#masthead").classList.add("hover");
        } else {
          document.querySelector("#masthead").classList.remove("hover");
        }
      }, 100);
    });
  }
})();