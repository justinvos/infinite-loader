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