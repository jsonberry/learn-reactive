---
title: 'Dynamics of Change: Why Reactivity Matters'
tags:
 - Academic
 - FRP
 - Reactive Programming
cost: Free
difficulty: Beginner
format: Video
bestOf: true
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/v68ppDlvHqs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Recorded at the [https://16.polyconf.com/](2016 Polyconf), [https://twitter.com/andrestaltz](André Staltz) gives a framework agnostic talk that touches upon many of the principles and modules discussed on Pentacle, and it gets to the heart of defining what reactive systems are all about.

> “[Reactive is] when the module being changed is responsible for defining that change” 

This is one of the best beginner level videos for getting an insight into what it means to architect applications in a reactive way and understand the benefits.

At *11:35* Andre brings up creating an analytics module and how he handles solving that problem in a reactive way. In Pentacle you can see a real example of this style implemented in Angular using NgRx and RxJS in the [https://github.com/jsonberry/pentacle/blob/next/libs/analytics/data-access/src/lib/%2Bstate/analytics.effects.ts](Analytics Effects module).