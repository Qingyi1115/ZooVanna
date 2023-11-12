interface Facility {
  facilityId: number;
  facilityName: string;
  imageUrl: string;
  xCoordinate: number;
  yCoordinate: number;
  isSheltered: Boolean;
  showOnMap: boolean;
  facilityDetail: string;
  facilityDetailJson: any;
}

export default Facility;
