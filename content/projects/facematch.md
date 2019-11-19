---
title: FaceMatch
tags: projects
subcategory: App
intro: Face recognition Augmented Reality app for business events, built at the AWS Hackathon for StartupFest Europe.
date: 2017-09-23
icon: /images/projects/facematch/icon.png
work: ["App", "Artificial Intelligence", "Augmented Reality"]
client: AWS
timeline: 24 hours
img_src: /images/portfolio/facematch_2x
img_type: png
---

For the Amazon Web Services (AWS) Hackathon at [The Future of High Tech](http://www.thefutureofhightech.com/), part of the Startup Fest Europe 2017, I developed FaceMatch, a mobile app that uses deep learning-based facial detection, and displays the results in an augmented reality heads-up display. I ended up winning the hackathon's grand prize of €1,000 along with VIP tickets for StartupFest Europe.

[View GitHub repo &rarr;](https://github.com/AnandChowdhary/facematch)

<div class="two-images shadow">
	<div><img alt="" src="/images/projects/facematch/1.jpg"></div>
	<div><img alt="" src="/images/projects/facematch/2.jpg"></div>
</div>

The idea is simple — if you enter a large conference or a room full of people, you want to know who you should network with. FaceMatch uses AI to understand faces, and finds their relevant info from their LinkedIn profiles. This means that you can essentially point the phone at someone, get information like their age, gender, expression, designation, and company, along with a link to their LinkedIn profile.

I also added a second feature for users who are visually impaired or blind. FaceMatch View reads out the information of the people it recognizes, so if you're partially or completely blind, you can understand who's around. 'Anand Chowdhary is in the frame, and he's 19 years old, CEO/Product at Oswald Foundation' will be read out, as an example.

It also uses object and scene detection, so you can just point your camera in the direction you're walking in, and it will tell you what's around. 'In this scene, there is: road, lamppost, footpath, grass, tree' will be read out to you. For reading out, I used ResponsiveVoice, an instant text-to-speech and speech synthesis library that ensures voice consistency across platforms.

FaceMatch uses Amazon Rekognition, a service that lets you quickly add sophisticated deep learning-based visual search and image classification to apps. I ended up using Face Comparison, Facial Analysis, and Object and Scene Detection APIs.

<div class="image"><img alt="" src="/images/portfolio/facematch_2x.png"></div>

<footer>This project was done in collaboration with Mohit Ahuja 🇮🇳.</footer>