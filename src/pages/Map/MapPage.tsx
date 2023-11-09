import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { FiFilter } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import HorizontalScrollOptionsList from "../../components/HorizontalScrollOptionsList";
import MapComponent from "../../components/Map/MapComponent";
import { FacilityType } from "../../enums/FacilityType";
import useApiJson from "../../hooks/useApiJson";
import Facility from "../../models/Facility";
// Import Tailwind CSS styles
import "tailwindcss/tailwind.css";

// import geolocation from "geolocation";

interface Option {
  text: string;
}

interface FacilityWithSelected extends Facility {
  selected: boolean;
}

function MapLandingPage() {
  const navigate = useNavigate();
  const apiJson = useApiJson();
  const toastShadcn = useToast().toast;

  const [facilityList, setFacilityList] = useState<FacilityWithSelected[]>([]);
  const [selectedFacility, setSelectedFacility] =
    useState<FacilityWithSelected | null>(null);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  const [filteredFacilityList, setFilteredFacilityList] = useState<
    FacilityWithSelected[]
  >([]);
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
          responseJson.facilities as FacilityWithSelected[]
        )
          .filter((facility) => {
            // console.log(facility);
            return !(
              facility.xCoordinate == null || facility.yCoordinate == null
            );
          })
          .map((facility) => ({
            ...facility,
            selected: false,
          }));
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
    { text: "All" },
    { text: "Wildlife" },
    { text: "Feeding" },
    { text: "Shows" },
    { text: "Keeper Talk" },
    { text: "Amenities" },
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
    <div className="no-scrollbar fixed bottom-[1vh] flex h-screen w-full w-screen flex-col justify-center rounded-lg border border-stroke bg-white pt-4 text-black shadow-default">
      <div className="relative px-4 pt-4">
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
        <div className="">
          {selectedOption?.text == "Amenities" && <FilterButton />}

          <MapComponent
            facilityList={filteredFacilityList}
            setFacilityList={setFilteredFacilityList}
            selectedFacility={selectedFacility}
            setSelectedFacility={setSelectedFacility}
            setIsShownOnMap={true}
          />
        </div>
      </div>

      {selectedFacility && (
        <Card
          className=" fixed bottom-[8vh] left-0 right-0 mx-3 translate-y-full transform bg-white shadow-lg transition-transform duration-1000"
          style={{
            transform: selectedFacility ? "translateY(0)" : "translateY(100%)",
          }}
        >
          <CardContent className="mt-5 font-semibold">
            {selectedFacility.facilityName}
          </CardContent>
          {/* <CardDescription>
                  Deploy your new project in one-click.
              </CardDescription> */}
        </Card>
      )}
    </div>
  );
}

export default MapLandingPage;
