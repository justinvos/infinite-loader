import { PhotoContentItem } from "./PhotoContentItem";
import { ContentItemModel } from "./useContentItemsQuery";

export function ContentItem({ contentType, photoUrl }: ContentItemProps) {
  if (contentType === "photo") {
    return <PhotoContentItem photoUrl={photoUrl} />;
  }

  return <li>Unknown content item</li>;
}

export type ContentItemProps = Omit<ContentItemModel, "id">;
