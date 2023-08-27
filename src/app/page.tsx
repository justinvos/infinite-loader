import { PicsumPhotosInfiniteLoader } from "./PicsumPhotosInfiniteLoader";
import { queryPicsumPhotos } from "./queryPicsumPhotos";

export default async function Home() {
  const initialData = await queryPicsumPhotos(0);

  return <PicsumPhotosInfiniteLoader initialData={initialData} />;
}
