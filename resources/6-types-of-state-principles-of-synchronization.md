---
title: "6 Types of State: Principles of Synchronization"
author: Victor Savkin
bestOf: true
difficulty: intermediate
cost: false
tags:
  - NgRx
  - RxJS
  - State Management
format: video
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/brCGZ8Lk-HY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Victor Savkin](https://twitter.com/victorsavkin) presents during the spring of 2017 at [Jazoon Techdays](https://jazoon.com/history/spring2017/spring_test/index.html) in Switzerland and talks about 6 different types of state and strategies for synchronizing them. The implementations and examples that Victor uses are in Angular and NgRx, but the topics discussed are applicable to all web applications regardless of their state management library or JavaScript framework.

> To best understand this talk it would be good to understand the basics of [NgRx](https://ngrx.io/guide/store) or [Redux](https://redux.js.org/introduction/core-concepts).

From the video, Victor lays out some rules when it comes to managing state:

- Separate services/computation from state management
- Use immutable data for persistent and client state
- Optimistic updates require separate actions to deal with errors
- NgRx/Redux should be the means of achieving a goal, not the goal
- Always treat [the route] as the source of truth

> [Michael Hladky](https://twitter.com/Michael_Hladky) pointed out that these principles were first expressed by [Martin Fowler](https://twitter.com/martinfowler) from his writing in [Patterns Of Enterprise Application Architecture](https://martinfowler.com/books/eaa.html).