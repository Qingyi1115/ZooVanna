import { Toaster } from "@/components/ui/toaster";
import React from "react";
import BottomBar from "./BottomBar/BottomBar";

interface PropsType {
  children: React.ReactNode;
}

function MainLayout(props: PropsType) {
  return (
    <div className="">
      <div className="h-[93.2vh] overflow-scroll">{props.children}</div>
      <BottomBar />
      <Toaster />
    </div>
  );
}

export default MainLayout;
