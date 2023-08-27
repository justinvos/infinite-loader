"use client";

import { useContentItemsQuery } from "./useContentItemsQuery";
import { useReachBottomListener } from "./useReachBottomListener";

const DEFAULT_BOTTOM_OFFSET = 300;

export function InfiniteLoader<TContent extends InfiniteLoaderBaseContent>({
  bottomOffset = DEFAULT_BOTTOM_OFFSET,
  initialData = [],
  queryPage,
  renderContainer: Container,
  renderItem: Item,
}: InfiniteLoaderProps<TContent>) {
  const { allContentItems, fetchNextPage, isFetchingContent } =
    useContentItemsQuery({
      initialData,
      queryPage,
    });

  function handleReachBottom() {
    if (!isFetchingContent) {
      fetchNextPage();
    }
  }

  useReachBottomListener({ bottomOffset, onReachBottom: handleReachBottom });

  return (
    <Container>
      {allContentItems.map((contentItem) => (
        <Item key={contentItem.key} content={contentItem} />
      ))}
    </Container>
  );
}

interface InfiniteLoaderProps<TContent> {
  bottomOffset?: number;
  initialData?: TContent[];
  queryPage: (pageNumber: number) => Promise<TContent[]>;
  renderContainer: (props: React.PropsWithChildren<{}>) => JSX.Element;
  renderItem: (props: InfiniteLoaderItemProps<TContent>) => JSX.Element;
}

export interface InfiniteLoaderItemProps<TContent> {
  content: TContent;
}

export interface InfiniteLoaderBaseContent {
  key: string;
}
