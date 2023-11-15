import moment from "moment-timezone";
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
  startDateTime: Date;
  facilityName: string;
  endDateTime: Date | null;
}

function EventImageCard({
  key,
  imageUrl,
  title,
  description,
  startDateTime,
  endDateTime,
  facilityName,
}: ImageCardProps) {
  function convertUtcToTimezone(utcDate: Date, targetTimezone: string): string {
    const utcMoment = moment.utc(utcDate);
    const targetMoment = utcMoment.tz(targetTimezone);
    const formattedTime: string = targetMoment.format("DD MMM YYYY");
    // const timestampWithSuffix: string = `${formattedTime} SGT`;
    // return timestampWithSuffix;
    return formattedTime;
  }
  return (
    <CardModified className="w-full min-w-[240px] max-w-[300px]">
      <CardContentModified>
        <div className="relative h-40 w-100 overflow-hidden">
          <img
            src={imageUrl}
            alt="Card Image"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
      </CardContentModified>
      <CardHeaderModified>
        <CardTitleModified>
          <div>{title}</div>
        </CardTitleModified>
        <CardDescriptionModified className="line-clamp-2">
          <div>
            {/*<div>{description}</div>*/}
            <div className="font-medium">
              Starting {convertUtcToTimezone(startDateTime, "Asia/Singapore")}
              {endDateTime && " - "}
              {endDateTime &&
                convertUtcToTimezone(endDateTime, "Asia/Singapore")}
            </div>
            {/*<div>
            {new Date(startDateTime).toLocaleTimeString()}
            {" - "}
            {new Date(endDateTime).toLocaleTimeString()}
</div>*/}
            <div className="font-medium">{facilityName}</div>
          </div>
        </CardDescriptionModified>
      </CardHeaderModified>
    </CardModified>
  );
}

export default EventImageCard;
