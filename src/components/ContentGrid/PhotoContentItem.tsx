export function PhotoContentItem({
  photoUrl,
  smallPhotoUrl,
}: PhotoContentItemProps) {
  return (
    <li>
      <picture>
        <source
          srcSet={photoUrl}
          media="(min-width: 768px)"
          width={800}
          height={800}
        />
        <img alt="A photo" src={smallPhotoUrl} width={250} height={250} />
      </picture>
    </li>
  );
}

interface PhotoContentItemProps {
  photoUrl: string;
  smallPhotoUrl: string;
}
