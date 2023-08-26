import { ContentGrid, getPicsumPhotos } from "@/components/ContentGrid";

export default async function Home() {
  const initialData = await getPicsumPhotos({ pageParam: 1 });

  return <ContentGrid initialData={initialData} />;
}
