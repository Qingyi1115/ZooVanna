import HorizontalCardContainer from "../../HorizontalCardContainer";
import ImageCard from "../../ImageCard";

import { useEffect, useState, useRef } from "react";

// import { Toast } from "primereact/toast";

import useApiJson from "../../../hooks/useApiJson";
import Promotion from "../../../models/Promotion";

import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";

function Banner() {
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  const localhost_5174_address = import.meta.env.VITE_LOCALHOST_5174_ADDRESS;
  const images = [
    `http://${localhost_5174_address}/src/assets/banner/pandas.jpg`,
    `http://${localhost_5174_address}/src/assets/banner/elephant.jpg`,
    `http://${localhost_5174_address}/src/assets/banner/giraffe-face.jpg`,
    `http://${localhost_5174_address}/src/assets/banner/bear_halloween.jpg`,
    `http://${localhost_5174_address}/src/assets/banner/lion.webp`,
  ];
  const delay = 2500;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    console.log(images[index]);
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1,
        ),
      delay,
    ); // Cast the setTimeout return value to number

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="merlionZooText">
        <h1 className="h-shadow text-3xl font-extrabold text-white">
          Merlion Zoo
        </h1>
      </div>
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((url, index) => (
          <div className="slide" key={index}>
            <img
              src={url}
              alt="Card Image"
              className="slide left-0 top-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
