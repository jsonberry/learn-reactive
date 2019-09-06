---
title: "Cool RxJS Tricks: Live Code Examples"
author: Seth House
bestOf: true
difficulty: intermediate
cost: false
tags:
  - RxJS
  - Functional Reactive Programming
format: video
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/hkVq7u94Vzw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This is one of the best videos for seeing real implementations of RxJS usage without coding them yourself. In this video, [Seth House](https://twitter.com/whiteinge) encourages us to learn Rx with these points:

- RxJS is a mature, stable, six+ year old codebase
- Ideas and techniques span languages and implementations
- Rx knowledge will make you unafraid of async
- Rx knowledge will show you a new way to compose behavior and programs

Presented at [UtahJS Conference](http://www.utahjs.com/) in 2017, he shows many concrete RxJS with real live code examples. As noted by Seth, this is not an introductory talk, it goes into many different applications of RxJS and a lot of operators. The [slides are on Github](https://github.com/whiteinge/presentations/tree/master/utahjs_conf_2017-08-18_cool-rxjs-tricks/) to check out too.

> Note: Some of the RxJS syntax is outdated, but the updates you’d have to make for current versions is not drastic, mostly you’d just have move to pipeable operators instead of using the dot chaining methods. The fundamentals that are taught do not change, only a few syntax things here and there. Also note the flatmap operator is now just an alias for the preferred operator mergeMap.