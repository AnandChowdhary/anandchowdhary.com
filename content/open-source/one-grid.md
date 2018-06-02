---
title: One Grid
date: 2015-12-25
tags: ["CSS"]
type: content
icon: true
---

One Grid is the simplest grid system for fixed-height infinite blocks in less than one kilobyte. It's responsive, eliminates unnecessary code, and works with Internet Explorer 8+. One is the most fundamental form of what I believe a grid system should work like.

<!--more-->

Grid systems are perhaps the most fundamental elements of modern web design. They provide a solid structure, form, purpose, and, to some extent, hierarchies and rhythm, to a webpage.
The problem is that grid systems are broken.

Bootstrap, the most popular framework, for example, considers rows to be the divisions between grid subsets, and thus the priority.  This is because of the assumptions that we have varying column heights. But here's the thing --- we don't have varying column heights.

By eliminating rows, we get:

```html
<div class="container">
	<div class="one">1</div>
	<div class="one half">1/2</div>
	<div class="one half">1/2</div>
	<div class="one third">1/3</div>
	<div class="one third">1/3</div>
	<div class="one third">1/3</div>
</div>
```

That's the idea behind One, a grid system I designed this evening. It's an idea that grid systems are far too complex, and come with lots of unnecessary bytes. Nobody uses that many classes anyway.

## How it works
1. Each container will have its own "fixed" height, i.e., its children will have the same height. It doesn't need to be specified by CSS, it's just constant.
2. We use some JavaScript to determine the height for each column in a container. That's the maximum height its siblings may have.
3. It consists of simple class names like "one" for a full-width column, "half" for a half-width column, . . ., "tenth" for a tenth-width column.
4. You only have to style one element, "-one," to add margins, outlines, etc., to all columns in a container.

## Why it works

1. Supports Internet Explorer 8, and everything hence.
2. It eliminates unnecessary code.
3. It's responsive.
4. It's just 1 KB.

![One Grid screenshot](/images/open-source/one-grid/hero.jpeg)

[View GitHub repo &rarr;](https://github.com/AnandChowdhary/one-grid)