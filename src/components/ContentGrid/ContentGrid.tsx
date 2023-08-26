"use client";
import { ContentItem } from "./ContentItem";
import { useContentItemsQuery } from "./useContentItemsQuery";
import { useReachBottomListener } from "./useReachBottomListener";

export function ContentGrid() {
  const { allContentItems, fetchNextPage, isFetchingContent } =
    useContentItemsQuery();

  function handleReachBottom() {
    if (!isFetchingContent) {
      fetchNextPage();
    }
  }

  useReachBottomListener({ onReachBottom: handleReachBottom });

  return (
    <>
      <ul className="grid grid-cols-3 gap-8">
        {allContentItems.map((contentItem) => (
          <ContentItem key={contentItem.id} {...contentItem} />
        ))}
      </ul>
    </>
  );
}
