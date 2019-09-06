---
title: Clean Declarative NgRx Applications via Action Hygiene
author: Mike Ryan
difficulty: intermediate
cost: false
tags:
  - NgRx
  - State Management
format: video
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/JmnsEvoy-gY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

One of the NgRx maintainers, [Mike Ryan](https://twitter.com/MikeRyanDev), walks us through how to create a clean declarative application via Good Action Hygiene. Here’s the breakdown:

> “Writing a clean reactive architecture with NgRx should mean that you can come back to code you wrote a year ago, and still understand it. Actions form the bedrock of an NgRx application. Get the foundation of your application right, by writing high-quality Actions. Instead of capturing commands in your actions, model your actions as unique events in your system. Actions should capture events, not commands.”

Main takeaways:

- Avoid action reuse, instead create unique system events
- Model action grammar as “[Source] Event”, and be descriptive, like “[Product Detail Page] Add Product”
- Action Subtyping leads to an increase in branching – again, go back to descriptive event-based actions