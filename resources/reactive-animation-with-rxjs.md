---
title: Reactive Animation with RxJS
author: Ben Lesh
difficulty: intermediate
cost: false
tags:
  - Animation
  - Functional Reactive Programming
  - RxJS
format: video
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/X_RnO7KSR-4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Filmed in the spring of 2017 at [Jazoon Techdays](https://jazoon.com/history/spring2017/spring_test/index.html) in Switzerland , [Ben Lesh](https://twitter.com/BenLesh) touches upon:

- Some animation basics: velocity, frames, etc
- RequestAnimationFrame
- RxJS Schedulers – manipulate how events are processed with different timing mechanisms
- RxJS Defer – real world use case for creating an Observable factory with this helper method
- Higher Order Functions and Higher Order Streams for Rx based animation composition

> Some of the RxJS syntax is outdated, but the updates you’d have to make for current versions is not drastic, mostly you’d just have move to pipeable operators instead of using the dot chaining methods. Also note that the **do** operator was replaced by [tap](https://rxjs.dev/api/operators/tap), and let was deprecated in favor of [pipe](https://rxjs.dev/api/index/function/pipe).