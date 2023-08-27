const PAGE_SIZE = 12;

export async function queryPicsumPhotos(pageNumber: number) {
  const responseBody = await getPicsumPhotos(pageNumber);
  return responseBody.map(transformContentItem);
}

function getPicsumPhotos(
  pageNumber: number
): Promise<PicsumPhotosResponseBody> {
  const pageParam = pageNumber + 1;
  return fetch(
    `https://picsum.photos/v2/list?page=${pageParam}&limit=${PAGE_SIZE}`
  ).then((res) => res.json());
}

export type PicsumPhotosResponseBody = PicsumPhotoResponseItem[];

interface PicsumPhotoResponseItem {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

function transformContentItem(
  picsumPhotoResponseItem: PicsumPhotoResponseItem
): PicsumPhotoContentItem {
  return {
    key: picsumPhotoResponseItem.id,
    photoUrl: `https://picsum.photos/id/${picsumPhotoResponseItem.id}/800`,
    smallPhotoUrl: `https://picsum.photos/id/${picsumPhotoResponseItem.id}/250`,
  };
}

export interface PicsumPhotoContentItem {
  key: string;
  photoUrl: string;
  smallPhotoUrl: string;
}
