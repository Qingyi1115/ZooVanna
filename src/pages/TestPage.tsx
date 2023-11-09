
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

function TestPage() {
  return (
    <div className="h-[100vh] overflow-scroll">
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
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
      <span>Test</span>
      <br />
    </div>
  );
}

export default TestPage;
