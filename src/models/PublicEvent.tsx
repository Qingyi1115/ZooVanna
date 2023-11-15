import { EventTimingType } from "../enums/EventTimingType";
import { EventType } from "../enums/EventType";
import InHouse from "./InHouse";
import PublicEventSession from "./PublicEventSession";

interface PublicEvent {
  publicEventId: number;
  title: string;
  details: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date | null;

  inHouse?: InHouse;
  publicEventSessions?: PublicEventSession[];
}
export default PublicEvent;
