---
title: Quarter of Open Source
date: 2019-04-04T11:01:23+01:00
tags:
  - blog
  - open-source
---

The first quarter of 2019 was very interesting for me. It was the first time I did a lot of open-source work as a way to scratch my own itch. Every time I thought I needed a specific tool which I couldn't find, I built and open-sourced it.

<!--more-->

## Background

The number of contributions I've made on GitHub has increased by over 20x in the past few years.

<div class="image"><img alt="Graph of contributions" src="/images/blog/quarter-of-open-source/contributions.png"></div>

### 2015

In 2015, I made slightly more than 100 contributions. These were mostly on my own projects, like my personal website, [Made with Love in India](/projects/made-with-love-in-india/), and [Saga Music](/projects/saga-music/). This is still less than 2014 (when I made a few projects centered around CSS and WordPress), but it's still something.

<div class="image"><img alt="Contributions in 2015" src="/images/blog/quarter-of-open-source/2015.png"></div>

### 2016

2016 was better, with more than twice the number of contributions. This is also when I founded Oswald Labs, so some of that work went into building our websites and first open-source extension.

<div class="image"><img alt="Contributions in 2016" src="/images/blog/quarter-of-open-source/2016.png"></div>

### 2017

2017 was even better with 465 contributions. In the first half of the year, I was working full-time on Oswald Labs (along with some freelance projects), and moved to Enschede in the second half. I also participated in (and won!) two hackathons, whose projects I also open-sourced. Oswald Labs mostly worked on GitLab, so there are (scattered) contributions here and there.

<div class="image"><img alt="Contributions in 2017" src="/images/blog/quarter-of-open-source/2017.png"></div>

### 2018

Last year is when there was a substantial, 6x increase in my open-source work. With over 2,500 contributions, this was the first time I was in four-figures, and my work was mostly on personal projects and a few libraries.

<div class="image"><img alt="Contributions in 2018" src="/images/blog/quarter-of-open-source/2018.png"></div>

### 2019

Finally, as of the first quarter of this year, I already have over 1,500 contributions. These are split around both Oswald Labs and my personal projects, and I also made a [system](https://github.com/AnandChowdhary/anand-services) to count my GitLab commits. At this rate, I should hit 5,000 this year (thought I don't know how long I can keep this rate up).

<div class="image"><img alt="Contributions in 2019" src="/images/blog/quarter-of-open-source/2019.png"></div>

## Projects

These are the projects I've built in the first quarter of 2019. In this section, I'm counting a little bit of December 2018 and a few days in April 2019 as the first quarter too, because I started some projects a few days before 2019 began, and finished one a day in April.

### 📝 Hovercard

**Itch:** For a hackathon project, my team and I made [Aristotle](/projects/aristotle/), an e-learning system. For this, I wanted a way to show Wikipedia summary cards for important terms.

**Scratch:** A DOM library to show Wikipedia summary cards using Wikipedia's API. JavaScript, December 2018 · [GitHub](https://github.com/AnandChowdhary/hovercard) · [NPM](https://npmjs.com/package/hovercard)

### 👋 Hello-Bar

**Itch:** The Hello Bar service is expensive, and Oswald Labs needed a way to show targeted announcement bars with important information to visitors.

**Scratch:** A package to show targeted hello bars. JavaScript, January 2019 · [GitHub](https://github.com/AnandChowdhary/hello-bar) · [NPM](https://npmjs.com/package/hello-bar)

### ♿ Accessible Web Component(s)

**Itch:** There's a lot of boilerplate to make inputs with labels (`id`, `for`), and I wanted a web component to automate that

**Scratch:** A web component, `<form-group>` to automate labels and IDs. JavaScript, January 2019 · [GitHub](https://github.com/AnandChowdhary/accessible-web-components) · [NPM](https://npmjs.com/package/accessible-web-components)

_Around this time is also when I learned TypeScript, so the projects after late-January are not in ES6._

### 📅 Calendar Link

**Itch:** For an AI scheduling assistant I'm working on, I wanted a way to send platform-agnostic calendar invitation links.

**Scratch:** A Node.js library for generating links for Google, Yahoo!, and Outlook calendars. TypeScript, January 2019 · [GitHub](https://github.com/AnandChowdhary/calendar-link) · [NPM](https://npmjs.com/package/calendar-link)

### 🌐 Auto I18N

**Itch:** It's hard to translate JSON files using Google Translate, especially if they have nested items. However, this is a necessity if you can't afford to pay human translators and still need localization.

**Scratch:** A Node.js utility to translate works, objects, and files using Google Translate. TypeScript, March 2019 · [GitHub](https://github.com/AnandChowdhary/auto-i18n) · [NPM](https://npmjs.com/package/auto-i18n)

### 📦 Typestart

**Itch:** With me making so many DOM libraries in TypeScript, I wanted a easy-to-use, no-configuration starter with didn't have tons of boilerplate code.

**Scratch:** A TypeScript starter for libraries with DOM support and tests using Jest. TypeScript, February 2019 · [GitHub](https://github.com/AnandChowdhary/typestart) · [NPM](https://npmjs.com/package/typestart)

### 🔔 Changebar

**Itch:** I wanted a plugin to show users the most recent updates and features on Agastya's admin panel.

**Scratch:** A notifications widget to show changelogs, powered by Markdown files hosted on GitHub. TypeScript, February 2019 · [GitHub](https://github.com/AnandChowdhary/changebar) · [NPM](https://npmjs.com/package/changebar)

### 🐦 A11Y is Important

**Itch:** I wanted to build a Twitter bot (never did that before), and also wanted to curate a timeline related to accessibility.

**Scratch:** A Twitter bot which tweets and follow #a11y-related people and things. TypeScript, March 2019 · [GitHub](https://github.com/AnandChowdhary/a11yisimportant) · [NPM](https://npmjs.com/package/a11yisimportant)

### 🐎 Twente License

**Itch:** The MIT license is great, but I wanted to add values like privacy to it, to ensure that my code isn't used for evil.

**Scratch:** A fork of the MIT license with an added paragraph about privacy, along with a static site generator to show it off. TypeScript, January 2019 · [GitHub](https://github.com/AnandChowdhary/twente-license)

### 🗄 Fraud

**Itch:** MongoDB is an overkill for simple key-value storages, and I wanted a git-based backup system to store and manage Oswald Labs' developer API keys.

**Scratch:** JSON file-powered key-value storage with cache; super fast, always available. TypeScript, March 2019 · [GitHub](https://github.com/AnandChowdhary/fraud) · [NPM](https://npmjs.com/package/fraud)

### 📝 GitWriter

**Itch:** I wanted to write my [honors research proposal](https://github.com/AnandChowdhary/writing/blob/master/honors-veni-proposal.md), but on GitHub with auto-saving.

**Scratch:** A progressive web app to write text in Markdown on GitHub, auto-saving and cross-platform. Vue, March 2019 · [GitHub](https://github.com/AnandChowdhary/gitwriter)

### 🔗 Sharer.link

**Itch:** I wanted to share links to my favorite podcasts with my friends, but didn't know which podcast player they prefer.

**Scratch:** A web app to share links for podcasts, songs, movies, and more, with support for most major apps and stores. Vue, March 2019 · [GitHub](https://github.com/AnandChowdhary/sharer.link)

### 🗃 Embed Widget

**Itch:** Many websites these days want to embed tiny live chat or support widgets to their websites, and most of them live in `iframe`s. I wanted a starter for that.

**Scratch:** A button widget to open and manipulate embedded frames on webpages. Typescript, March 2019 · [GitHub](https://github.com/AnandChowdhary/embed-widget) · [NPM](https://npmjs.com/package/embed-widget)

### 🎨 Prefers Color Scheme

**Itch:** In macOS Mojave, users can choose their preferred color scheme (dark or light), and I wanted a way to see which theme a user has selected.

**Scratch:** A DOM utility to get a user's preferred color scheme. TypeScript, March 2019 · [GitHub](https://github.com/AnandChowdhary/prefers-color-scheme) · [NPM](https://npmjs.com/package/prefers-color-scheme)

### 📷 Photomonster

**Itch:** I want to backup my phone's photos, but to my own S3 instance because I'm afraid to lose them (I already pay for Google Photos, but I'm paranoid about data loss).

**Scratch:** An app to backup photos to S3, Firebase Storage, or custom endpoints. Work in progress. React Native, March 2019 · [GitHub](https://github.com/AnandChowdhary/photomonster)

### 🈹 Language Icons

**Itch:** Flags aren't good icons for languages. For example, should I use the US or the UK flag? Why not Pakistan's? They have more English speakers than the UK.

**Scratch:** A generator for language icons using their codes and flag colors. TypeScript, March 2019 · [GitHub](https://github.com/AnandChowdhary/language-icons) · [NPM](https://npmjs.com/package/language-icons)

## Epilogue

I made the most contributions I've ever made (per day) in the first quarter of 2019. I learned a lot (like TypeScript! I love TypeScript!) this quarter too, so it was a great start to an important year.

Of course, the number of contributions is not a great way to measure impact. It depends on how much code is in each commit, and how much it's truly adding to the open-source community. But, all in all, I'm happy with the way things are going and hope to continue to do my small part to build the ecosystem.
