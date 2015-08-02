---
layout: post
title:  "Whois JSON API"
date:   2015-06-07 20:34:46
categories: jekyll update
---

Today I want to introduce a new little service that i created: a [Whois JSON API](http://whois.j1x.co).

My motivation behind this project was the lack of another good whois lookup service that responded with a *JSON* file and could return decent querys from **TDLs** like ```.com.br``` or ```.network```.

Something cool that i had found was the [Whoiz](https://github.com/okor/whoiz) project from Jason Ormand. It uses a gem called [Ruby Whois](http://whoisrb.org/) to query the various diferent  servers for each *TDL*. I used this as my starting point. Then I took the raw responses from some of the diferent *TDLs* server and made a little **regex** to get the information that I needed from each one.

I only did this for some domains: ```.com.br```, ```.network```, ```.net``` and ```.com```. Maybe I'll make more in the future. The queries for ```.com.br``` domains usually come with limited information because of the registrar's API call allowance and there is a bug where some ```.com``` domains return an error sometimes (ex: google.com).

The [Whois JSON API](http://whois.j1x.co) is free for use. You can test it at [whois.j1x.co](http://whois.j1x.co) and read the API documentation. If you need support, find bugs or want to send me feedback, please leave me a message.
