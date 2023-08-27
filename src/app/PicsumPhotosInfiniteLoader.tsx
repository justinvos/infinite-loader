"use client";
import {
  InfiniteLoader,
  InfiniteLoaderItemProps,
} from "@/components/InfiniteLoader";
import { queryPicsumPhotos, PicsumPhotoContentItem } from "./queryPicsumPhotos";

export function PicsumPhotosInfiniteLoader({
  initialData,
}: PicsumPhotosInfiniteLoaderProps) {
  return (
    <InfiniteLoader
      initialData={initialData}
      queryPage={queryPicsumPhotos}
      renderContainer={Container}
      renderItem={Item}
    />
  );
}

interface PicsumPhotosInfiniteLoaderProps {
  initialData: PicsumPhotoContentItem[];
}

function Container({ children }: React.PropsWithChildren<{}>) {
  return (
    <ul className="auto-rows-min-content-cell gap-8 grid grid-cols-3">
      {children}
    </ul>
  );
}

function Item({ content }: InfiniteLoaderItemProps<PicsumPhotoContentItem>) {
  return (
    <li>
      <picture>
        <source
          srcSet={content.photoUrl}
          media="(min-width: 768px)"
          width={800}
          height={800}
        />
        <img
          alt="A photo"
          src={content.smallPhotoUrl}
          width={250}
          height={250}
        />
      </picture>
    </li>
  );
}
