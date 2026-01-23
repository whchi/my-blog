---
title: 'Openai Prompt Packs'
date: 2026-01-23T14:39:12+08:00
draft: false
author: 'whchi'
tags: ['prompt', 'AI']
summary: ''
toc: true
---

整理自 https://academy.openai.com/public/tags/prompt-packs-6849a0f98c613939acef841c

---

## ChatGPT for any role

### Communication & writing
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Write a professional email | Write a professional email to [recipient]. The email is about [topic] and should be polite, clear, and concise. Provide a subject line and a short closing. |
| Rewrite for clarity | Rewrite the following text so it is easier to understand. The text will be used in a professional setting. Ensure the tone is clear, respectful, and concise. Text: [paste text]. |
| Adapt message for audience | Reframe this message for [audience type: executives, peers, or customers]. The message was originally written for [context]. Adjust tone, word choice, and style to fit the intended audience. Text: [paste text]. |
| Draft meeting invite | Draft a meeting invitation for a session about [topic]. The meeting will include [attendees/roles] and should outline agenda items, goals, and preparation required. Provide the text in calendar-invite format. |
| Summarize long email | Summarize this email thread into a short recap. The thread includes several back-and-forth messages. Highlight key decisions, action items, and open questions. Email: [paste text]. |
{{</table>}}

### Meetings & collaboration
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Create a meeting agenda | Create a structured agenda for a meeting about [topic]. The meeting will last [time] and include [attendees]. Break the agenda into sections with time estimates and goals for each section. |
| Summarize meeting notes | Summarize these meeting notes into a structured recap. The notes are rough and informal. Organize them into categories: key decisions, next steps, and responsibilities. Notes: [paste text]. |
| Create an action items list | Turn the following meeting notes into a clean task list. The tasks should be grouped by owner and include deadlines if mentioned. Notes: [paste text]. |
| Prep questions for a meeting | Suggest thoughtful questions to ask in a meeting about [topic]. The purpose of the meeting is [purpose]. Provide a list of at least 5 questions that show preparation and insight. |
| Draft follow-up email | Write a professional follow-up email after a meeting about [topic]. Include a recap of key points, assigned responsibilities, and next steps with deadlines. Use a clear and polite tone. |

{{</table>}}

### Decision making
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Identify root cause | Analyze the following workplace issue: [describe issue]. The context is that the problem has occurred multiple times. Identify possible root causes and suggest questions to confirm them. |
| Compare options | Compare the following two or more possible solutions: [list options]. The decision needs to be made in [timeframe]. Evaluate pros, cons, and potential risks for each option. |
| Decision criteria | Help define clear decision-making criteria for [describe decision]. The context is that multiple stakeholders are involved. Provide a short list of weighted criteria to guide the choice. |
| Risk assessment | Assess the potential risks of the following plan: [describe plan]. The plan is set to start on [date]. List risks by likelihood and impact, and suggest mitigation strategies. |
| Recommend best option | Based on the following background: [describe situation and options], recommend the most suitable option. Explain your reasoning clearly and suggest first steps for implementation. |

{{</table>}}

### Organization & productivity
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Document daily priorities | Create a prioritized to-do list from the following tasks: [paste tasks]. The context is a typical workday with limited time. Suggest which tasks should be done first and why. |
| Create a weekly plan | Build a weekly work plan for [describe role or situation]. The week includes deadlines, meetings, and individual focus time. Provide a balanced schedule with recommended priorities. |
| Summarize a long document | Summarize the following document into 5 key points and 3 recommended actions. The document is [type: report, plan, or notes]. Keep the summary concise and professional. Text: [paste document]. |
| Brainstorm solutions | Brainstorm potential solutions to the following workplace challenge: [describe challenge]. Provide at least 5 varied ideas, noting pros and cons for each. |
| Write a project update | Draft a short project update for stakeholders. The project is [describe project]. Include progress made, current blockers, and next steps. Write in a professional, concise style. |

{{</table>}}

---

## ChatGPT for sales

### Outreach & communication
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Draft a personalized cold outreach email | Write a short, compelling cold email to a [job title] at [company name] introducing our product. Use the background below to customize it. Background: [insert value props or ICP info]. Format it in email-ready text. |
| Rework demo follow-up email | Rewrite this follow-up email after a demo to sound more consultative. Original email: [paste here]. Include recap, next steps, and call scheduling CTA. Output as email text. |
| Draft renewal pitch for key customer | Draft a renewal pitch for [customer name] based on this renewal history and value data: [paste data]. Include key ROI proof points and renewal recommendation. Output as a short pitch and optional follow-up email. |
| Create summary of rep activity | Write a daily update summarizing key rep activities. Inputs: [paste call summaries or CRM exports]. Make it upbeat and concise. Output as 3–5 bullet message. |
| Draft exec update on pipeline status | Summarize our pipeline health this month for execs. Inputs: [paste data]. Include total pipeline, top risks, biggest wins, and forecast confidence. Write it like a short exec update. |

{{</table>}}

### Account planning & strategy
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Generate strategic account plan | Create an account plan for [customer name]. Use these inputs: company profile, known priorities, current product usage, stakeholders, and renewal date. Output a structured plan with goals, risks, opportunities, and next steps. |
| Design territory planning framework | Create a territory planning guide for our next fiscal year. Inputs: team headcount, target industries, regions, and historical revenue. Recommend allocation method and sample coverage plan. |
| Prioritize accounts using firmographic data | I have this list of accounts: [paste sample]. Prioritize them based on [criteria: industry, size, funding, tech stack]. Output a ranked list with reasons why. |
| Spot high-potential accounts using weighted scoring | Score accounts based on [insert rules—e.g., company size, engagement score, intent signals]. Data: [Upload account list]. Output top 10 ranked accounts with their score and a note explaining why. |
| Regional market entry planning | I'm evaluating market entry into [region/country] for our [SaaS solution]. Research local buying behaviors, competitive landscape, economic conditions, and regulatory concerns. Format as a go/no-go market readiness summary with citations and action steps. |

{{</table>}}

### Competitive intelligence
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Create battlecard for competitor | Create a battlecard for [competitor name]. Use these notes: [insert positioning data]. Include strengths, weaknesses, how we win, and quick talk track. Output as table format. |
| Competitive positioning analysis | I'm preparing a competitive battlecard for [competitor name]. Research their pricing model, product positioning, recent customer wins/losses, and sales motion. Compare it to ours based on these strengths: [insert]. Output a 1-page summary with citations. |
| Create a sales enablement one-pager | Create a one-pager to help reps pitch [product name] to [persona]. Include key benefits, features, common use cases, and competitor differentiators. Format as copy-ready enablement doc. |
| Prepare sales objection rebuttals | Create rebuttals to these common objections: [insert 2–3 objections]. Make them sound natural and confident, and include a backup stat or story where useful. Output as list. |
| Find customer proof points in the public domain | Research recent online reviews, social mentions, and testimonials about [our product OR competitor product]. Focus on what customers are praising or criticizing. Summarize top 5 quotes, what persona each came from, and where it was posted. Include links. |

{{</table>}}

### Data analysis & visualization
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Analyze pipeline conversion rates by stage | Analyze this sales pipeline export. Calculate conversion rates between each stage and identify the biggest drop-off point. Data: [Upload pipeline CSV]. Output a short summary and a table of conversion % by stage. |
| Identify top-performing reps by close rate | From this dataset of rep activities and closed deals, calculate the close rate for each rep and rank them. Data: [Upload rep performance CSV]. Output a ranked list and a sentence for each rep's strength. |
| Visualize deal velocity across quarters | Use this CRM export to calculate average deal velocity per quarter (days from lead to close). Data: [Upload with open/close dates]. Show velocity trend in a simple chart and summarize the trendline. |
| Summarize campaign attribution to closed deals | Match campaign sources to closed-won deals from this data. Identify which campaign drove the most closed revenue. Data: [Upload campaign + deal export]. Output a ranked list and a short campaign summary. |
| Generate performance comparison chart | Here's a table of rep performance by quarter: [paste data]. Compare top vs bottom performers. Show chart with trends and call out key differences. Output as table + insights. |

{{</table>}}

### Visual enablement
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Visualize sales process in funnel view | Create a funnel graphic showing our sales stages: [insert stages]. Make it clean and easy to read for onboarding docs. Output as simple image. |
| Visualize the B2B sales funnel | Create an image of a standard B2B SaaS sales funnel with these stages: Prospecting, Discovery, Demo, Proposal, Closed Won/Lost. Use clean, modern icons and text labels. Output should be clear enough for use in a slide or enablement doc. |
| Illustrate key sales personas | Create professional illustrations for 3 personas: (1) CFO of a mid-market company, (2) VP of IT at a global enterprise, and (3) Operations Manager at a logistics firm. Style should be flat and modern, ideal for use in a one-pager or training slide. |
| Create a territory coverage map | Create a simplified U.S. map showing sales territories split by region: West, Central, East. Use distinctive color zones and label key states. Output should look clean and suitable for a sales kickoff deck. |
| Draft a team celebration graphic | Design a fun, modern graphic to celebrate "Top Rep of the Month." Include a placeholder for name/photo and stylized trophy or badge. Style should match internal brand or newsletter vibe. |

{{</table>}}

---

## ChatGPT for customer success

### Onboarding & adoption
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Create onboarding plan template | Create a reusable onboarding plan template for [type of customer]. Reference typical timelines, milestones, and stakeholder alignment needs. Format as a week-by-week table with task owners and goals. |
| Summarize onboarding feedback | Summarize onboarding feedback from our last 10 customers in [segment]. Use these shared notes and survey answers. Output a short paragraph per theme: wins, blockers, suggestions. |
| Identify best practices for high-touch onboarding | Research how leading B2B companies structure high-touch onboarding journeys. Focus on companies with $1M+ ACV and hybrid onboarding models. Include sources and structure the output as a bulleted summary of key tactics with references. |
| Suggest proactive playbooks | Recommend 3 proactive outreach playbooks for at-risk customers in [industry/segment]. Use trends from recent churn, feature inactivity, and low engagement. Output should include: goal, trigger, CTA, and timing. |
| Brainstorm retention incentives | Suggest creative retention strategies for accounts likely to downgrade in [industry]. Use trends in usage and renewal hesitations we've seen. Output 5 tested and 5 novel ideas with pros/cons. |

{{</table>}}

### Benchmarking & research
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Benchmark CS org structure | Benchmark the CS org structure for companies like ours in [industry, size]. Focus on roles per customer segment and ratio to revenue. Output as a comparison table with notes on headcount ratios. |
| Benchmark success metrics by industry | Research top 3 success metrics used for customer health scoring in the [industry] sector. Include CSAT, NRR, usage frequency, or other emerging benchmarks. Output as a table comparing metric, source, and benchmark value with citations. |
| Evaluate CS tooling stacks | Research typical Customer Success tech stacks for companies in early-stage, growth-stage, and enterprise. Include categories (e.g., CRM, Success Platform, Analytics). Output a comparison chart with examples and usage notes. |
| Competitive enablement summary | Research how competitors are supporting enterprise customers post-sale in [industry]. Include examples of success resources, team structure, and onboarding formats. Output as a table comparing 3 competitors with pros/cons per tactic. |
| Create competitive comparison of CS programs | Research what customer success programs look like at our top 3 competitors. Focus on onboarding, health tracking, and expansion strategies. Output a comparison matrix. |

{{</table>}}

### Executive communication & QBRs
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Draft executive email update | Write a weekly update email for [executive stakeholder at customer]. Use these internal notes from this week's call and usage metrics: [paste here]. Output should be a short, polished email with 3 bullets. |
| Draft QBR talking points | Summarize the top wins, risks, and product usage highlights for [Customer Name] ahead of our QBR. Use their latest health score, usage trends, and support ticket history. Format as a bulleted prep doc for internal review. |
| Prep for renewal call | Create a renewal call prep checklist for [Customer Name]. Include contract terms, current usage, known risks, and upsell potential. Output as a bulleted checklist. |
| Create account plan summary | Draft a 1-pager account plan for [Customer Name]. Use notes from our last 2 calls + contract info + goals: [paste here]. Output should be formatted as goals, blockers, actions, and renewals. |
| Outline renewal risk summary | Draft a renewal risk summary for [Customer Name] ahead of our internal forecast call. Include their renewal date, usage trend, sentiment, and contract notes. Output should be a paragraph summary + 1-line recommendation. |

{{</table>}}

### Health scoring & analytics
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Outline success metrics by segment | Outline a draft list of success metrics for [segment] customers. Include adoption goals, engagement targets, and renewal benchmarks. Format as a 2-column table: Metric | Definition. |
| Evaluate CSAT score distribution | Review this CSAT survey data from Q2. Calculate overall average, identify outlier scores, and summarize feedback themes if available. Output as a short summary with key stats and top positive/negative feedback examples. |
| Analyze support ticket trends | Examine this export of support tickets from the last quarter. Identify the top 5 recurring issues and provide a short summary of root causes. Output should include a ranked list with issue, frequency, and potential CS actions. |
| Spot early signs of churn | Review this customer usage data from the past 90 days. Identify any customers who may be at risk of churning based on usage drop, login frequency, or support interactions. Summarize the findings in a table with columns: Customer Name | Risk Factor | Notes. |
| Standardize customer health scoring | Build a draft health scoring rubric for [segment or region]. Use inputs like usage %, NPS, renewal status, and ticket volume. Output as a table with scoring ranges, weights, and color indicators. |

{{</table>}}

### Visual communication
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Design customer health score mock-up | Design a visual mock-up of a color-coded health score gauge for customers. Include Low, Medium, High ranges with suggested numerical ranges and icons. Style: dashboard-style, clean lines, professional. |
| Visualize customer journey map | Turn this outline of customer lifecycle stages into a visual journey map. Use the stages and pain points listed here: [paste text]. Output as a labeled diagram with 5 lifecycle stages. |
| Illustrate escalation process flow | Create a diagram that illustrates the internal escalation process from CSM to Support to Engineering. Include 3 levels of severity and labeled handoff points. Style: flowchart format, minimal colors, ready for internal wiki. |
| Build a visual customer maturity model | Create an image that visualizes a 4-stage customer maturity model for a SaaS platform. Each stage should have a title, key behavior pattern, and suggested CS touchpoint. Style: professional, clean, slide-ready. |

{{</table>}}

---

## ChatGPT for product

### Research & benchmarking
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Compare competitors' onboarding UX | Research how 3 key competitors structure their onboarding flow for new users. Include screenshots, key steps, and points of friction or delight. Synthesize a comparison table and recommendations for improvement. Target product: [Insert product] |
| Benchmark competitor pricing strategies | I'm a product manager launching a new SaaS product. Research how top 5 competitors in this space structure their pricing tiers, freemium vs. paid, feature gating, and upsell triggers. Use public sources and include URLs. Output: A comparison table with insights and risks. |
| Compare tech stack options | Compare the pros and cons of integrating [technology/tool A] vs. [technology/tool B] into our product. Focus on scalability, cost, support, and developer experience. Include citations. |
| Identify regulatory risks for new features | I'm a PM scoping a [feature] for financial services. Research recent regulatory guidance in the US, UK, and EU around the use of [feature] in customer-facing products. Summarize by region with citations. Output: A table of legal considerations to flag for our legal team and product design implications. |
| Research top product-led growth tactics | Research the top 7 product-led growth strategies used by fast-scaling SaaS companies in the last 2 years. Prioritize those with measurable impact. Include 1–2 examples per tactic and source links. Output: Ranked list with strategy, example, and success metric. |

{{</table>}}

### Strategy & planning
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Prioritize product roadmap items based on impact | Review this list of upcoming product initiatives. Use the data provided (impact scores, effort estimates, and strategic alignment notes) to suggest priority order. Present the reordered list with justification for each recommendation. [Insert initiative list] |
| Explore monetization models | We're considering pricing changes. Based on this product value and audience, suggest 3 monetization strategies. Include pros, cons, and examples of companies using each. [Insert product and audience details] |
| Draft a vision statement for the product | Based on this long-term goal and user need, write a concise product vision statement. Keep it inspiring and grounded in real outcomes. [Insert product goal] |
| Brainstorm feature ideas from customer feedback | Review this batch of customer feedback from the past quarter. Identify pain points and generate a list of 5 feature ideas to address recurring themes. [Insert feedback or summary] |
| Draft PRD for a new feature | Based on this feature idea and customer need, write a first-draft PRD. Include user story, problem statement, solution overview, acceptance criteria, and success metrics. [Insert context or problem] |

{{</table>}}

### Content & communication
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Draft changelog and release notes | Using this release summary, draft user-facing changelog notes for our next version release. Use a friendly, clear tone and group by category (e.g., new, improved, fixed). [Insert release notes or ticket list] |
| Create a go-to-market FAQ | Draft an internal FAQ for our sales and support teams about our upcoming feature launch. Use this background and anticipated questions. Write in a confident, informative tone. [Insert feature and launch details] |
| Generate a one-sentence value proposition | Based on this feature description, write 3 versions of a clear, compelling one-sentence value proposition. Tailor each one to a different target audience. [Insert feature description] |
| Draft pitch deck for new product | Create a 5-slide outline for a pitch deck introducing our new product to internal stakeholders. Include problem, solution, market, product overview, and timeline. [Insert product idea] |

{{</table>}}

### User experience & design
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Visualize a user journey map | Create a user journey map for our [insert user persona] going through [insert experience]. Include emotional highs/lows, touchpoints, and moments of friction. Output as a visual flow. |
| Design onboarding flow wireframe | Generate a wireframe-style image of a 3-step onboarding flow for a finance app. Steps include: linking an account, setting financial goals, and reviewing suggestions. Style: greyscale wireframe with labels. |
| Illustrate product comparison visuals | Create a side-by-side visual comparison of two app dashboards: one cluttered with too many metrics, and one simplified with actionable insights. Style: dashboard UI, minimalistic, neutral branding. |
| Design user journey infographics | Generate a user journey infographic showing the onboarding experience for a mobile health-tracking app. Include key milestones, emotions, and friction points. Style: infographic, vertical layout, soft colors. |

{{</table>}}

### Data analysis
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Analyze product feedback themes | Analyze this set of user feedback and identify the 4 most frequent themes. Summarize each with example quotes and suggested product implications. [Insert feedback or data dump] |
| Synthesize insights from usage data | Based on the following product usage data, summarize 3 key behavioral trends and what they suggest about user needs. Recommend 2 follow-up investigations. [Insert data or summary] |
| Identify product adoption risks | Review our product rollout plan and highlight 5 risks to successful adoption. Include likelihood, impact, and mitigation recommendations. [Insert rollout plan or summary] |
| Analyze A/B test results | Review the results of our recent A/B test (test vs. control). Identify statistical significance, key metrics that changed, and recommend next steps. Present insights clearly with graphs if needed. [Upload test data] |
| Compare feature adoption across customer segments | Use this data to compare how small business vs. enterprise customers adopt our key features. Highlight major differences, usage frequencies, and retention impact. Format output as a table with insights. [Upload CSV or describe dataset] |

{{</table>}}

---

## ChatGPT for engineers

### Technical research & evaluation
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Evaluate cloud providers for migration | I'm an infrastructure engineer evaluating cloud migration options. Context: We're moving from on-prem to the cloud for a fintech backend. Output: Compare AWS, GCP, and Azure for scalability, pricing, compliance, and developer tooling. Include citations. |
| Research frameworks for real-time apps | I'm building a real-time collaboration tool. Context: We need low-latency and scalability. Output: Compare top frameworks (e.g., SignalR, Socket.io, WebRTC) with use cases, pros/cons, and current usage by other SaaS companies. Include sources. |
| Benchmark observability tools | Benchmark the top observability tools. Context: We want to move from basic logging to full-stack monitoring. Output: Create a comparison table of features, pricing, integrations for Datadog, New Relic, Prometheus, and OpenTelemetry. Include sources. |
| Analyze AI/ML trends in logistics | I'm researching AI/ML adoption in logistics systems. Context: Our company is considering integrating predictive routing. Output: A 5-paragraph summary on current trends, vendors, and implementation patterns. Include citations and links. |
| Investigate compliance best practices | Research best practices for GDPR/CCPA compliance so we can help kick off discussions with our legal team. Context: Our app stores sensitive user data in the EU and US. Output: A compliance checklist with citations, sorted by regulation. Include links to documentation and regulations. |

{{</table>}}

### Documentation
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Review system design doc | I've drafted a technical design document for [insert project or feature]. Review it for clarity, architectural soundness, and completeness. Highlight any missing considerations or questions reviewers may raise. |
| Document internal API behavior | I need to document how this internal API works for other developers. Here's the relevant code, schema, and usage examples: [insert materials]. Create clear documentation including endpoints, input/output formats, and expected behavior. |
| Draft runbook for on-call engineers | I need to create a runbook for on-call engineers supporting [insert system]. Draft one that includes sections for system overview, common alerts, diagnostic steps, and escalation procedures. |
| Draft onboarding guide for new hires | I need to write an onboarding guide for new engineers joining [insert team]. Create a draft with sections for required tools, access setup, codebase overview, and first tasks. Make it suitable for self-service onboarding. |
| Write JIRA ticket from spec | Based on this engineering spec for [insert task or feature], write a JIRA ticket that includes the problem statement, context, goals, acceptance criteria, and technical notes for implementation. |

{{</table>}}

### Debugging & troubleshooting
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Debug failing system in production | A system in production is intermittently failing, and we're struggling to isolate the root cause. Based on the following logs, metrics, and recent changes: [insert context], help identify the most likely causes and suggest next steps for mitigation. |
| Analyze performance bottlenecks | Our service is experiencing latency and degraded performance during peak usage. Here are metrics, logs, and relevant traces: [insert context]. Help identify the bottlenecks and recommend specific optimizations. |
| Analyze a data pipeline failure | A critical data pipeline failed in yesterday's run. Here are the logs, data volume trends, and error outputs: [insert context]. Analyze what likely went wrong and provide recommendations to prevent recurrence. |
| Suggest observability improvements | We currently use [insert tools] for monitoring [insert service]. Review our observability setup and suggest improvements across metrics, logging, alerting, and dashboards to improve issue detection and debugging. |
| Brainstorm edge cases for testing | We're preparing test cases for [insert feature/system]. Brainstorm potential edge cases and failure scenarios that may not be covered by standard testing, including unusual user inputs, system state changes, and concurrency issues. |

{{</table>}}

### Architecture visualization
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Create a component diagram | I need to visualize the architecture of [insert system or service]. Generate a component diagram showing key services, data flows, and third-party integrations. Use clear labels and group components logically. |
| Visualize system architecture | Create an image of the system architecture. Context: It's a microservices-based e-commerce platform with services for payments, catalog, and user profiles. Output: Diagram with labeled services and data flow arrows. |
| Explain CI/CD pipeline to stakeholders | Create an image that explains our CI/CD process. Context: This is for a presentation to business stakeholders. Output: Diagram showing dev → build → test → deploy steps with basic icons and short descriptions. |
| Model data flow in ML pipeline | Create an image showing data flow in a machine learning pipeline. Context: We collect raw user data, clean it, train models, and serve predictions. Output: A labeled flowchart from raw data to inference. |
| Diagram customer journey through app | Create a customer journey map through our mobile banking app. Context: Steps include onboarding, account linking, transactions, and support. Output: A visual flowchart with steps, screens, and decision points. |

{{</table>}}

---

## ChatGPT for HR

### Survey & feedback analysis
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Draft employee survey questions | Write 6–8 employee survey questions designed to measure [e.g. belonging, manager trust, workload balance]. Ensure the questions are neutral and easy to understand. Format them as one question per line with rating scale suggestions. |
| Generate performance review prompts | Develop a set of five questions for performance reviews that encourage reflection, future goal setting, and actionable feedback. Tailor to [function/team], and keep the tone constructive and growth-oriented. Present the questions as a list for a review form. |
| Analyze exit survey themes | Review the following employee exit survey responses and identify the top recurring themes, concerns, and sentiment trends. These responses are from [department/timeframe]. Provide a thematic summary with bullet points and representative quotes. [Insert responses here] |
| Analyze trends in employee attrition | Analyze this employee attrition dataset from the last 12 months. Focus on patterns by department, tenure, and exit reasons. Summarize key insights and suggest 2–3 actions HR should consider. Present findings as bullet points followed by a short paragraph. [Upload your CSV or paste table here] |
| Generate a compensation benchmarking report | Based on this internal salary data and industry benchmarks, highlight pay discrepancies by role, gender, and level. Include averages, standard deviation, and a visual if possible. Provide a short summary for leadership review. [Upload benchmark and internal files] |

{{</table>}}

### Research & benchmarking
| Use Case | Prompt |
|----------|--------|
| Research global HR compliance updates | Research the latest 2024–2025 HR compliance changes in the EU, US, and APAC (focus on remote work laws, employee classification, and data privacy). Provide links to official sources and summarize in plain language. Present findings in a 3-region comparison table with a 1-paragraph summary per region. |
| Benchmark average DEI budgets | Research typical DEI program budgets and team sizes for companies with 500–5,000 employees in the US. Include industry benchmarks if available. Present key insights with 3 cited data points and include a simple bullet summary for leadership. |
| Explore top HR tech trends for 2025 | [You're briefing HR leadership on tech trends.] Research and summarize the top 5 HR technology trends expected to shape 2025. Include use cases, vendor examples, and implications for mid-sized companies. Synthesize insights into a short executive briefing with citations and actionable recommendations. |
| Compare employee retention strategies across industries | [You are building a retention initiative for a mid-sized tech firm.] Research 3 innovative, high-impact employee retention strategies used in tech, healthcare, and financial services. Focus on post-pandemic engagement challenges. Include cited examples and summarize key elements in a side-by-side comparison chart. |
| Research tools for recruiting | Research 4 top-rated candidate screening or sourcing tools used by mid-market companies. Summarize features, pricing, compliance status (EEOC), and known limitations. Provide links to primary sources and present findings in a comparison table. |

### Talent acquisition
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Create interview questions | Develop behavioral interview questions aligned to our company values for a [role title] opening in [team/department]. We want to assess both technical skills and culture fit. Provide 6–8 questions grouped by competency. |
| Write a job description draft | Based on this information [insert job responsibilities, skills, team context], write a professional job description for a [job title]. Include a short intro, responsibilities, required qualifications, and what makes the role appealing. |

{{</table>}}

### Engagement & culture
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Brainstorm engagement initiatives | Generate five practical ideas for improving employee engagement across [company/team/region]. Consider our hybrid work model, current engagement scores, and time/resource constraints. Present each idea with a short description, expected impact, and implementation effort level. |
| Write internal recognition blurb | Draft a short recognition message to celebrate [employee/team] for their recent accomplishment: [describe what they did]. Write it in a warm, appreciative tone suitable for Slack or email. Keep it under 100 words. |
| Create a DEI workshop outline | Design a one-hour DEI workshop for employees at [company/team]. The goal is to foster inclusive communication and awareness. Include an agenda, key learning objectives, interactive activities, and 2–3 discussion questions. |

{{</table>}}

### Policy & communications
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Draft an internal policy summary | Summarize the key points of this [internal policy or handbook section] so HR business partners can understand and communicate it effectively. This policy relates to [brief description or context]. Present the summary in clear, professional language under 200 words. |
| Draft a return-to-office FAQ | Write an employee-facing FAQ to support our return-to-office transition. Use this background information [insert key RTO plan details]. Cover top employee concerns (e.g. hybrid schedules, health protocols, expectations) in a warm and clear tone. Include 5–7 questions with answers. |

{{</table>}}

### Planning & operations
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Plan onboarding week | Build a 5-day onboarding schedule for new hires in [department or region]. Include orientation goals, topics to cover, people to meet, and relevant tools or resources. Present it in a simple day-by-day table with time blocks if helpful. |
| Brainstorm wellbeing initiatives | Suggest three tailored wellbeing programs for employees at [company/team], considering recent feedback and budget constraints. Include rationale, estimated costs, and potential success metrics. Present ideas as a short proposal summary. |
| Plan compliance training rollout | Create a phased plan to roll out a new compliance training across [team/region]. Include timing, communications strategy, target audiences, and support materials. Present the plan in bullet points or as a 4-week calendar. |

{{</table>}}

### Visual design
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Create a welcome banner for onboarding | Create an image for a new employee onboarding welcome banner. Style: clean and modern. Mood: warm and inclusive. Format: horizontal banner with space for overlay text. Include visual cues like a diverse team, coffee cups, or digital collaboration tools. |
| Design an internal DEI poster | Create a poster-style image for an internal DEI campaign. Style: bold, minimal. Include abstract representations of diversity (hands, overlapping shapes, color blocks). Mood: optimistic and forward-looking. Include placeholder space for a slogan or quote. |
| Illustrate a hybrid work policy | Generate an illustration showing a hybrid work scenario: a person working from home, a coworking space, and a modern office. Style: flat illustration or soft 3D. Intended for use in HR documentation. |
| Visualize the employee lifecycle | Create a simple visual diagram of the employee lifecycle: attract, onboard, develop, retain, offboard. Use icons or abstract figures to represent each phase. Style: corporate presentation-ready. |

{{</table>}}

---

## ChatGPT for IT

### Compliance & security
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Assess global data residency laws | I'm an IT Compliance Lead planning a global data storage architecture. Research 2025 data residency requirements across the EU, US, APAC, and LATAM. Include regulatory restrictions and preferred cloud regions. Cite official documentation and summarize findings in a table grouped by region. |
| Analyze remote access tools | As an IT Service Delivery Lead, I need a secure, scalable remote access tool for our hybrid team. Compare current vendors (e.g., BeyondTrust, TeamViewer Tensor, Chrome Remote Desktop) for enterprise use in 2025. Focus on SSO support, encryption, session logging, and pricing. Provide a security-focused executive summary with links to primary sources. |
| Generate compliance checklist | Based on SOC 2 guidelines, create a checklist of IT-specific controls to review for an upcoming internal audit. Use this existing audit prep document as background. Organize the checklist by domain (e.g., access, change management, incident response). |
| Validate access controls | Review this access matrix of users, roles, and systems. Check whether each user's access level follows our least-privilege policy. Identify any potential overprovisioning, and provide a table listing users with permissions that may need to be scaled back. |
| Review API security posture | Review this API schema and a sample set of traffic logs. Identify common API security issues such as poor input validation or lack of authentication. Provide a bullet-point list of findings with suggested fixes. |

{{</table>}}

### IT operations & asset management
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Draft IT onboarding checklist | Create a checklist for onboarding new hires from an IT perspective. Include key steps for account provisioning, security training, and hardware setup. Use this outline of our current process, and present the checklist organized by day or week. |
| Generate hardware lifecycle policy | Create a draft policy for managing the lifecycle of company laptops and desktops. Reference this spreadsheet of device ages and current replacement costs. Write a formal document with guidance on replacement timelines, support windows, and environmental considerations. |
| Draft asset inventory policy | Write a formal policy for maintaining and auditing IT asset inventory. Use this list of tools, departments, and stakeholders as a starting point. Include purpose, responsibilities, and process for inventory reconciliation. |
| Help prioritize IT tickets | Review this queue of open IT support tickets. Use this prioritization rubric based on impact, urgency, and SLA. Reorder the tickets accordingly and present the list as a prioritized backlog with a short reason for each ranking. |
| Track hardware lifecycle risk | Use this device inventory file containing purchase dates, models, and OS versions. Highlight which assets are past end-of-life or nearing refresh thresholds. Create a table of at-risk devices and include a narrative summary for IT leadership. |

{{</table>}}

### Incident response & communication
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Draft an incident postmortem | Summarize the recent [insert system or service] outage. Include the root cause, timeline of events, user impact, and actions taken. Use information from the incident ticket or war room notes, and format the summary as a shareable internal postmortem report. |
| Create a DR playbook draft | Create a draft disaster recovery playbook for a critical production service. Use this system diagram and our recovery objectives (RTO, RPO). Organize the playbook into steps to take before, during, and after a service outage. |
| Write internal comms for downtime | Write a professional internal communication announcing planned downtime for [insert system or tool]. Include timing, affected users, impact on work, and who to contact for questions. Write the message in the tone of an IT team update. |
| Translate error logs to plain language | Help translate these system error logs into language that can be understood by a non-technical executive. Use definitions where needed, and summarize what each log entry means in a few clear sentences. Present the explanation as an email draft. |

{{</table>}}

### Monitoring & analysis
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Evaluate SaaS tool redundancy | Review our current list of SaaS tools used by IT, engineering, and ops. Use the attached spreadsheet with cost, team usage, and tool functions. Identify overlapping tools and recommend 3–5 candidates for consolidation, explaining why each was chosen in a short summary report. |
| Summarize system health trends | Analyze the system health logs from the last 30 days. Focus on spikes in CPU/memory, service outages, and recurring error codes. Provide a concise summary of the key issues and add brief commentary on possible causes or needed follow-ups. |
| Suggest system monitoring improvements | Review our monitoring setup for [insert system] based on the current configuration and recent alert history. Identify 2–3 areas for improvement, such as gaps in alert coverage, noise reduction, or metrics tuning. Present the suggestions in a short internal memo. |
| Analyze service uptime and incident frequency | Review this CSV with daily uptime % and incident logs for [insert service] over the past quarter. Identify patterns in outages, frequency of issues by severity, and calculate overall uptime. Summarize findings and suggest actions for improvement in a brief report. |
| Audit user access logs for anomalies | Analyze this user access log export. Identify users or IP addresses with unusual access frequency, after-hours logins, or failed attempts. Flag suspicious patterns and summarize results in a security review format. |
| Forecast IT support ticket volume | Analyze this export of support ticket volume by week for the past 12 months. Identify seasonality trends and forecast volume for the next quarter. Visualize the trend and provide commentary for capacity planning. |

{{</table>}}

---

## ChatGPT for managers

### Strategic planning & alignment
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Draft quarterly goals | Draft clear and measurable quarterly goals for my team. Here is the business context, company objectives, and recent performance: [insert context]. Return 3 Objectives with 3-4 Key Results each, in a simple bullet format. |
| Exec update talking points | I need to brief my VP on team progress. Based on this weekly summary: [insert notes], generate concise talking points grouped into achievements, blockers, and asks. |
| Run a skills gap analysis | I'm trying to assess skill gaps on my team. Here's our current skill matrix and desired future state: [insert info]. Identify key gaps and suggest training or hiring solutions. Return findings in a short table. |
| Plan a hiring roadmap | I need to plan hiring needs for the next two quarters. Here's our current team structure and projected growth: [insert info]. Suggest a phased hiring plan with rationale for each role and proposed timing. |
| Reframe goals after a pivot | We just experienced a strategic pivot. Here's what changed: [insert details]. Help me reframe our team's goals and narrative to align with the new direction. Provide 2-3 talking points and a revised team goal statement. |

{{</table>}}

### Managerial coaching & performance enablement
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Create a 1:1 template | Draft a 1:1 meeting template for my direct reports. I want it to include check-ins on progress, roadblocks, career growth, and feedback. Format it as a bulleted agenda with guiding questions. |
| Improve feedback delivery | I want to give constructive feedback to a report who is underperforming. The issue is [insert behavior]. Suggest 2-3 ways to phrase it constructively, with pros and cons of each approach. |
| Prepare for a difficult conversation | I have a difficult conversation coming up with a team member about [insert issue]. Help me think through what to say, how to open, and what questions to ask. Return a 3-part conversation guide. |
| Resolve a cross-team conflict | I'm dealing with a conflict between my team and another function. Here's a summary of the tension and recent incidents: [insert info]. Suggest root causes and a 3-step mediation approach I can try. |

{{</table>}}

### Team analytics & health diagnostics
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Identify burnout risk from hours | Based on this timesheet data (weekly hours logged per person), flag any early signs of burnout risk. Use a threshold of >45 hours for 2+ weeks. Return a summary of flagged employees and trends in average hours. |
| Analyze workload distribution | I have a CSV that shows task assignments and completion times per team member for the last 4 weeks. Analyze workload distribution across the team—identify who may be overburdened or underutilized, and summarize in a short paragraph with a chart. |
| Diagnose team health issues | I'm noticing signs of disengagement or dysfunction on my team. Based on this description of recent behavior and team dynamics: [insert description], what are the likely causes and what should I do next? Provide a 3-part action plan. |

{{</table>}}

### People & talent research & benchmarking
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Hybrid engagement best practices | I lead a hybrid team in [insert industry]. Research effective engagement and collaboration practices from the last 2 years. Focus on techniques proven to improve team trust, reduce burnout, and sustain productivity. Provide a top 5 list with supporting evidence and links. |
| Benchmark manager-to-IC ratios | I'm a [insert role, e.g. Senior Engineering Manager] at a [insert company type, e.g., 500-person SaaS company]. I want to benchmark manager-to-IC ratios across similar tech firms. Focus on industry norms, variations by team type (engineering, product, etc.), and recommendations for scaling. Provide citations and a comparison table. |
| Research effective upskilling programs | I'm designing an upskilling program for a [insert team type, e.g., customer support team]. Find case studies or frameworks from companies that have implemented successful internal training programs. Include how they measured success, duration, and tools used. Summarize in 3–4 paragraphs with links. |
| Compare DEI strategy examples | I'm helping shape our team's DEI goals. Research how leading companies in [insert industry] structure their DEI initiatives at the team level. Include examples of KPIs, training, and rituals. Return a comparison table with links. |
| Understand burnout risks and mitigation | I'm seeing signs of burnout on my team. Research recent studies or expert guidance on recognizing burnout in knowledge workers and preventing escalation. Summarize key risk factors and recommend a 3-part action plan with citations. |

{{</table>}}

### Team culture & visual communication
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Depict a team growth journey | Design a visual metaphor for a team's growth journey over a year. Include representations of challenges, milestones, and collaboration. Style should be inspiring, like a timeline or path through a landscape. |
| Summarize team culture visually | Design an image that represents our team culture. Our values are [insert 3–5 values, e.g. curiosity, impact, accountability]. Use icons or illustrations to match each value, and organize in a clean layout suitable for a wiki or mural board. |
| Show quarterly focus areas | Create a visual dashboard or poster that shows our team's three strategic priorities this quarter: [insert priorities]. Make it visually engaging and easy to present in an all-hands slide. |

{{</table>}}

---

## ChatGPT for executives

### Research & market analysis
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Summarize investor trends | I'm preparing for our investor update. Research the latest funding and market trends in [industry]. Focus on valuation benchmarks, risk sentiment, and notable exits. Present in a concise brief with sources. |
| Survey investor sentiment | Research current investor sentiment for companies in the [industry] space. Pull insights from earnings calls, investor letters, and analyst notes. Focus on risk appetite, funding trends, and growth expectations. Provide a 1-page briefing with source links. |
| Benchmark executive compensation | Conduct research on executive compensation benchmarks for [title, e.g. CFO] at [company size and industry]. Include total compensation breakdowns, geographic variations, and trends across public/private companies. Summarize in a 1-page brief with data tables and citations. |
| Evaluate M&A opportunities in a sector | I'm evaluating M&A options in the [sector/vertical]. Research recent acquisitions (past 24 months), typical deal sizes, common targets, and integration outcomes. Provide company examples, risks, and strategic rationale. Format as an investor-style briefing. |
| Assess future trends in [your industry] | I'm an executive at [company/industry]. Conduct deep research on 3–5 emerging trends in [industry/topic] over the next 3 years. Include industry-specific examples, expert citations, and potential implications for strategy and talent planning. Present as an executive summary with bullet points and links to sources. |

{{</table>}}

### Business analytics
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Identify top and bottom performing segments | This is a dataset of performance across [regions/products/customers]. Identify which segments are over- and under-performing relative to the average. Show the metrics driving this and recommend 2 actions based on the findings. |
| Analyze quarterly business metrics | I'm reviewing performance data for Q[insert quarter]. Analyze this dataset [upload CSV] for key trends in revenue, churn, and customer acquisition. Highlight 3 insights I should share with the board and suggest follow-up questions I should ask. |
| Analyze customer journey drop-off | I uploaded a funnel dataset showing customer journey stages. Analyze conversion rates between each stage and identify the largest drop-offs. Suggest 2–3 hypotheses and next steps to test or investigate. |
| Forecast next quarter based on historical trends | Based on this historical data [upload], build a simple forecast for [KPI, e.g. revenue] over the next quarter. Use a basic time-series model and explain any assumptions made. Present as a short briefing I can share with my leadership team. |
| Prioritize strategic investments | I uploaded a dataset of ongoing or proposed initiatives with cost, impact score, and estimated time to ROI. Help me prioritize these initiatives by building a simple scoring model and plotting effort vs. impact. Summarize the top 3 recommendations. |

{{</table>}}

### Strategic visualization
{{<table "table table-bordered" >}}
| Use Case | Prompt |
|----------|--------|
| Build a competitive landscape grid | Based on the following list of competitors and their differentiators [paste], create a 2x2 matrix plotting them by [x axis] and [y axis]. Label each quadrant and include our position. |
| Design a 2x2 market positioning matrix | Create a 2x2 matrix plotting companies in [industry] by [X-axis: e.g. pricing] and [Y-axis: e.g. innovation]. Label each quadrant, add 6–8 companies, and highlight where we fit. Keep it suitable for a board presentation. |
| Show transformation timeline | Create a visual timeline showing a company transformation journey from [year 1] to [year 3]. Include key milestones: strategy shifts, team growth, market expansion. Style: simple, bold, professional. |
| Visualize strategic vision or flywheel | Create a high-level strategic flywheel or vision diagram for a company focused on [industry or goal]. Show how inputs (e.g. customers, data, feedback) loop into outputs (e.g. growth, innovation). Keep it clean, modern, and executive-ready. |
| Illustrate a future product Vision | Create a conceptual image of a future product vision for [industry/product]. Highlight features that reflect innovation and customer benefit. Style should be forward-looking, abstract but clear. |

{{</table>}}

---

## Unlocking ChatGPT for Government: A Prompt-Pack IT Staff

### System Security & Vulnerability Management
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Analyze vulnerability-scan results | "Analyze these weekly vulnerability-scan results for the [system name] and group findings by severity and affected component. Recommend remediation steps ranked by risk reduction." | ✅ Scan report |
| Draft security exceptions summary | "Draft a one-page summary of all application-security exceptions granted last quarter and map each to the relevant control in our [cybersecurity baseline]." | ✅ Exception tracker |
| Visualize attack vectors | "Extract the ten most frequent attack vectors from these intrusion-detection logs and visualise them in a bar chart for the monthly security briefing." | ✅ Log files |

{{</table>}}

### DevOps & Release Management
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Merge code-coverage reports | "Merge these code-coverage reports from the last three builds, calculate test-coverage percentage for each module, highlight any module below 75 percent, and produce a bar chart of the results with a short narrative explaining the biggest gaps." | ✅ Coverage report files |
| Summarize performance-test data | "Summarize performance-test data and highlight endpoints exceeding the [value] millisecond Service Level Agreement (SLA). Present findings as a table." | ✅ Performance test logs |
| Create change-management request template | "Create a change-management request template for rolling back version [ # ] of the [application]. Include impact analysis, rollback steps, and stakeholder notifications." | ✅ Release notes or deployment plan |

{{</table>}}

### Infrastructure & Cloud Operations
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Compare IaC against policy | "Here are our existing IaC definitions for the standby database cluster (in YAML/JSON). Compare each resource against our [policy name] requirements—data-at-rest encryption, network isolation, tag standards—and produce a table of any non-compliant items with suggested fixes." | ✅ IaC files (YAML/JSON) |
| Review server configuration manifests | "Review these server configuration manifests and suggest security baselines aligned with widely accepted benchmarks (e.g., CIS, NIST). Present recommendations in a table with columns for config area, current setting, recommended baseline, and rationale." | ✅ Configuration files (YAML/JSON) |
| Generate capacity report | "Generate a weekly capacity report for virtual machines hosting the [system name], including CPU, memory, and storage trends. Include 30-day forecasts using historical usage. Present results as: (1) summary table of resource utilization, (2) line charts by metric, and (3) a short narrative identifying any projected constraints." | ✅ Monitoring exports |

{{</table>}}

### Data Quality, Analysis & Visualization
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Deduplicate dataset | "Deduplicate this dataset of [dataset name / type] by identity number and date, flagging conflicting entries for review. Provide a summary of duplicates removed." | ✅ Dataset (CSV or spreadsheet) |
| Create dashboard-ready summary | "Create a dashboard-ready summary showing the distribution of response times in these help-desk logs, and highlight outliers beyond two standard deviations." | ✅ Log export |
| Combine tab-delimited exports | "Combine these three tab-delimited exports into one normalized table, add a 'last_updated' timestamp, and output the result in JavaScript Object Notation (JSON)." | ✅ Multiple tab-delimited files |

{{</table>}}

### Service Desk & End-User Support
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Generate knowledge-base article | "Generate a knowledge-base article on enrolling devices in our mobile-device-management solution, with step-by-step screenshots and plain-language instructions." | ✅ MDM console captures |
| Analyze ticket logs | "Analyze last quarter's ticket logs and surface the top five recurring issues by department. Suggest self-service resources for each." | ✅ Ticket export |
| Draft decision-tree for ticket categorization | "Draft a decision-tree for categorizing new support tickets based on keywords and priority. Present it as indented plain text." | ✅ Ticket export |

{{</table>}}

### Procurement & Vendor Oversight
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Compare SLAs in proposals | "Compare the Service Level Agreements (SLAs) in these three cloud-hosting proposals and highlight gaps against our uptime requirement." | ✅ Proposals |
| Generate RFP template | "Generate a draft Request for Proposal (RFP) template for a Security Information and Event Management (SIEM) platform, referencing our jurisdiction's procurement rules and minimum cybersecurity controls." | ✅ Procurement guidelines or policy manual |
| Summarize vendor performance metrics | "Summarize quarterly vendor-performance metrics and draft a letter requesting a service-credit discussion." | ✅ Vendor performance reports |

{{</table>}}

### Incident & Continuity Response
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Draft incident communication | "Draft an initial incident ticket, public statement, and internal chat update for a suspected ransomware event affecting [agency] mail servers." | ✅ Incident notes |
| Generate post-incident report outline | "Generate a post-incident report outline for last week's network outage, including root cause, mitigation, and lessons-learned sections." | ✅ Syslog extracts |
| Create continuity-of-operations checklist | "Create a continuity-of-operations checklist for migrating critical apps to an alternate data center within 24 hours." | N/A |

{{</table>}}

### Interagency Collaboration & Knowledge Sharing
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Map cybersecurity training requirements | "Map overlapping cybersecurity training requirements in these policies from the tax, commerce, and agriculture agencies our employees have to follow. Propose one consolidated curriculum with shared modules and agency-specific electives." | ✅ Three training-policy documents and current employee requirements |
| Summarize technical standards | "Summarize technical standards cited in these procurement frameworks (national, regional, municipal) and present a comparison table showing where they align or differ on encryption, logging, and data-retention requirements." | ✅ Framework documents |
| Create architecture overview | "Create a single-slide architecture overview explaining how our open-API gateway enables data exchange among partnering agencies." | ✅ Diagram or specification |

{{</table>}}

---

## Unlocking ChatGPT for Government: A Prompt-Pack for Analysts & Program Staff

### Performance monitoring & evaluation
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Summarize quarterly performance dashboards | "Summarize the last four quarterly performance dashboards for the [program name]. Highlight trends in [subject 1], [subject 2], [subject 3] in a one-page brief for executives." | ✅ Dashboards (PDF, Excel, or screen shots) |
| Generate participation visualizations | "Generate three visualizations comparing [program participation or service uptake] across urban, suburban, and rural districts since 2022. Use a consistent format (e.g., bar chart, line chart, or map) and include titles, axes, and source notes suitable for a leadership briefing." | ✅ Dataset with participation data |
| Identify data gaps | "List key data gaps that could distort our evaluation of [program effectiveness or policy impact], and suggest proxy indicators for each. Present results in a table with columns for data gap, why it matters, and recommended proxy." | (Optional) Methodology notes |

{{</table>}}

### Research & analysis
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Draft logic model | "Draft a logic model that links inputs, activities, outputs, and short-term outcomes for the [policy or program area]. Present it as a table with four columns or a simple diagram for inclusion in a strategic planning document." | ✅ Program overview or guidance doc |
| Identify data quality issues | "Identify potential data quality issues or design limitations in our before-and-after study for [recent intervention or initiative]. Return a bulleted list or table outlining each issue, its potential impact, and suggested mitigation strategies." | ✅ Study or analysis plan |
| Summarize statistical findings | "Summarize statistical findings from this evaluation of [program or service area] in clear language for leadership and the public." | ✅ Summary tables or regression output |

{{</table>}}

### Data manipulation & automation
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Write SQL query for procurement | "Write a SQL query that joins the [procurement table] with the [vendor-risk table] and flags contracts over $500k with a risk score > 7." | ✅ Schema or sample tables |
| Suggest clustering techniques | "Suggest three clustering techniques to segment [utilization data] patterns and outline pros/cons of each." | (Optional) Dataset sample |
| Convert pivot-table to Python | "Convert these pivot-table steps into reproducible Python (pandas) code for [dataset]. Return well-commented code in a reusable script format, showing import statements, transformations, and pivot logic." | ✅ Pivot-table screenshot |

{{</table>}}

### Budget & financial analysis
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Highlight budget deviations | "Highlight areas in our budget where actual spending deviated significantly from planned amounts. Present the findings in a table with columns for account, planned amount, actual amount, variance %, and potential cause." | ✅ Budget reports or workbooks |
| Convert financial projection to visual | "Convert this financial projection into a visual summary that shows spending phases over time. Use a stacked area or line chart with labeled time periods, spending categories, and totals, formatted for presentation in a leadership briefing." | ✅ Projection spreadsheet |
| Outline fiscal impact | "Outline the fiscal impact of a revenue drop scenario (e.g., 10% lower tax receipts) on program delivery. Present a summary table by program area with columns for baseline budget, revised estimate, expected service impact, and potential mitigation options." | ✅ Revenue models or budget files |

{{</table>}}

### Vendor & procurement management
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Analyze vendor scorecards | "Analyze KPI trends in the [IT managed-services contract] scorecards and flag vendors slipping below target for two consecutive quarters. Present the results in a table with vendor name, KPI trend, periods below target, and recommended follow-up." | ✅ Scorecards |
| Draft comparative bid table | "Draft a comparative table of bids for the [program name] RFP highlighting cost per unit, timeline, and risk factors." | ✅ Bid documents |
| Generate Gantt-style timeline | "Generate a Gantt-style timeline of key milestones and deliverables for the top-ranked vendor. Include dates, task names, responsible party, and duration. Format as a table that could be visualized in Excel or project management software." | ✅ Winning proposal |

{{</table>}}

### Compliance & risk management
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Generate risk register | "Generate a risk register for [upcoming program or initiative] that lists risk description, likelihood, impact, risk owner, and recommended mitigation actions, grouped by schedule, budget, compliance, and operational categories." | ✅ Planning or proposal doc |
| Compare agreement to regulation | "Compare this [agreement or policy] to the latest [regulation or standard] and produce a clause‑by‑clause gap analysis with recommended text revisions." | ✅ Draft agreement/policy text & reference regulation |
| Review compliance checklist | "Review this compliance checklist or SOP, label each item as compliant / partial / non‑compliant, and generate an action plan with deadlines and responsible parties." | ✅ Existing checklist or SOP |

{{</table>}}

### Emergency response & coordination
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Generate emergency response summary | "Generate a standardized summary of actions, outcomes, and lessons learned from our last emergency response. Organize using a structured format with section headers or a table including the action taken, result, and associated lesson learned." | ✅ After-action report or notes |
| Create response metrics chart | "Create a line or bar chart showing key response metrics (e.g., call volume, staff deployment, average response time) before, during, and after [specific event]. Label timeframes clearly and include a title and source notes suitable for a situation report." | ✅ Operational data logs |
| Propose coordination mitigations | "List recurring coordination issues across departments during past incidents and propose mitigation ideas. Present results in a table with columns for issue, affected departments, frequency or pattern, and proposed mitigation strategies." | (Optional) Past response docs |

{{</table>}}

### Interagency collaboration
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Identify shared goals | "Identify common goals or performance indicators shared by [Agency A] and [Agency B], and suggest opportunities to align. Present findings in a table with columns for shared metric/goal, current approach by each agency, and alignment opportunity." | ✅ Strategy documents or metrics |
| Create swimlane diagram | "Create a visual summary (e.g., swimlane diagram or annotated flowchart) showing roles, responsibilities, and funding flows across departments involved in [multi-agency effort]. Ensure labels are clear and structure supports briefings or onboarding use." | ✅ Org charts or program docs |
| Draft data-sharing principles | "Draft basic data-sharing principles and access rules for cross-agency collaboration on [shared platform or data project]." | (Optional) Policy drafts |

{{</table>}}

---

## Unlocking ChatGPT for Government: A Prompt-Pack for Leaders

### Executive Decision Support
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Summarize quarterly performance reports | "Summarize the last five quarterly performance reports for the [program name] initiative. Highlight trends in cost, schedule, and outcomes in a one-page brief for the senior leadership meeting." | ✅ Upload reports (PDFs, spreadsheets, etc.) |
| Summarize audit findings | "Summarize key findings from our last [performance audit or evaluation] and prepare a talking-point brief for leadership." | ✅ Upload audit or evaluation file |
| Create initiative timeline | "Create a timeline of major decisions and milestones for the [initiative name] over the last three years, based on these planning documents." | ✅ Upload project plans, memos, or past summaries |

{{</table>}}

### Policy Drafting & Analysis
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Rewrite regulation in plain language | "Rewrite this draft regulation on [topic] in plain language for public consultation." | ✅ Upload regulation draft |
| Identify policy conflicts | "Identify potential conflicts between the proposed [draft policy] and existing statutes. Present findings in a comparative table listing the policy section, conflicting statute, and nature of the conflict." | ✅ Upload draft policy |
| Summarize public feedback themes | "Summarize common public feedback themes from these consultation submissions on [topic]. Format the summary as bullet points grouped by theme, and include the frequency or volume of comments per theme." | ✅ Upload public comments or submissions |

{{</table>}}

### Constituent Communication
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Compose multilingual announcement | "Compose a 250-word public announcement about new [grant or service] eligibility, and translate into Spanish and Korean." | ✅ Upload existing announcement or program info |
| Convert manual to speech | "Turn this 10-page program manual into a 2-minute speech for a public meeting." | ✅ Upload program guide |
| Draft FAQ | "Draft responses to frequently asked questions about the new [zoning policy / tax rule / health ordinance]. Format as a bulleted FAQ with clear, concise answers appropriate for public website use. Use plain language." | ✅ Upload background policy or rule |

{{</table>}}

### Budget & Finance
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Analyze spending variance | "Analyze spending over the last three years and identify accounts with more than 15% variance from budget. Present results in a table with account name, year, budgeted vs. actual spending, variance %, and notes for follow-up review." | ✅ Upload budget reports or spreadsheets |
| Analyze budget by subject area | "Analyze this budget and break it down by subject area with associated justifications and impact statements if the funding is not provided. Format as a spreadsheet-style table with columns for subject area, budget request, rationale, and potential impacts of underfunding." | ✅ Upload budget |
| Draft fiscal priorities summary | "Draft a summary of upcoming fiscal priorities based on our latest strategic plan. Write it as a one-page executive brief for senior leadership, using bullet points and short paragraphs organized by strategic goal." | ✅ Upload strategic plan or policy goals |

{{</table>}}

### Human Resources
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Draft job description | "Draft a clear and detailed job description for a new [role], highlighting essential duties, qualifications, and competencies required for a successful candidate." | ✅ Upload similar job descriptions, organizational charts, or role outlines |
| Write recommendation letter | "Write a formal, detailed letter of recommendation (approx. 300–400 words) for an employee applying to a senior leadership program. Highlight leadership potential, performance record, and alignment with program goals. Use a professional, supportive tone suitable for external review." | ✅ Upload résumé, achievements, or prior memos |
| Prepare onboarding checklist | "Prepare a structured onboarding checklist for new hires in [department], including necessary training, documentation, and initial orientation activities." | ✅ Upload department guidelines, existing onboarding documents, or relevant policy materials |

{{</table>}}

### Risk, Compliance, & Oversight
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Create risk register | "Create a risk register for our upcoming [project], aligned with [compliance framework] categories. Include columns for risk description, likelihood, impact, mitigation strategy, responsible party, and status." | ✅ Upload project proposal or scoping document |
| Summarize data-sharing agreement alignment | "Summarize how our new data-sharing agreement aligns with current oversight guidance. Draft talking points for stakeholder briefings." | ✅ Upload the agreement |
| Highlight compliance checklist revisions | "Highlight areas in this compliance checklist that may need revision based on new legislation. Return an annotated list with checklist item references, the reason for revision, and a brief suggested update." | ✅ Upload checklist and recent law |

{{</table>}}

### Crisis Response
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Draft emergency communications | "Draft a press release, SMS, and social media post about [severe weather / cyber event], using emergency communication best practices." | ✅ Upload incident info or previous alert text |
| Create emergency response checklist | "Create an emergency response checklist for [event type] specific to our jurisdiction. Organize it by response phase (e.g., preparation, active response, recovery), and include responsible parties, timelines, and references to best practices used in other jurisdictions." | Optional - Upload existing SOPs or response plans |
| Summarize response actions | "Summarize response actions from the last major emergency to support an after-action debrief. Present in a table with columns for action taken, responsible entity, timeline, outcome, and lessons learned." | ✅ Upload after-action reports |

{{</table>}}

### Interagency Collaboration
{{<table "table table-bordered" >}}
| Use Case | Prompt | Upload? |
|----------|--------|---------|
| Identify overlapping objectives | "Identify overlapping objectives in [Agency A] and [Agency B] strategies. Propose three shared indicators." | ✅ Upload both strategic plans |
| Summarize intergovernmental responsibilities | "Summarize intergovernmental responsibilities in [infrastructure / health / education] programs across national, regional, and local levels." | ✅ Upload relevant program guidelines |
| Create governance overview | "Create a one-slide overview of roles, funding flows, and reporting requirements across departments involved in [program]." | ✅ Upload relevant memos or diagrams |

{{</table>}}
