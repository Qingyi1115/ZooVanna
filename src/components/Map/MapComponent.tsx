import L, { LatLng, LatLngBounds, LatLngExpression } from "leaflet";
import { useState } from "react";

import { ImageOverlay, MapContainer, Marker, TileLayer } from "react-leaflet";
import Facility from "../../models/Facility";
import Weather from "./Weather";

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
function iconFunction(selected: boolean, facilityType: string) {
  console.log("facil type icon: " + facilityType);
  let iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/1.png`;
  switch (facilityType) {
    case "INFORMATION_CENTRE":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/1.png`;
      break;

    case "ZOO_DIRECTORY":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/3.png`;
      break;

    case "AMPHITHEATRE":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/4.png`;
      break;

    case "GAZEBO":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/5.png`;
      break;

    case "AED":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/6.png`;
      break;

    case "RESTROOM":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/7.png`;
      break;

    case "NURSERY":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/8.png`;
      break;

    case "FIRST_AID":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/9.png`;
      break;

    case "BENCHES":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/10.png`;
      break;

    case "PLAYGROUND":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/11.png`;
      break;

    case "TRAMSTOP":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/13.png`;
      break;

    case "PARKING":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/14.png`;
      break;

    case "RESTAURANT":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/15.png`;
      break;

    case "SHOP_SOUVENIR":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/16.png`;
      break;

    case "ENCLOSURE":
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/18.png`;
      break;

    default:
      iconUrl = `http://${localhost_5174_address}/src/assets/mapicons/17.png`;
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
  selectedOption: Option;
  facilityList: FacilityWithSelected[];
  setFacilityList: any;
  selectedFacility: Facility | null;
  setSelectedFacility: any;
  setIsShownOnMap: any;
}

function MapComponent(props: LandingPageMapProps) {
  const [curRealLocation, setCurRealLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const {
    selectedOption,
    facilityList,
    setFacilityList,
    selectedFacility,
    setSelectedFacility,
    setIsShownOnMap,
  } = props;

  function handleMarkerClick(selFacility: FacilityWithSelected) {
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
  }

  return (
    <div>
      <div className="h-[84vh] w-screen ">
        <MapContainer
          center={merlioncenter}
          zoom={15}
          bounds={bounds}
          maxBounds={bounds}
          minZoom={14}
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

          {(selectedOption.text === "All" ||
            selectedOption.text === "Amenities") &&
            facilityList.map((facility, idx) => (
              <Marker
                key={`marker-${idx}`}
                icon={iconFunction(
                  facility.selected,
                  facility.facilityDetailJson.facilityType,
                )}
                eventHandlers={{
                  click: () => handleMarkerClick(facility),
                  // mouseover: onHoverMarker,
                  // mouseout: onStopHoverMarker,
                }}
                position={[facility.yCoordinate, facility.xCoordinate]}
              ></Marker>
            ))}
          {selectedOption.text === "Wildlife" &&
            facilityList.map((facility, idx) => (
              <Marker
                key={`marker-${idx}`}
                icon={iconFunction(facility.selected, "ENCLOSURE")}
                eventHandlers={{
                  click: () => handleMarkerClick(facility),
                  // mouseover: onHoverMarker,
                  // mouseout: onStopHoverMarker,
                }}
                position={[facility.yCoordinate, facility.xCoordinate]}
              ></Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComponent;
