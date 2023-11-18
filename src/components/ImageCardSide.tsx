import {
  CardContentModified,
  CardDescriptionModified,
  CardHeaderModified,
  CardModified,
  CardTitleModified,
} from "./CardModified";

interface ImageCardProps {
  key: number;
  imageUrl: string;
  title: string;
  description: string;
}

function ImageCardSide({ key, imageUrl, title, description }: ImageCardProps) {
  return (
    // fixed bottom-[8vh] left-0 right-0 mx-3 translate-y-full transform bg-white shadow-lg transition-transform duration-1000
    <CardModified className="fixed bottom-[8vh] left-0 right-0 mx-3 flex items-center rounded-xl">
      <div className="relative m-2 h-30 w-2/5 max-w-[200px] overflow-hidden rounded-xl">
        <img
          src={imageUrl}
          alt="Card Image"
          className="h-full w-full object-cover"
        />
      </div>
      <CardContentModified className="w-3/4">
        <CardHeaderModified>
          <CardTitleModified className="pl-5">{title}</CardTitleModified>
          <CardDescriptionModified>{description}</CardDescriptionModified>
        </CardHeaderModified>
      </CardContentModified>
    </CardModified>
  );
}

export default ImageCardSide;
