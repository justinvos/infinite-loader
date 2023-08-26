# Infinite Loader

## Requirements

Create an infinite loader component, with the following requirements:

- The code should be written in Typescript, using the latest React paradigms.
- The infinite loader should be generic, meaning it needs to work with any API which supports pagination and it needs to be able to render any kind of content the consumer of the component requires (e.g. client side pagination).
- On scrolling to the end of the view, it should fetch and render the next results.
- The component needs to take performance into consideration.

Additional notes:

- Writing tests is not a requirement here.
- You can share the result in any place that works for you (github link, code sandbox etc)
- This does not need to be a production ready component, aside from implementing the requirements, mentioning any additional options you would bake into the component, and how, is enough.
- You could use any API you want, but if you're out of ideas (we could reformulate this part with out of ideas), you could use this one: https://picsum.photos/v2/list

## Challenges to solve:

### How to know if scrolled to bottom

Googled around and found 3 main solutions people had:

1. Add an invisible element and use IntersectionObserver. This works and is simple but makes unsemantic HTML.
2. NPM packages like react-bottom-scroll-listener. Is straight-forward but also introduces 3rd party code.
3. Attach a scroll event listener on the window and calculate if scrolled to the bottom using window.innerHeight, window.scrollY and document.documentElement.scrollHeight. https://stackoverflow.com/a/63502850

I put together this experiment in CodeSandbox quickly just to test my thinking with the 3rd solution.
https://codesandbox.io/s/distracted-wood-7xlm38?file=/src/App.tsx

### How to fetch content with pagination

`react-query` has a useInfiniteQuery hook which does just this.
https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery

The [picsum.photos](https://picsum.photos/) homepage has an example of fetching using their pagination query parameters.

```
https://picsum.photos/v2/list?page=2&limit=100
```

### How to render any kind of content

Initially I'll build the solution to support images but I'll also implement a generic ContentCard component which could be extended to render ImageContentCard, TextContentCard, VideoContentCard or anything else.

### Performance

One performance issue will be how many scroll events will be triggered and I'll need to throttle the requests made to the API.

If I find the scroll calculations are causing performance issues, I could throttle that too.

Following general React best-practice should help with most other performance issues on the frontend.

## Issues I ran into:

### @next/next/no-img-element

Next.js default ESLint rules wanted me to use their Image component which could be useful for optimisation.

However when I tried using it, it gave me a "picsum.photos" host is not supported/allowed.
Because of this, I reverted back to using the standard HTML img tag but it could be a good optimisation.

### Pages off by 1

I found through trial and error that https://picsum.photos/v2/list responds the same with page=0 and page=1. In other words, their index starts at 1.

To determine the next page number, I'm taking the current number of pages and adding 1.

### 2 pages loading when scrolling to bottom

This bug occured when I reached to the bottom of the page and after successfully fetching the next page.
The isFetchingContent boolean would then be reset to false by react-query and before the images had time to load, another fetch was being made.

Setting a minimum height on the grid rows meant that as soon as React re-rendered with the new content, the user would no longer be at the bottom of the page.

### radash throttle vs lodash throttle

I started by using radash's throttle function but ran into an issue with handleScroll invocations being too early in the scroll and not recalling when the user finished the scrolling to the bottom of the page.

By looking at [radash's documentation on the throttle timing](https://radash-docs.vercel.app/docs/curry/throttle#timing), I found this was by design.

[Lodash's throttle](https://radash-docs.vercel.app/docs/curry/throttle#timing) has leading and trailing options and with the default trailing=true, I was getting that final handleScroll at the end of the user's scroll.

### Deploying Next.js to GitHub Pages

I ran into 2 issues, first was with Next.js v13 not supporting SSG builds by default anymore.
(Next.js Static Exports configuration change)[https://nextjs.org/docs/pages/building-your-application/deploying/static-exports]

When testing the GitHub actions build on my own branch, a branch protection rule blocked me from deployment.
(Solution on GitHub thread)[https://github.com/orgs/community/discussions/39054#discussioncomment-6727766]

### Google PageSpeed Insights test

A quick look at Google's PageSpeed test looked great for Desktop and mostly good for Mobile.

The issues it raised where almost entirely about the size of the images I was trying to load. A good optimisation could be to have a mobile-friendly photo URL with a smaller resolution.

![Google PageSpeed Desktop test result](/readme-images/page-speed-desktop.png "Google PageSpeed Desktop test result")

![Google PageSpeed Mobile test result](/readme-images/page-speed-mobile.png "Google PageSpeed Mobile test result")
