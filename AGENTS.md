<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Structure

- The landing page is a single route (src/routes/index.tsx) composed of section components in src/components/landing/ (Header, Hero, WhatWeDo, Services, Contact, Footer, Reveal). Brand tokens and utilities live in src/styles.css; never hardcode brand colors in components.
