"use client";

import { useQuery } from "@tanstack/react-query";

export function ContentGrid() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["content"],
    queryFn: getCardsContent,
  });

  if (!data || isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>An error occured: {String(error)}</p>;
  }

  return (
    <ul className="grid grid-cols-3 gap-8">
      {data.map((contentItem) => (
        <li key={contentItem.id}>
          <img alt="Test" src={contentItem.download_url} />
        </li>
      ))}
    </ul>
  );
}

function getCardsContent(): Promise<PicsumPhotosResponseBody> {
  return fetch("https://picsum.photos/v2/list").then((res) => res.json());
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
