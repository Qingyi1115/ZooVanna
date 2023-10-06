import React from "react";
import {
  CardModified,
  CardContentModified,
  CardDescriptionModified,
  CardFooterModified,
  CardHeaderModified,
  CardTitleModified,
} from "./CardModified";


interface ImageCardProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

function ImageCard({ id, imageUrl, title, description }: ImageCardProps) {
  return (
    <CardModified className="w-full min-w-[60vw] lg:max-w-md">
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
        <CardDescriptionModified>{description}</CardDescriptionModified>
      </CardHeaderModified>
    </CardModified>
  );
}

export default ImageCard;
