# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s): None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 3
- Tool(s): ChatGPT
- What I asked for: "change this vendor.jsx to vendors.json", "merge old app.jxs with the new one", help me with B6, add filter button
- What I kept, changed or rejected, and why: change three file to the new code.
- One thing the AI got wrong and how I fixed it: the filter button was ugly and not following the theme, so i told chatGPT to update to the new one.

## Week 4

- Tool(s): Claude Code (Sonnet 5.5).

- What I asked for: I gave it the Week 4 lab sheet and asked for B1 (custom hooks), B2 (cart context) and B3 (pages and routes), keeping my existing code structure, indentation and style, and adding only what the sheet required.

- What I kept, changed or rejected, and why: I kept the generated hooks, `CartProvider`, pages, `Layout` and route table. I kept the Week 3 logic (fetch, add to cart, change quantity, remove) and moved it into `useVendors` and `CartProvider`. I decided not to fill the unfinished Week 3 TODOs in `CartItem.jsx` and the checkout validation beyond what the redirect needed. I added an Orders link in the header that the sheet did not ask for.

- One thing the AI got wrong and how I fixed it: It first failed to read the lab sheet PDF because no PDF renderer was installed, so I had to extract the text another way. It also wrote the code without react-router installed and only noticed when it checked the dependencies. The `useVendors` hook still triggers an ESLint `set-state-in-effect` error, because it copied the Week 3 effect as-is instead of fixing it.