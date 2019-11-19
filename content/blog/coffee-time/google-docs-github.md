---
title: Google Docs + GitHub
date: 2019-03-11T18:44:38+01:00
tags:
  - blog
  - coffee-time
---

When I first started using Google Docs, my favorite feature was "smart" autosaving. "Smart" because it's not just an interval, but also based on content changes. Today, almost all popular web-based text editors have both autosaving (WordPress, Medium, etc.) and rich text formatting (think \[f]CKEditor and TinyMCE a decade ago).

The question is — how can I combine the rich text and autosaving aspects with git's version control, so I can smartly save only the changes to a file and easily go back. Plus, why not write text in Markdown? Everybody loves Markdown.

[GitWriter](https://github.com/AnandChowdhary/gitwriter) is an app I made in a couple of hours for exactly that. It's a frontend-only PWA written in Vue.js and Typescript (decorators and everything!), hosted on Netlify. It connects with your GitHub account (personal access token), you shoose a repository and file, and just write. GitWriter automatically commits your changes as you write every few moments.
