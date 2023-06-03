---
title: '[推薦] Graphql Hard Truths'
date: 2023-06-03T17:55:51+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source

https://www.youtube.com/watch?v=qgdiLcD2RL8 12:05

# Summary
* A language schema that is VERY HARD to do it correctly
* Defines a strict contract between backend and frontend
* Not a database but a query language bridge service between backend and frontend
* All "POST", you have to build your own cache layer between resolvers and graphQL endpoint
* [Relay](https://relay.dev/) is the right way from now, but it's very hard to use
