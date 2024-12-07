import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSingleEventHandler } from "react-day-picker";

interface Props {
  date: Date;
  onChange: SelectSingleEventHandler;
  minDate: Date | undefined;
  maxDate?: Date;
}

export function DatePicker(props: Props) {
  //const [date, setDate] = React.useState<Date>(); // variables estado  "useState" actualizan.

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !props.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.date ? (
            format(props.date, "PPP", { locale: es })
          ) : (
            <span>Selecciona Fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props.date}
          onSelect={props.onChange}
          initialFocus
          locale={es}
          fromDate={props.minDate}
          toDate={props.maxDate}
        />
      </PopoverContent>
    </Popover>
  );
}