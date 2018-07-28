---
title: UTwente PeoplePages Contact Book
date: 2017-08-12
tags: ["Bash"]
type: content
---

As a future creative technology student at the University of Twente, I wanted to get in touch with a particular professor. Their website, [PeoplePages](https://people.utwente.nl/), uses a RESTful API for AJAX requests to search for university staff, so I decided to add everyone to my contacts using API scraping to save time in the future.

<!--more-->

I did a query to find all results starting with the letter "a" and got a minified JSON response with all data. Fortunately, they have unrestricted access to their endpoints. This is what it looks like when cleaned: 

```
GET https://people.utwente.nl/search?query=a
```

```json
{
	"data": [
		{
			"type": "person",
			"id": "10000000000XXXX",
			"name": "John Doe",
			"jobtitle": "Supporting Staff",
			"avatar": "https://people.utwente.nl/john.doe/picture.jpg",
			"profile": "https://people.utwente.nl/john.doe",
			"organizations": [
				{
					"code": "S&B-XXXX",
					"department": "S&B",
					"section": "XXXX"
				}
			],
			"locations": [
				{
					"description": "Enschede 320",
					"latitude": 52.23979,
					"longitude": 6.850018
				}
			],
			"phones": [
				{
					"type": "",
					"tel": "+3153489XXXX",
					"prefix": "+3153489",
					"ext": "XXXX"
				}
			],
			"email": "john.doe@utwente.nl"
		}
	]
}
```

and so on. Since empty searches, space searches, and others weren't working, I decided to query each letter of the alphabet and save the JSON result to play with it: 

```bash
wget https://people.utwente.nl/search?query={a..z}
```

I soon realized that this wouldn't work because the API restricts the number of results to 50, but this would: 

```bash
wget https://people.utwente.nl/search?query={a..z}{a..z}
```

This goes through every combination in the alphabet: aa, ab, ac . . . zx, zy, zz, and downloads the JSON file. This was enough, but in many combinations like xx, xz, etc., there were no results, so the empty JSON file was exactly 43 bytes with just the JSON structure. I then got rid of those files: 

```bash
find . -name "*" -size 43c -delete
```

This Bash command finds all files that are of 43 bytes in size and deletes them. Note that if I just filter the size in bytes and query something like `-size 43 -delete`, it interprets it as 43*512 bytes, so the [POSIX requirement](https://superuser.com/a/644274) states "c" for bytes.

Finally I concatenated all the JSON files to one giant 4.9 MB file.

```bash
cat * > contacts.json
```

After cleaning the file, removing business contacts, and generally playing with the JSON content, I have a directory of 7527 people including duplicates. Sublime Text can handle this for me, with the simple command: Edit -> Permute Lines -> Unique. I now have 3740 people.

Then, I clean up by replacing double space with single, change the "Surname, Firstname" format to "Firstname Surname", and saved the contacts in a CSV file.

I now have the phone numbers, email addresses, and office addresses of all my professors, the Dean, and other important contacts for the university in my phone's contact book. Simple enough.

## Security

The simple way to prevent this is to have secured API endpoints. There are many ways to do that — token-based authentication for each user with rate limiting, or even CORS prevention.

![Screenshot of Google Search results for "secure api endpoints"](https://res.cloudinary.com/anand-chowdhary/image/upload/v1532798814/secure-endpoints_ddwwmr.png)

**Update May 2018:** Since then, the university has updated their endpoints. You cannot access them by barebones HTTP now. The new endpoints also seem to have some form of CORS protection.