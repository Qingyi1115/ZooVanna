import {
  CardContentModified,
  CardDescriptionModified,
  CardHeaderModified,
  CardModified,
  CardTitleModified
} from "./CardModified";

interface ImageCardProps {
  key: number;
  imageUrl: string;
  title: string;
  description: string;
}

function ImageCard({ key, imageUrl, title, description }: ImageCardProps) {
  return (
    <CardModified className="w-full min-w-[240px] max-w-[300px]">
      <CardContentModified>
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt="Card Image"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
      </CardContentModified>
      <CardHeaderModified>
        <CardTitleModified>{title}</CardTitleModified>
        <CardDescriptionModified className="line-clamp-2">
          {description}
        </CardDescriptionModified>
      </CardHeaderModified>
    </CardModified>
  );
}

export default ImageCard;
