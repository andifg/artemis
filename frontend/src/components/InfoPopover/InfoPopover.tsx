import "./infoPopover.scss";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Info } from "lucide-react";

const InfoPopover = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="info-popover">
      <Popover>
        <PopoverTrigger>
          <Info />
        </PopoverTrigger>
        <PopoverContent>{children}</PopoverContent>
      </Popover>
    </div>
  );
};

export { InfoPopover };
