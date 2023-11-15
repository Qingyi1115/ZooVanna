import { RecurringPattern } from "../enums/RecurringPattern";
import { EventTimingType } from "../enums/EventTimingType";
import { EventType } from "../enums/EventType";
import InHouse from "./InHouse";
import PublicEvent from "./PublicEvent";
import ZooEvent from "./ZooEvent";
import { DayOfWeek } from "../enums/DayOfWeek";

interface PublicEventSession {
  publicEventSessionId: number;
  recurringPattern: RecurringPattern;
  dayOfWeek: DayOfWeek | null;
  dayOfMonth: number | null;
  durationInMinutes: number;
  time: string;
  daysInAdvanceNotification: number;

  publicEvent?: PublicEvent;
  zooEvents?: ZooEvent[];
}

export default PublicEventSession;
