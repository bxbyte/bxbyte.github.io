# Here's my portfolio

You'll find my resume, contact informations, posts, ...
but also the first implementation of html2pdf, a simple
astrojs plugin doing what his name say.

## Setup

Use the simple ``bun setup` command, and
if needed specify a custom browser for pdf rendering
with puppeter in html2pdf.

## URL structure

To the exception of special pages (404 error, ...),
each page is prefixed by a `/[...lang]/` part, where lang
is either nothing for the default locale english,
or `/fr/` for the french locale. The fallback is of course on the default locale.

## Source code structure

```
├ .trash/               Local trash folder
├ .bin/                 Local binaries folder (for html2pdf)
│
└ src/                  Portfolio source code
  │
  ├ **/*.global.astro   Files named like that are imported
  │                      in the head of the skeletton
  │
  ├ data/               Every pieces of informations that need to be
  │                      easely accessable for update
  │
  ├ content/            Content collections
  │ │
  │ ├ posts/            Posts (article, project, ...),
  | | |                 each posts is linked to other locale version of itsef
  | | |                 if their filepath without the locale is identical
  │ │ │
  │ │ ├ **/*.mdx        English posts
  │ │ │  **/*.en.mdx
  │ │ │  **/en/**/*.mdx
  │ │ │
  │ │ └ **/*.fr.mdx     French posts
  │ │    **/fr/**/*.mdx
  │ │
  │ └ jobs
  │   ├ _default.ts     Global default content of each jobs (general infos)
  │   └ **/*.ts         A job application content (CV + motivation letter)
  │
  └ pages/              Pages definition
    └ **/_locales.ts    Page content differienciated by locales
```
