"use client";
import { ContentItem } from "./ContentItem";
import {
  useContentItemsQuery,
  PicsumPhotosResponseBody,
} from "./useContentItemsQuery";
import { useReachBottomListener } from "./useReachBottomListener";

export function ContentGrid({ initialData }: ContentGridProps) {
  const { allContentItems, fetchNextPage, isFetchingContent } =
    useContentItemsQuery(initialData);

  function handleReachBottom() {
    if (!isFetchingContent) {
      fetchNextPage();
    }
  }

  useReachBottomListener({ onReachBottom: handleReachBottom });

  return (
    <>
      <ul className="auto-rows-min-content-cell gap-8 grid grid-cols-3">
        {allContentItems.map((contentItem) => (
          <ContentItem key={contentItem.id} {...contentItem} />
        ))}
      </ul>
    </>
  );
}

interface ContentGridProps {
  initialData: PicsumPhotosResponseBody;
}
