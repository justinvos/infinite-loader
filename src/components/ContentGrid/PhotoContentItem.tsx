export function PhotoContentItem({ photoUrl }: PhotoContentItemProps) {
  return (
    <li>
      <img alt="Photo item" src={photoUrl} />
    </li>
  );
}

interface PhotoContentItemProps {
  photoUrl: string;
}
