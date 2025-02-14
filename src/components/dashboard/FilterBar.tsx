import React from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DatePickerWithRange from "../ui/date-picker-with-range";
import { addDays } from "date-fns";

interface FilterBarProps {
  onStatusChange?: (status: string) => void;
  onDateChange?: (dates: { from: Date; to: Date }) => void;
  selectedStatus?: string;
  dateRange?: { from: Date; to: Date };
}

const FilterBar = ({
  onStatusChange = () => {},
  onDateChange = () => {},
  selectedStatus = "all",
  dateRange = { from: new Date(), to: addDays(new Date(), 30) },
}: FilterBarProps) => {
  return (
    <div className="w-full bg-background border-b p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="interviewing">Interviewing</SelectItem>
            <SelectItem value="offered">Offered</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <DatePickerWithRange date={dateRange} onDateChange={onDateChange} />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onStatusChange("all");
            onDateChange({ from: new Date(), to: addDays(new Date(), 30) });
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
