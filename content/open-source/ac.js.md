---
title: ac.js
date: 2012-10-01
tags:
	- open-source
	- javascript
icon: /images/icons/acjs.png
---

At the end of 2012, with increasing support for new JavaScript APIs, I created a super-tiny library for fetching and manipulating DOM elements. The first version was just 696 bytes in size, and the updated second version was 231 bytes gzipped. This was the first public-use JavaScript library I made (honestly, it was barely a library).

<!--more-->

The library lets developers call familiar jQuery-style methods, like `$(element)` to find an element and `$(element, "click", function() { /**/ })` to add an event listener. The "library" was essentially just a wrapper around the `document.querySelector` method and contained shorthands for setting timeouts and intervals.

Using ac.js, you can do something like this:

```js
var element = $("nav#navbar");
$(element, "mouseover", function() {
	$(function() {
		// This will be logged after 1 second
		console.log("You hovered over the navbar!");
	}, 1000);
});
```

Interestingly, I made ac.js when Google Code was popular, and it still exists as part of the Google Code Archive. Of course, I've since then become much more creative with naming libraries than just my initials.

[View Google Code repo &rarr;](https://code.google.com/archive/p/ac-dot-js/)