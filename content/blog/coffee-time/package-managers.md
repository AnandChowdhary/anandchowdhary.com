---
title: Package Manager Standardization
date: 2019-03-15T19:54:59+01:00
tags:
  - blog
  - coffee-time
---

Matt Turnbull has a great article titled [Why Are You Still Using Yarn in 2018?](https://iamturns.com/yarn-vs-npm-2018/) which makes the argument that newer versions of NPM are just as fast as Yarn and switching to NPM might actually have some benefits (I'm still a Yarn user).

Furthermore, it's [getting complicated](https://github.com/gatsbyjs/gatsby/issues/4514) to maintain documentations and say: To install this package, use `npm install package` or `yarn add package`, etc. With other great package managers on the horizon like [PNPM](https://pnpm.js.org/) which claims to be faster than both NPM and Yarn, docs are going to get even harder to maintain.

The solution: **Package manager standardization**. Just like with [browser extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) became a standard so developers could write extensions for multiple browsers, we can have a standard for package managers. To use storage in a a Chrome extension, you can use the API `chrome.storage` or `browser.storage`, both work.

Similarly, instead of `npm install package` and `yarn add package` and `pnpm i package`, you can do:

```bash
package-manager install package
```

or, even more interesting:

```bash
package-manager + package
```

Based on your local configuration, this can be translated to `npm install package` or `yarn add package`. Both package managers (and all package managers) will use the same verbs — and even if they don't, at least have aliases to the standards.

The standard commands can be `install` (or `+`), `remove` (or `-`), and `update` (or `^`). Then, developer documentations can be as simple as "Add our package: `package-manager + package` and start using it."