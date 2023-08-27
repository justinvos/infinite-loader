import { useInfiniteQuery } from "@tanstack/react-query";

export function useContentItemsQuery<TContent>({
  initialData,
  queryPage,
}: UseContentItemsQueryProps<TContent>): UseContentItemsQueryReturn<TContent> {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["content"],
    queryFn: ({ pageParam = 0 }) => queryPage(pageParam),
    getNextPageParam: (_, pages) => pages.length,
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
  });

  const allContentItems = data?.pages.flatMap((page) => page ?? []) ?? [];

  return {
    allContentItems,
    fetchNextPage,
    isFetchingContent: isFetching,
  };
}

interface UseContentItemsQueryProps<TContent> {
  initialData: TContent[];
  queryPage: (pageNumber: number) => Promise<TContent[]>;
}

interface UseContentItemsQueryReturn<TContent> {
  allContentItems: TContent[];
  fetchNextPage: () => void;
  isFetchingContent: boolean;
}
