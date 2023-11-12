import { EventTimingType } from "../enums/EventTimingType";
import { EventType } from "../enums/EventType";
import InHouse from "./InHouse";

interface ZooEvent {
  zooEventId: number;
  eventName: string;
  eventDescription: string;
  eventIsPublic: boolean;
  eventType?: EventType | string;
  eventStartDateTime: Date;
  requiredNumberOfKeeper: number;

  // Internal Event
  eventDurationHrs: number;
  eventTiming: EventTimingType | null;

  // External Event
  eventNotificationDate: Date;
  eventEndDateTime: Date | null;
  imageUrl: string;

  // enclosure?: Enclosure;
  //   animals?: Animal[];
  inHouse?: InHouse;
  // animalClinic?: AnimalClinic;
}

export default ZooEvent;
