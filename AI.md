# AI assisted workflow

## Tools used
* **Primary LLM:** Gemini 3 / GPT-5  – Used for architectural design, complex or repetitive code.
* **Coding Agent:** VS Code AI Agent – Used occasionally for dependency integration, and micro-refactoring.

I used the two models to cross-check each other's logic. When one model proposed a solution, I would often pivot to the other for a review to identify potential logical gaps or hallucinations.

A key part of my role was to act as an arbiter. When models iteratively attempt to "improve" each other's code, there is a risk of recursive over-engineering. I consciously intervened to keep the codebase simple, readable, avoiding unnecessary abstractions that the AI models occasionally suggested.

Every block of code was treated as a "Pull Request" from the AI. If the generated code deviated from my intended architecture or introduced unnecessary complexity, I refactored it.

For efficiency, I avoided writing repetitive boilerplate code from scratch. I would provide the conceptual logic and the expected output structure, using AI for my ideas.

Once the architecture was set, I used the VS Code agent for "low-level" tasks:
Quickly adding and configuring `supertest`, `vitest`, and `jsdom` without manual boilerplate setup.
Renaming variables across files and ensuring consistent and correct import/export patterns.

I directed the visual feedback logic, such as ensuring booked cabanas are visually dimmed/desaturated to provide instant cognitive feedback, which goes beyond basic "unclickable" states.
