import React, { useEffect, useState, useRef } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { InputText } from "primereact/inputtext";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  MapContainer,
  Marker,
  useMap,
  useMapEvents,
  ImageOverlay,
  Polygon,
  SVGOverlay,
} from "react-leaflet";
import { TileLayer } from "react-leaflet";
import L, {
  LatLng,
  LatLngBounds,
  LatLngBoundsLiteral,
  LatLngExpression,
} from "leaflet";
import Facility from "../../models/Facility";
import useApiJson from "../../hooks/useApiJson";
import HorizontalScrollOptionsList from "../../components/HorizontalScrollOptionsList";
import { FacilityType } from "../../enums/FacilityType";
import { HiCheck, HiX, HiOutlineSearch } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
import MapComponent from "../../components/Map/MapComponent";
import { Portal } from "@radix-ui/react-portal";
import { Input } from "@/components/ui/input";
// Import Tailwind CSS styles
import "tailwindcss/tailwind.css";

// import geolocation from "geolocation";

interface Option {
  text: string;
}

function MapLandingPage() {
  const navigate = useNavigate();
  const apiJson = useApiJson();
  const toastShadcn = useToast().toast;

  const [facilityList, setFacilityList] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null,
  );
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  const [filteredFacilityList, setFilteredFacilityList] = useState<Facility[]>(
    [],
  );
  const [facilityTypeFilterValue, setFacilityTypeFilterValue] = useState<
    string | null
  >(null);

  const [searchText, setSearchText] = useState<string>("");

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchNoLocationFacilities = async () => {
      try {
        console.log("useEffect here");
        const responseJson = await apiJson.post(
          `http://${localhost_address}/api/assetFacility/getAllFacilityCustomer`,
          { includes: ["facilityDetail"] },
        );
        const facilityListWithLocation = (
          responseJson.facilities as Facility[]
        ).filter((facility) => {
          // console.log(facility);
          return !(
            facility.xCoordinate == null || facility.yCoordinate == null
          );
        });
        setFacilityList(facilityListWithLocation);
        setFilteredFacilityList(facilityListWithLocation);
        if (selectedFacility) {
          const updatedFacility = facilityListWithLocation.find(
            (facility) => facility.facilityId === selectedFacility.facilityId,
          );
          setSelectedFacility(updatedFacility || null);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchNoLocationFacilities();
  }, [refreshSeed]);

  // function handleFacilTypeFilterMap(value: string) {
  //   const tempFacilityList = [...facilityList].filter((facility) => {
  //     if (value == "All") {
  //       return true;
  //     } else {
  //       return facility.facilityDetailJson.facilityType == value;
  //     }
  //   });

  //   setFilteredFacilityList(tempFacilityList);
  // }

  function handleFacilTypeFilterMap(value: string) {
    const tempFacilityList = [...facilityList].filter((facility) => {
      if (
        value === "All" ||
        facility.facilityDetailJson.facilityType === value
      ) {
        // Check if the facility matches the selected facility type
        if (searchText.trim() === "") {
          // If searchText is empty, return all facilities that match the type
          return true;
        } else {
          // If searchText is not empty, also check if the facility includes the searchText
          const facilityName = facility.facilityName.toLowerCase();
          const search = searchText.toLowerCase();
          return facilityName.includes(search);
        }
      }
      return false; // Exclude facilities that don't match the selected facility type
    });

    setFilteredFacilityList(tempFacilityList);
  }

  function clearMapFilters() {
    setFacilityTypeFilterValue("All");
    setFilteredFacilityList(facilityList);
  }

  function FilterButton() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute right-4 top-4 z-10">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black">
              <FiFilter /> {/* Use the imported icon component */}
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
          </DialogHeader>
          <div className="flex h-[7vh] items-center gap-4 px-5">
            <div>Filters: </div>

            <Select
              value={facilityTypeFilterValue?.toString()}
              onValueChange={(value) => {
                setFacilityTypeFilterValue(value);
                handleFacilTypeFilterMap(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Facility type" />
              </SelectTrigger>
              <SelectContent className="max-h-[30vh] overflow-y-auto">
                <SelectGroup id="facilityTypeFilterSelect">
                  <SelectItem key={"all"} value="All">
                    All
                  </SelectItem>
                  {Object.keys(FacilityType).map((facilityTypeKey) => (
                    <SelectItem key={facilityTypeKey} value={facilityTypeKey}>
                      {FacilityType[
                        facilityTypeKey as keyof typeof FacilityType
                      ].toString()}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const options = [
    { text: "Wildlife" },
    { text: "Feeding" },
    { text: "Shows" },
    { text: "Keeper Talk" },
    { text: "Dining" },
    { text: "Amenities" },
    { text: "Kids" },

    // Add more options as needed
  ];

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option | null) => {
    if (option) {
      if (selectedOption == option) {
        setSelectedOption(null);
      } else {
        setSelectedOption(option);
        console.log(`Selected option: ${option.text}`);
      }

      if (option.text === "Amenities") {
        setFilteredFacilityList(facilityList);
      } else {
        setFilteredFacilityList([]);
      }
    }
  };

  return (
    <div className="h-screen w-screen justify-center">
      <div className="flex w-full flex-col rounded-lg border border-stroke bg-white pt-4 text-black shadow-default">
        <div className="px-4 pt-4">
          <div className="relative">
            <Input
              type="search"
              value={searchText}
              placeholder="Find attractions, food, more..."
              className="w-full py-2 pl-10 pr-3 focus:border-blue-300 focus:outline-none focus:ring"
              onChange={(e) => {
                setSearchText(e.target.value);
                handleFacilTypeFilterMap(
                  facilityTypeFilterValue ? facilityTypeFilterValue : "All",
                );
              }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <HiOutlineSearch className="text-gray-500 h-5 w-5" />
            </div>
          </div>
          <HorizontalScrollOptionsList
            options={options}
            onOptionClick={handleOptionClick}
            selectedOption={selectedOption} // Pass selectedOption as a prop
          />
        </div>

        <div className=" w-full overflow-hidden rounded-md border border-stroke shadow-md">
          <div className="relative">
            {selectedOption?.text == "Amenities" && <FilterButton />}

            <MapComponent
              facilityList={filteredFacilityList}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
              setIsShownOnMap={true}
            />
          </div>
        </div>

        {selectedFacility && (
          <Card
            className="h-1/8 fixed bottom-0 left-0 right-0 max-w-lg translate-y-full transform rounded-t-lg bg-white p-4 shadow-lg transition-transform duration-1000"
            style={{
              transform: selectedFacility
                ? "translateY(0)"
                : "translateY(100%)",
            }}
          >
            <CardHeader>
              <CardContent className="mb-8 font-semibold">
                {selectedFacility.facilityName}
              </CardContent>
              {/* <CardDescription>
                  Deploy your new project in one-click.
              </CardDescription> */}
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}

export default MapLandingPage;
