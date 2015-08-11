---
layout: post
title:  "Managing SSH Keys"
date:   2015-05-07 22:45:24
categories: jekyll update
published: false
---

Managing **SSH Keys** can be a pain. So i found a way to organize my keys and send them to servers whenever need.

To copy a **SSH Key** from your local machine to the remote machine (server), run the following command:

	 cat ~/.ssh/id_rsa.pub | ssh <user>@<hostname> 'cat >> .ssh/authorized_keys && echo "Key copied"'
