---
title: '[推薦] System Design Blueprint'
date: 2023-06-20T09:33:20+08:00
draft: false
author: 'whchi'
tags: ['recommendation']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

# Source
https://medium.com/dev-genius/system-design-blueprint-the-ultimate-guide-e27b914bf8f1

# Summary
1. Principles
   - Modularization: divide and conquer, reduce complexity
   - Abstraction: hide complexity, showing only key features
   - Layering: divide into layers, each layer has its own responsibility
   - Scalability: scale horizontally(add resources) or vertically(add storage, memory, CPU, etc.)
   - Performance: reduce latency, increase throughput
   - Security
   - Fault Tolerance and Resilience: avoid single point of failure, ensure system can recover from failure
2. Key Components
   - DNS
   - Load Balancer
   - API Gateway: for routes, authentication, rate limiting, security, logging, monitoring, caching responses
   - CDN
   - Message Queue
   - Communication Protocol: HTTP, gRPC, WebSocket, etc.
   - Cache
   - Database
   - Replication Techniques: Master-Slave, Master-Master, etc.
   - Distrubuted Unique ID: uuid, snowflake, etc, ide.
3. Uploading Files in chunks using Signed URLs
   - Signed URLs: a URL that contains authentication information
   - Uploading Files in chunks: "multipart" upload
   - How they works: divide files into chunks > request signed URL for each chunk > upload > confirm successful > handle failed uploads
4. Chat and Streaming Protocols
   - RTMP
   - WebRTC
   - WebSocket
   - SSE
   - HTTP
     - polling
       - short
       - long
   - Webhook
   - Stream API
5. Common Components in System Design
   - Payment service
   - Analytic service: data collection, processing, visualization
   - Notification: user's informed of events about updates, alerts, important information, like email, SMS, push notification, FCM, SNS, APN, Twilio.
   - Search
   - Recommendation service
6. Best Practices for System Design
   - Requirement Gathering: Understanding the whole picture of system requirements before starting the design process
   - Design Patterns
   - Documentation: document the design process, architecture, assumptions, and decisions
   - Iterative Design: feedback loop
   - Testing and Validation
