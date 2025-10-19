import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Search, CreditCard, Users, FileText, Link2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface SearchResult {
  id: string;
  type: "transaction" | "customer" | "invoice" | "link";
  title: string;
  subtitle: string;
  path: string;
  icon: typeof CreditCard;
}

export function AISearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Mock search results - replace with actual search implementation
  const searchResults: SearchResult[] = [
    {
      id: "pay_123ABC",
      type: "transaction",
      title: "Transaction pay_123ABC",
      subtitle: "$245.00 • Settled",
      path: "/transactions?id=pay_123ABC",
      icon: CreditCard
    },
    {
      id: "cust_456DEF",
      type: "customer",
      title: "Customer cust_456DEF",
      subtitle: "John Doe • john@example.com",
      path: "/customers?id=cust_456DEF",
      icon: Users
    },
    {
      id: "inv_789GHI",
      type: "invoice",
      title: "Invoice inv_789GHI",
      subtitle: "$1,250.00 • Paid",
      path: "/invoices?id=inv_789GHI",
      icon: FileText
    },
  ];

  const recentSearches = [
    { label: "failed transactions yesterday", icon: Clock },
    { label: "high-risk customers", icon: Clock },
    { label: "unsettled payments", icon: Clock },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback((result: SearchResult) => {
    setOpen(false);
    navigate(result.path);
  }, [navigate]);

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search transactions, customers...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search by ID (pay_/cust_/inv_) or natural language..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found. Try different keywords or ID prefixes.</CommandEmpty>
          
          {query === "" && recentSearches.length > 0 && (
            <>
              <CommandGroup heading="Recent Searches">
                {recentSearches.map((search, i) => {
                  const Icon = search.icon;
                  return (
                    <CommandItem key={i} onSelect={() => setQuery(search.label)}>
                      <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{search.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          
          {query && (
            <>
              <CommandGroup heading="Transactions">
                {searchResults
                  .filter(r => r.type === "transaction")
                  .map((result) => {
                    const Icon = result.icon;
                    return (
                      <CommandItem 
                        key={result.id} 
                        onSelect={() => handleSelect(result)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <div className="flex flex-col">
                          <span>{result.title}</span>
                          <span className="text-xs text-muted-foreground">{result.subtitle}</span>
                        </div>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>

              <CommandGroup heading="Customers">
                {searchResults
                  .filter(r => r.type === "customer")
                  .map((result) => {
                    const Icon = result.icon;
                    return (
                      <CommandItem 
                        key={result.id} 
                        onSelect={() => handleSelect(result)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <div className="flex flex-col">
                          <span>{result.title}</span>
                          <span className="text-xs text-muted-foreground">{result.subtitle}</span>
                        </div>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>

              <CommandGroup heading="Invoices">
                {searchResults
                  .filter(r => r.type === "invoice")
                  .map((result) => {
                    const Icon = result.icon;
                    return (
                      <CommandItem 
                        key={result.id} 
                        onSelect={() => handleSelect(result)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <div className="flex flex-col">
                          <span>{result.title}</span>
                          <span className="text-xs text-muted-foreground">{result.subtitle}</span>
                        </div>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
