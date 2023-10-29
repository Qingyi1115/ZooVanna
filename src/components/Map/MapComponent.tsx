import L, {
  CRS,
  LatLng,
  LatLngBounds,
  LatLngBoundsLiteral,
  LatLngExpression,
} from "leaflet";
import React, { useEffect, useState } from "react";

import {
  MapContainer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  ImageOverlay,
  TileLayer,
} from "react-leaflet";
import Facility from "../../models/Facility";

const merlioncenter: LatLngExpression = [1.295, 103.775887811];
const merliontopleft: LatLng = new LatLng(1.3, 103.766998922);
const merlionbottomright: LatLng = new LatLng(1.29, 103.7847767);
const bounds: LatLngBounds = new LatLngBounds(
  merliontopleft,
  merlionbottomright,
);
const backgroundtopleft: LatLng = new LatLng(1.4, 104.766998922);
const backgroundbottomright: LatLng = new LatLng(1.1, 102.7847767);
const backgroundbounds: LatLngBounds = new LatLngBounds(
  backgroundtopleft,
  backgroundbottomright,
);

const localhost_5174_address = import.meta.env.VITE_LOCALHOST_5174_ADDRESS;
// http://localhost:5174/src/assets/mapicons/parking.png
// map icons
function iconFunction(facilityType: string) {
  console.log("facil type icon: " + facilityType);
  switch (facilityType) {
    case "INFORMATION_CENTRE":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/1.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "ZOO_DIRECTORY":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/3.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "AMPHITHEATRE":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/4.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "GAZEBO":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/5.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "AED":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/6.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "RESTROOM":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/7.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "NURSERY":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/8.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "FIRST_AID":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/9.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "BENCHES":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/10.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "PLAYGROUND":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/11.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "TRAMSTOP":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/13.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "PARKING":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/14.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "RESTAURANT":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/15.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    case "SHOP_SOUVENIR":
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/16.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
    default:
      return new L.Icon({
        iconUrl: `https://${localhost_5174_address}/src/assets/mapicons/17.png`,
        iconSize: [30, 31],
        iconAnchor: [15, 40],
      });
  }
  // return new L.Icon({
  //   iconUrl: "../../../../src/assets/mapicons/parking.png",
  //   iconSize: [30, 31],
  //   iconAnchor: [15, 40],
  // });
}

interface LandingPageMapProps {
  facilityList: Facility[];
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
    facilityList,
    selectedFacility,
    setSelectedFacility,
    setIsShownOnMap,
  } = props;

  function handleMarkerClick(facility: Facility) {
    console.log(facility);
    if (selectedFacility == facility) {
      setSelectedFacility(null);
    } else {
      setSelectedFacility(facility);
    }
  }

  return (
    <div>
      <div className="h-[80vh] w-screen ">
        <MapContainer
          center={merlioncenter}
          zoom={16}
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
            attribution="Merlion Zoo"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* <TileLayer
            noWrap={true}
            attribution="Merlion Zoo"
            url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
          /> */}
          <ImageOverlay
            url={`https://${localhost_5174_address}/src/assets/mapBG.png`}
            bounds={backgroundbounds}
          />
          <ImageOverlay
            url={`https://${localhost_5174_address}/src/assets/realmap.png`}
            bounds={bounds}
          />
          {facilityList.map((facility, idx) => (
            <Marker
              key={`marker-${idx}`}
              icon={iconFunction(facility.facilityDetailJson.facilityType)}
              eventHandlers={{
                click: () => handleMarkerClick(facility),
                // mouseover: onHoverMarker,
                // mouseout: onStopHoverMarker,
              }}
              position={[facility.yCoordinate, facility.xCoordinate]}
            ></Marker>
          ))}
          {/* <Marker draggable position={[1.29, 103.7827767]}></Marker>{" "} */}
          {/* <MyComponent /> */}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComponent;
