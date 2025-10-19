import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";

export function Footer() {
  const isSystemHealthy = true; // Replace with actual status check

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2025 APT Payments</span>
            <span className="hidden sm:inline">•</span>
            <a 
              href="https://docs.apt-payments.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hidden sm:inline"
            >
              API Docs
            </a>
            <span className="hidden sm:inline">•</span>
            <a 
              href="https://support.apt-payments.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hidden sm:inline"
            >
              Support
            </a>
            <span className="hidden md:inline">•</span>
            <a 
              href="/compliance" 
              className="hover:text-foreground transition-colors hidden md:inline"
            >
              Compliance
            </a>
            <span className="hidden md:inline">•</span>
            <a 
              href="/privacy" 
              className="hover:text-foreground transition-colors hidden md:inline"
            >
              Privacy
            </a>
            <span className="hidden lg:inline">•</span>
            <a 
              href="/changelog" 
              className="hover:text-foreground transition-colors hidden lg:inline"
            >
              Changelog
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <Badge 
              variant={isSystemHealthy ? "default" : "destructive"}
              className="flex items-center space-x-1"
            >
              {isSystemHealthy ? (
                <>
                  <CheckCircle className="h-3 w-3" />
                  <span>All Systems Operational</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3" />
                  <span>System Issues</span>
                </>
              )}
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}
