import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";

interface Column {
  id: string;
  label: string;
}

interface ColumnChooserProps {
  columns: Column[];
  selectedColumns: string[];
  onSelectionChange: (selectedColumns: string[]) => void;
}

export function ColumnChooser({
  columns,
  selectedColumns,
  onSelectionChange,
}: ColumnChooserProps) {
  const [open, setOpen] = useState(false);
  const [localSelection, setLocalSelection] = useState(selectedColumns);

  const handleToggle = (columnId: string) => {
    setLocalSelection((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

  const handleApply = () => {
    onSelectionChange(localSelection);
    setOpen(false);
  };

  const handleReset = () => {
    const allColumnIds = columns.map((c) => c.id);
    setLocalSelection(allColumnIds);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <DialogTitle>Customize Columns</DialogTitle>
          <DialogDescription>
            Select which columns you want to display in the table
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {columns.map((column) => (
              <div key={column.id} className="flex items-center space-x-2">
                <Checkbox
                  id={column.id}
                  checked={localSelection.includes(column.id)}
                  onCheckedChange={() => handleToggle(column.id)}
                />
                <Label
                  htmlFor={column.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {column.label}
                </Label>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset to Default
            </Button>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
