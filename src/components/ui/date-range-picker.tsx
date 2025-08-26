import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format, subDays, startOfWeek, endOfWeek } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

type CalendarDateRange = {
  from?: Date | undefined
  to?: Date | undefined
}

interface DateRangePickerProps {
  date: DateRange
  onDateChange: (date: DateRange) => void
  className?: string
}

export function DateRangePicker({ date, onDateChange, className }: DateRangePickerProps) {
  const presetRanges = {
    "last-7-days": {
      label: "Last 7 days",
      range: { from: subDays(new Date(), 6), to: new Date() }
    },
    "this-week": {
      label: "This week",
      range: { from: startOfWeek(new Date()), to: endOfWeek(new Date()) }
    },
    "last-30-days": {
      label: "Last 30 days", 
      range: { from: subDays(new Date(), 29), to: new Date() }
    },
    "last-90-days": {
      label: "Last 90 days",
      range: { from: subDays(new Date(), 89), to: new Date() }
    },
    "custom": {
      label: "Custom range",
      range: date
    }
  }

  const [selectedPreset, setSelectedPreset] = React.useState("last-7-days")

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset)
    if (preset !== "custom") {
      onDateChange(presetRanges[preset as keyof typeof presetRanges].range)
    }
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Select value={selectedPreset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(presetRanges).map(([key, preset]) => (
            <SelectItem key={key} value={key}>
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={(range: CalendarDateRange | undefined) => {
              if (range?.from) {
                const newRange: DateRange = {
                  from: range.from,
                  to: range.to || range.from
                };
                onDateChange(newRange);
                setSelectedPreset("custom");
              }
            }}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}