---
title: Staart
date: 2019-08-16
tags:
  - open-source
  - javascript
icon: /images/icons/staart.png
github: o15y/staart
---

Staart is a starter for SaaS startups written in TypeScript. It has everything a SaaS startup needs to get started, like built-in user management and authentication, billing and payments, teams and roles, an API gateway, GDPR tools, etc. I made Staart to make building products for the web significantly faster and easier.

<!--more-->

Staart, the backend project, is in Node.js, and its companion Staart UI uses Vue.js with Nuxt.js, both in TypeScript. Oswald Labs is already using Staart in production with millions of requests every month.

<div class="two-images">
  {{< img alt="Screenshot of Staart's landing page" src="/images/open-source/staart/1" type="png" >}}
  {{< img alt="Screenshot of Staart's login page" src="/images/open-source/staart/2" type="png" >}}
</div>

Users can login with their Staart account (using JWTs) and manage sessions, including refresh token invalidation using Redis. They can also login with third-party services like Google and Facebook via OAuth2. Staart UI has several static pages, like a landing page, pricing options, and privacy policy page.

<div class="two-images">
  {{< img alt="Screenshot of Staart's pricing page" src="/images/open-source/staart/3" type="png" >}}
  {{< img alt="Screenshot of Staart's verify location page" src="/images/open-source/staart/4" type="png" >}}
</div>
<div class="two-images">
  {{< img alt="Screenshot of Staart's team settings page" src="/images/open-source/staart/5" type="png" >}}
  {{< img alt="Screenshot of Staart's delete account modal" src="/images/open-source/staart/6" type="png" >}}
</div>

[View Staart on GitHub &rarr;](https://github.com/o15y/staart)

[View Staart UI on GitHub &rarr;](https://github.com/o15y/staart-ui)