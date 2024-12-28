import React from "react";
import { Spinner } from "./ui/spinner";

export default function Loader({ size = "large",screenWidth = "full", screenHeight = "4"  }) {
  return (
    <div className={`relative w-${screenWidth} h-${screenHeight} flex items-center justify-center`}>
       <Spinner size={size} />
    </div>
  );
}
