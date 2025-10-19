import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ 
  code, 
  language = "json", 
  className,
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={cn("relative group", className)}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 px-2 bg-background/80 backdrop-blur-sm"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      </div>
      
      <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto border border-border">
        <code className="text-xs font-mono">
          {showLineNumbers ? (
            <table className="w-full">
              <tbody>
                {lines.map((line, index) => (
                  <tr key={index}>
                    <td className="text-muted-foreground pr-4 text-right select-none">
                      {index + 1}
                    </td>
                    <td>{line || ' '}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            code
          )}
        </code>
      </pre>
      
      {language && (
        <div className="absolute top-2 left-2">
          <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
            {language}
          </span>
        </div>
      )}
    </div>
  );
}
