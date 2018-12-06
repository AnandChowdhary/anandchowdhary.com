---
title: The Defence for MD5
date: 2017-02-26
tags: ["Life"]
type: content
---

A few days ago, I tried to reset my password on PR.com, the press releases website. I entered my email, and they sent me the username and password in plain text. That's right, in plain text.

<!--more-->

{{< img alt="Screenshot of email" src="/images/blog/md5-pr_wav36p" type="png" >}}

The problem with this method of password storage is that if anyone gets access to your database, they can literally just see the passwords. This is why hashing is used, which converts the plain text password to an encrypted "hashed" version that is, in an ideal world, undecryptable. The problem with this hashing is really about how hashing fundamentally works: collisions are not uncommon, i.e., multiple strings could have the same hashed string.

For example, if the hash function converts all vowels to "X", then the hash of "Hello" is "HXllX" and the hash of "Hille" is also "HXIIX", even though the original strings are definitely distinct. Of course, real world hashing functions are mathematically complex, but collisions are still not that uncommon. This is why the MD5 and more recently SHA-1 hashing algorithms aren't recommended for security usages, and larger ones such as SHA-256 which don't have any proven collisions so far are.

These two strings have the same MD5 hash:

```
String 1: 4dc968ff0ee35c209572d4777b721587d36fa7b21bdc56b74a3dc0783e7b9518afbfa200a8284bf36e8e4b55b35f427593d849676da0d1555d8360fb5f07fea2
String 2: 4dc968ff0ee35c209572d4777b721587d36fa7b21bdc56b74a3dc0783e7b9518afbfa202a8284bf36e8e4b55b35f427593d849676da0d1d55d8360fb5f07fea2
Hash:     008ee33a9d58b51cfeb425b0959121c9
```

The next thing step to safe password storage is called salting. Salting is essentially inserting characters in the string before hashing it. "Hello" can become "H1e2l3lo" if you insert "123" after every alternate character. This means that the hashed file is now much more secure because an intruder would have to know the specific salting technique, which is usually based on server timestamp, tokens, or something unguessable.

Now, even though collisions are common in MD5, it's still much much better at storing sensitive information than plain text. Since intruders usually just match your hashed file to hashes of common passwords, dictionary words, combinations, etc., if you have a nice, long password, the brute force method becomes inefficient.

This is why, as long as passwords are lengthy and therefore relatively secure, "outdated" hashing algorithms such as MD5 are also actually not a bad choice if it's as simple as `md5($string)` vs `$string` when storing the password.  I have a nice long Facebook password, and I've decided to make its MD5 hash public to prove my point:

```
cf7dd0b01c061029778c72facdc14451
```

Even though it's *just* MD5, I don't think anyone can decrypt it. Not for 573 quadrillion years, at least.

**Footnote:** I'm not saying that we should use MD5 to sign TLS certificates, that's crazy talk. All I'm saying is that (a) MD5 is better than plain text, and (b) it works for practical purposes, as long as there's no sensitive data to be accessed and the user has a long, non-dictionary password.