---
layout: post
title:  "Artpimp Radio Setup"
date:   2016-03-04 21:14:01
categories: article diary
published: false
image:
  feature: artpimp-radio.jpg
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---

I'm working on a Radio show with my friend Volker in the kitchen of his apartment in Berlin. The show is called Artpimp Radio and you can find our page on fFcebook and Twitter as artpimp.berlin. In the show we play music from guest DJs and Volker talks about some subjects and introduces some songs.

<div class="img img--fullContainer img--14xLeading" style="background-image: url({{ site.baseurl_posts_img }}artpimp-radio-01.JPG);"></div>

For broadcasting the show we use the [Mixlr](http://mixlr.com) platform. We use many different programs to play music, like iTunes, VLC, Chrome, Safari and Firefox. Then we use Audio Hijack and the Soundflower driver to put each pair of channels from the apps in a different channel on the Soundflower 64ch virtual interface. Then on Logic Pro we have a virtual mixer connected to a midi interface that acts as our mixer. Each pair of channels on the Soundflower interface are routed in logic channels. The output goes out to the Soundflower 2ch interface, witch is the input for the mixlr. We also use the H2n microfone from zoom connected thru USB and routed thru Logic Pro.

Our radio setup is working very well and we are enjoying ourselfs doing it. You can listen to our show on Sundays from 10PM to 1AM in Berlin.
