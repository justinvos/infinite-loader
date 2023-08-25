"use client";

import { ContentItem } from "./ContentItem";
import { useContentItemsQuery } from "./useContentItemsQuery";

export function ContentGrid() {
  const { allContentItems, fetchNextPage } = useContentItemsQuery();

  function handleNextPageClick() {
    fetchNextPage();
  }

  return (
    <>
      <ul className="grid grid-cols-3 gap-8">
        {allContentItems.map((contentItem) => (
          <ContentItem key={contentItem.id} {...contentItem} />
        ))}
      </ul>
      <button onClick={handleNextPageClick} type="button">
        Next page
      </button>
    </>
  );
}
