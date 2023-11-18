import L, { LatLng, LatLngBounds, LatLngExpression } from "leaflet";
import { useState } from "react";

import { ImageOverlay, MapContainer, Marker, TileLayer } from "react-leaflet";
import Facility from "../../models/Facility";
import Weather from "./Weather";
import { Card } from "@/components/ui/card";

const merlioncenter: LatLngExpression = [1.295, 103.775887811];
const merliontopleft: LatLng = new LatLng(1.3, 103.766998922);
const merlionbottomright: LatLng = new LatLng(1.29, 103.7847767);
// const merlionbottomright: LatLng = new LatLng(1.29, 103.7847767);
const bounds: LatLngBounds = new LatLngBounds(
  merliontopleft,
  merlionbottomright,
);
const backgroundtopleft: LatLng = new LatLng(1.4, 104.766998922);
const backgroundbottomright: LatLng = new LatLng(1.1, 102.847767);
// const backgroundbottomright: LatLng = new LatLng(1.1, 102.7847767);
const backgroundbounds: LatLngBounds = new LatLngBounds(
  backgroundtopleft,
  backgroundbottomright,
);

const localhost_5174_address = import.meta.env.VITE_LOCALHOST_5174_ADDRESS;
// http://localhost:5174/src/assets/mapicons/parking.png
// map icons
function iconFunction(selected: boolean, number: number) {
  let iconUrl = `http://${localhost_5174_address}/src/assets/numbers/1.png`;
  switch (number) {
    case 1:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/1.png`;
      break;

    case 2:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/2.png`;
      break;

    case 3:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/3.png`;
      break;

    case 4:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/4.png`;
      break;

    case 5:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/5.png`;
      break;

    case 6:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/6.png`;
      break;

    case 7:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/7.png`;
      break;

    case 8:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/8.png`;
      break;

    case 9:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/9.png`;
      break;

    case 10:
      iconUrl = `http://${localhost_5174_address}/src/assets/numbers/10.png`;
      break;
  }

  if (selected) {
    return new L.Icon({
      iconUrl,
      iconSize: [30, 31],
      iconAnchor: [15, 40],
      className: "selected-icon",
    });
  }

  return new L.Icon({
    iconUrl,
    iconSize: [30, 31],
    iconAnchor: [15, 40],
  });
}
// return new L.Icon({
//   iconUrl =  "../../../../src/assets/mapicons/parking.png",
//   iconSize: [30, 31],
//   iconAnchor: [15, 40],
// });

interface FacilityWithSelected extends Facility {
  selected: boolean;
}

interface Option {
  text: string;
}

interface LandingPageMapProps {
  facilityList: Facility[];
}

function ItineraryMapComponent(props: LandingPageMapProps) {
  const [curRealLocation, setCurRealLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { facilityList } = props;

  {
    /*function handleMarkerClick(selFacility: FacilityWithSelected) {
    if (selectedFacility?.facilityId == selFacility.facilityId) {
      const tempFacilityList = facilityList.map((facility) =>
        facility.facilityId === selFacility.facilityId
          ? { ...facility, selected: false }
          : { ...facility, selected: false },
      );
      setFacilityList(tempFacilityList);
      setSelectedFacility(null);
    } else {
      const tempFacilityList = facilityList.map((facility) =>
        facility.facilityId === selFacility.facilityId
          ? { ...facility, selected: !facility.selected }
          : { ...facility, selected: false },
      );
      setSelectedFacility(selFacility);
      setFacilityList(tempFacilityList);
    }
  }

  function oldHandleMarkerClick(facility: Facility) {
    console.log(facility);
    if (selectedFacility == facility) {
      setSelectedFacility(null);
    } else {
      setSelectedFacility(facility);
    }
  }*/
  }

  return (
    <div>
      <Card className="h-[50vh] w-full overflow-hidden rounded rounded-lg">
        <MapContainer
          center={merlioncenter}
          zoom={15}
          bounds={bounds}
          maxBounds={bounds}
          minZoom={15}
          maxZoom={20}
        >
          {/* <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          <TileLayer
            noWrap={true}
            // attribution="Merlion Zoo"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* <TileLayer
            noWrap={true}
            attribution="Merlion Zoo"
            url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
          /> */}
          <ImageOverlay
            url={`http://${localhost_5174_address}/src/assets/mapBG.png`}
            bounds={backgroundbounds}
          />
          <ImageOverlay
            url={`http://${localhost_5174_address}/src/assets/realmap.png`}
            bounds={bounds}
          />

          {facilityList.map((facility, idx) => (
            <Marker
              key={`marker-${idx}`}
              icon={iconFunction(true, idx + 1)}
              position={[facility.yCoordinate, facility.xCoordinate]}
            ></Marker>
          ))}
        </MapContainer>
      </Card>
    </div>
  );
}

export default ItineraryMapComponent;
