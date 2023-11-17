import { useToast } from "@/components/ui/use-toast";
import * as Form from "@radix-ui/react-form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Customer from "../../models/Customer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LocationProps {
  lat: number;
  long: number;
}

function Weather(props: LocationProps) {
  const apiJson = useApiJson();

  const { lat, long } = props;

  const toastShadcn = useToast().toast;
  const navigate = useNavigate();

  const [weather, setWeather] = useState<string>("");
  const [icon, setIcon] = useState<string>("");

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const url = import.meta.env.VITE_APP_API_URL;
  const key = import.meta.env.VITE_APP_API_KEY;
  const iconUrl = import.meta.env.VITE_APP_ICON_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${url}/weather?lat=${lat}&lon=${long}&units=metric&APPID=${key}`,
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result.weather[0].main);
          setIcon(result.weather[0].icon);
          console.log(result.weather[0].icon);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {icon && (
        <div className="flex items-center px-3">
          <img className="w-10" id="wicon" src={`${iconUrl}/${icon}.png`} alt="Weather Icon" />
          <div className="text-sm pl-1">{weather}</div>
        </div>
      )}
    </div>
  );
}

export default Weather;
