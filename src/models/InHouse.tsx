import { FacilityType } from "../enums/FacilityType";
import CustomerReportLog from "./CustomerReportLog";
import Facility from "./Facility";
import ZooEvent from "./ZooEvent";

interface InHouse {
  maxAccommodationSize: number;
  hasAirCon: Boolean;
  facilityType: FacilityType;
  facility?: Facility;

  zooEvents?: ZooEvent[];
  customerReportLogs?: CustomerReportLog[];
}

export default InHouse;
