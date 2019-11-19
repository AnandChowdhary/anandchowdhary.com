---
title: Keeep
tags: projects
subcategory: App
intro: Encryption engine and password manager in C/C++ built for my highschool Computer Science class.
date: 2016-01-24
bg: "#8d9ba6"
work: ["App"]
timeline: 4 days
img_src: /images/portfolio/keeep_2x
img_type: png
---

For my highschool Computer Science project, I built an encryption engine and password manager in C/C++. I wrote a pseudo-encryption algorithm with string manipulation, rotation, and encoding.

Keeep is a lightweight password management and encryption utility for Windows. It stores all usernames, passwords, credit cards, free-form notes, and more, in a securely encrypted file, protected by a single master password. Keeep is written in C++ in Code::Blocks.

[Visit GitHub repo &rarr;](https://github.com/AnandChowdhary/keeep)

## How it works

1. User creates an account, a binary data file is created as <username>.dat
2. User enters a password, which is encrypted using the algorithm, and stored as the first record in the user file.
3. For logging in, the app looks for the data file and fetches the first record. It decrypts the password stored in the first record and logs the user in if the passwords match.
4. User can now view all records or add a new record.

<div class="two-images">
  <div><img alt="" src="/images/projects/keeep/1.jpg"></div>
  <div><img alt="" src="/images/projects/keeep/2.jpg"></div>
</div>
<div class="two-images">
  <div><img alt="" src="/images/projects/keeep/3.jpg"></div>
  <div><img alt="" src="/images/projects/keeep/4.jpg"></div>
</div>
<div class="two-images">
  <div><img alt="" src="/images/projects/keeep/5.jpg"></div>
  <div><img alt="" src="/images/projects/keeep/6.jpg"></div>
</div>
<div class="two-images">
  <div><img alt="" src="/images/projects/keeep/7.jpg"></div>
</div>