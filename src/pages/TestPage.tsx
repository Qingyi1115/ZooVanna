import React from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function TestPage() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant={"secondary"}>Click me</Button>
      <Button variant={"outline"}>Outline</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"link"}>Link</Button>
      <Switch />
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  );
}

export default TestPage;
