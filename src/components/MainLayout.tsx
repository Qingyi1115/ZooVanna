import React from "react";
import BottomBar from "./BottomBar/BottomBar";
import { Toaster } from "@/components/ui/toaster";

interface PropsType {
  children: React.ReactNode;
}

function MainLayout(props: PropsType) {
  return (
    <div className="">
      <div className="h-[91vh] overflow-scroll">{props.children}</div>
      <BottomBar />
      <Toaster />
    </div>
  );
}

export default MainLayout;
