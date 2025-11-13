---
layout: default
title: "Blog"
description: "Articles on web design, development, and creative insights from Suresh Gobi at SGPixels."
permalink: /blog/
---

# Welcome to the SGPixels Blog ✨

Explore tutorials, design tips, and development insights to help you build better digital experiences.  

---

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
      <a href="{{ post.url | relative_url }}">Read More →</a>
    </li>
  {% endfor %}
</ul>
