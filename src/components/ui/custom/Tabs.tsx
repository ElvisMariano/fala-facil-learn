
import React from "react";
import { Tabs as RadixTabs, TabsContent as RadixTabsContent, TabsList as RadixTabsList, TabsTrigger as RadixTabsTrigger } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = RadixTabs;

const TabsList: React.FC<React.ComponentPropsWithoutRef<typeof RadixTabsList>> = ({ 
  className, 
  ...props 
}) => (
  <RadixTabsList
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
);

const TabsTrigger: React.FC<React.ComponentPropsWithoutRef<typeof RadixTabsTrigger>> = ({ 
  className, 
  ...props 
}) => (
  <RadixTabsTrigger
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
);

const TabsContent: React.FC<React.ComponentPropsWithoutRef<typeof RadixTabsContent>> = ({ 
  className, 
  ...props 
}) => (
  <RadixTabsContent
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
