import React, { useEffect, useState, useRef } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
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

  //   const [deleteLocationFromMapDialog, setDeleteLocationFromMapDialog] =
  //     useState<boolean>(false);

  const [isShownOnMap, setIsShownOnMap] = useState<boolean>(false);

  const [filteredFacilityList, setFilteredFacilityList] = useState<Facility[]>(
    [],
  );
  const [facilityTypeFilterValue, setFacilityTypeFilterValue] = useState<
    string | null
  >(null);
  const [isShownOnMapFilterValue, setIsShownOnMapFilterValue] = useState<
    string | null
  >(null);
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchNoLocationFacilities = async () => {
      try {
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

  function handleFacilTypeFilterMap(value: string) {
    const tempFacilityList = [...facilityList].filter((facility) => {
      // console.log(
      //   "facil type: " +
      //     FacilityType[
      //       facility.facilityDetailJson
      //         .facilityType as keyof typeof FacilityType
      //     ].toString()
      // );
      // console.log("facil filter value: " + value);
      if (value == "All") {
        return true;
      } else {
        return (
          // FacilityType[
          //   facility.facilityDetailJson
          //     .facilityType as keyof typeof FacilityType
          // ].toString() == value
          facility.facilityDetailJson.facilityType == value
        );
      }
    });

    setFilteredFacilityList(tempFacilityList);
  }

  //   function handleCustMapVisibilityFilterMap(value: string) {
  //     const tempFacilityList = [...facilityList].filter((facility) => {
  //       if (value == "All") {
  //         return true;
  //       } else {
  //         return facility.showOnMap.toString() == value;
  //       }
  //     });

  //     setFilteredFacilityList(tempFacilityList);
  //   }

  function clearMapFilters() {
    setIsShownOnMapFilterValue("All");
    setFacilityTypeFilterValue("All");
    setFilteredFacilityList(facilityList);
  }

  // Delete stuff
  //   const confirmDeleteLocationFromMap = () => {
  //     setDeleteLocationFromMapDialog(true);
  //   };

  //   const hideDeleteLocationFromMapDialog = () => {
  //     setDeleteLocationFromMapDialog(false);
  //   };

  //   // Show On Map Toggle stuff
  //   const [toggleShowOnMapDialog, setToggleShowOnMapDialog] =
  //     useState<boolean>(false);
  //   const [isChecked, setIsChecked] = useState<boolean>(false);

  //   function handleOnCheckedChangeShowOnMap(checked: boolean) {
  //     confirmToggleShowOnMap();
  //     setIsChecked(checked);
  //   }

  //   const confirmToggleShowOnMap = () => {
  //     setToggleShowOnMapDialog(true);
  //   };

  //   const hideToggleShowOnMapDialog = () => {
  //     setToggleShowOnMapDialog(false);
  //   };

  //   // toggle show on map stuff
  //   async function handleToggleShowOnMap() {
  //     if (!selectedFacility) {
  //       return;
  //     }

  //     const updatedFacility = {
  //       facilityName: selectedFacility.facilityName,
  //       xCoordinate: selectedFacility.xCoordinate,
  //       yCoordinate: selectedFacility.yCoordinate,
  //       showOnMap: isChecked,
  //       facilityDetail: selectedFacility.facilityDetail,
  //       isSheltered: selectedFacility.isSheltered,
  //       facilityDetailJson: selectedFacility.facilityDetailJson,
  //     };

  //     console.log("heree");
  //     console.log(isChecked);

  //     try {
  //       const responseJson = await apiJson.put(
  //         `http://localhost:3000/api/assetFacility/updateFacility/${selectedFacility.facilityId}`,
  //         updatedFacility,
  //       );
  //       // success
  //       toastShadcn({
  //         description: "Successfully updated customer map visibility",
  //       });
  //       setIsShownOnMap(isChecked);
  //       setToggleShowOnMapDialog(false);
  //       setRefreshSeed(refreshSeed + 1);
  //     } catch (error: any) {
  //       toastShadcn({
  //         variant: "destructive",
  //         title: "Uh oh! Something went wrong.",
  //         description:
  //           "An error has occurred while updating customer map visibility map: \n" +
  //           error.message,
  //       });
  //     }
  //   }

  function SearchBar() {
    return (
      <div className="relative">
        <Input
          type="search"
          placeholder="Find attractions, food, more..."
          className="w-full py-2 pl-10 pr-3 focus:border-blue-300 focus:outline-none focus:ring"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <HiOutlineSearch className="text-gray-500 h-5 w-5" />
        </div>
      </div>
    );
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
      setSelectedOption(option);
      console.log(`Selected option: ${option.text}`);

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
          <SearchBar />
          <HorizontalScrollOptionsList
            options={options}
            onOptionClick={handleOptionClick}
            selectedOption={selectedOption} // Pass selectedOption as a prop
          />
        </div>
        {/* Header */}
        {/* <div className="flex justify-between">
      <Button variant={"outline"} type="button" className="invisible">
        Back
      </Button>
      <span className="self-center text-title-xl font-bold">Zoo Map</span>
      <Button disabled className="invisible">
        Back
      </Button>
    </div> */}

        {/* Facility Type Filter */}
        {/* <Select
                value={isShownOnMapFilterValue?.toString()}
                onValueChange={(value) => {
                  setIsShownOnMapFilterValue(value);
                  handleCustMapVisibilityFilterMap(value);
                }}
              >
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Customer map visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup id="shownOnMapFilterSelect">
                    <SelectLabel>Is Shown on Customer Map</SelectLabel>
                    <SelectItem key={"all"} value="All">
                      All
                    </SelectItem>
                    <SelectItem key={"true"} value="true">
                      Only Yes
                    </SelectItem>
                    <SelectItem key={"false"} value="false">
                      Only No
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select> */}

        {/* <Button onClick={clearMapFilters}>Clear Filter</Button>
            </div> */}

        <div className=" w-full overflow-hidden rounded-md border border-stroke shadow-md">
          <div className="relative">
            {selectedOption?.text == "Amenities" && <FilterButton />}

            <MapComponent
              facilityList={filteredFacilityList}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
              setIsShownOnMap="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapLandingPage;
