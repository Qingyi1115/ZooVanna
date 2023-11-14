// HorizontalCardContainer.tsx
import React from "react";

interface HorizontalCardContainerProps {
  children: React.ReactNode;
}

function HorizontalCardContainer({ children }: HorizontalCardContainerProps) {
  return (
    <div className="no-scrollbar overflow-x-auto">
      <div className="flex space-x-4 p-4">{children}</div>
    </div>
  );
}

export default HorizontalCardContainer;
