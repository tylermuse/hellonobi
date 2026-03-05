import React from "react";
import Button from "./Button";
import { useDemoForm } from "../context/DemoFormContext";
import { trackDemoFormOpened } from "../utils/eventTracker";

export default function DemoCTAButton({ children = "Request a Demo", className = "", ...props }) {
  const { onOpen } = useDemoForm();

  const handleClick = () => {
    trackDemoFormOpened();
    onOpen();
  };

  return (
    <Button onClick={handleClick} className={className} {...props}>
      {children}
    </Button>
  );
}
