"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

export function ContentGrid() {
  const { isLoading, error, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["content"],
    queryFn: getPicsumContent,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  if (!data || isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>An error occured: {String(error)}</p>;
  }

  function handleNextPageClick() {
    fetchNextPage();
  }

  const allItems = data.pages.flatMap((page) => page);

  return (
    <>
      <ul className="grid grid-cols-3 gap-8">
        {allItems.map((contentItem) => (
          <li key={contentItem.id}>
            <img alt="Test" src={contentItem.download_url} />
          </li>
        ))}
      </ul>
      <button onClick={handleNextPageClick} type="button">
        Next page
      </button>
    </>
  );
}

function getPicsumContent({
  pageParam = 1,
}): Promise<PicsumPhotosResponseBody> {
  return fetch(`https://picsum.photos/v2/list?page=${pageParam}&limit=12`).then(
    (res) => res.json()
  );
}

type PicsumPhotosResponseBody = PicsumContentItem[];

interface PicsumContentItem {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
