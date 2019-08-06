---
title: "The Introduction to Reactive Programming You've Been Missing"
tags:
 - FRP
 - Reactive Programming
 - RxJS
cost: false
difficulty: beginner
format: article
bestOf: true
origin: André Staltz
origin_title: "The Introduction to Reactive Programming You've Been Missing"
source: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
---
Written in 2014 by <a href="https://twitter.com/andrestaltz" target="_blank">André Staltz</a>, an alumni of RxJS development and the creator of a multitude of reactive tools including [Cycle.js](https://cycle.js.org/). With 17k+ stars on GitHub since it surfaced, this post is hands down one of the best introductions to reactive programming that you can find. He uses RxJS as a means to communicate, but this intro goes beyond RxJS and encompasses reactive thinking in general. Start here!

> Note: Some of the RxJS syntax is outdated, but the updates you’d have to make for current versions is not drastic, mostly you’d just have move to [pipeable operators](https://rxjs.dev/guide/v6/pipeable-operators) instead of using the dot chaining methods. The fundamentals that are taught do not change, only a few syntax things here and there. Also note the flatmap operator is now just an alias for the preferred operator [mergeMap](https://rxjs.dev/api/operators/mergeMap).