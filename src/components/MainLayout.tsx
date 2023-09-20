import React from "react";
import BottomBar from "./BottomBar/BottomBar";

interface PropsType {
  children: React.ReactNode;
}

function MainLayout(props: PropsType) {
  return (
    <div className="">
      <div className="overflow-scroll">{props.children}</div>
      <BottomBar />
    </div>
  );
}

export default MainLayout;
