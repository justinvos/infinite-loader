import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 12;

export function useContentItemsQuery(): UseContentItemsQueryReturn {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["content"],
    queryFn: getPicsumPhotos,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const allPhotoItems = data?.pages.flatMap((page) => page ?? []) ?? [];
  const allContentItems = allPhotoItems?.map(transformContentItem);

  return {
    allContentItems,
    isFetchingContent: isFetching,
    fetchNextPage,
  };
}

interface UseContentItemsQueryReturn {
  allContentItems: ContentItemModel[];
  fetchNextPage: () => void;
  isFetchingContent: boolean;
}

function getPicsumPhotos({ pageParam = 1 }): Promise<PicsumPhotosResponseBody> {
  return fetch(
    `https://picsum.photos/v2/list?page=${pageParam}&limit=${PAGE_SIZE}`
  ).then((res) => res.json());
}

type PicsumPhotosResponseBody = PicsumPhotoItem[];

interface PicsumPhotoItem {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

function transformContentItem(
  picsumPhotoItem: PicsumPhotoItem
): ContentItemModel {
  return {
    id: picsumPhotoItem.id,
    contentType: "photo",
    photoUrl: `https://picsum.photos/id/${picsumPhotoItem.id}/800`,
  };
}

export interface ContentItemModel {
  id: string;
  contentType: "photo";
  photoUrl: string;
}
