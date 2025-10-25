import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewComplexity } from "@/types/view-complexity";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ViewsManager as ViewsManagerLib, SavedView } from "@/lib/views-manager";
import { Bookmark, Pin, Save, Star, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ViewsManagerProps {
  context: string;
  currentFilters: Record<string, any>;
  currentColumns: string[];
  currentComplexity: ViewComplexity;
  onLoadView: (view: SavedView) => void;
}

export function ViewsManager({
  context,
  currentFilters,
  currentColumns,
  currentComplexity,
  onLoadView,
}: ViewsManagerProps) {
  const [views, setViews] = useState<SavedView[]>(() => {
    const manager = new ViewsManagerLib(context);
    return manager.getViews();
  });
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [viewName, setViewName] = useState("");
  const { toast } = useToast();

  const manager = new ViewsManagerLib(context);

  const handleSaveView = () => {
    if (!viewName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for this view",
        variant: "destructive",
      });
      return;
    }

    const newView = manager.saveView({
      name: viewName,
      filters: currentFilters,
      columns: currentColumns,
      complexity: currentComplexity,
      isDefault: false,
      isPinned: false,
    });

    setViews(manager.getViews());
    setSaveDialogOpen(false);
    setViewName("");
    
    toast({
      title: "View saved",
      description: `"${newView.name}" has been saved successfully`,
    });
  };

  const handleSetDefault = (viewId: string) => {
    manager.updateView(viewId, { isDefault: true });
    setViews(manager.getViews());
    toast({
      title: "Default view updated",
      description: "This view is now your default",
    });
  };

  const handleTogglePin = (viewId: string, currentPinned: boolean) => {
    manager.updateView(viewId, { isPinned: !currentPinned });
    setViews(manager.getViews());
  };

  const handleDelete = (viewId: string, viewName: string) => {
    manager.deleteView(viewId);
    setViews(manager.getViews());
    toast({
      title: "View deleted",
      description: `"${viewName}" has been removed`,
    });
  };

  const pinnedViews = views.filter(v => v.isPinned);
  const otherViews = views.filter(v => !v.isPinned);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved Views
            {views.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {views.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-background">
          <DropdownMenuLabel>Saved Views</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {pinnedViews.length > 0 && (
            <>
              {pinnedViews.map((view) => (
                <DropdownMenuItem
                  key={view.id}
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => onLoadView(view)}
                >
                  <div className="flex items-center gap-2">
                    {view.icon && <span className="text-base">{view.icon}</span>}
                    <Pin className="h-3 w-3" />
                    <span>{view.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {view.complexity}
                    </Badge>
                    {view.isDefault && (
                      <Star className="h-3 w-3 fill-primary text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePin(view.id, view.isPinned);
                      }}
                    >
                      <Pin className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(view.id, view.name);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </>
          )}

          {otherViews.length > 0 ? (
            otherViews.map((view) => (
              <DropdownMenuItem
                key={view.id}
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => onLoadView(view)}
              >
                <div className="flex items-center gap-2">
                  {view.icon && <span className="text-base">{view.icon}</span>}
                  <span>{view.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {view.complexity}
                  </Badge>
                  {view.isDefault && (
                    <Star className="h-3 w-3 fill-primary text-primary" />
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetDefault(view.id);
                    }}
                  >
                    <Star className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePin(view.id, view.isPinned);
                    }}
                  >
                    <Pin className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(view.id, view.name);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </DropdownMenuItem>
            ))
          ) : pinnedViews.length === 0 ? (
            <div className="px-2 py-6 text-center text-sm text-muted-foreground">
              No saved views yet
            </div>
          ) : null}

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSaveDialogOpen(true)}>
            <Save className="h-4 w-4 mr-2" />
            Save Current View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Save View</DialogTitle>
            <DialogDescription>
              Save your current filters and column configuration for quick access
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="view-name">View Name</Label>
              <Input
                id="view-name"
                placeholder="e.g., High-Risk Transactions"
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveView()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveView}>Save View</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
