import * as React from "react";

import { cn } from "@/lib/utils";

const CardModified = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg",
      className,
    )}
    {...props}
  />
));
CardModified.displayName = "Card";

const CardHeaderModified = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-3", className)}
    {...props}
  />
));
CardHeaderModified.displayName = "CardHeader";

const CardTitleModified = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-l font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitleModified.displayName = "CardTitle";

const CardDescriptionModified = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescriptionModified.displayName = "CardDescription";

const CardContentModified = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
CardContentModified.displayName = "CardContent";

const CardFooterModified = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooterModified.displayName = "CardFooter";

export {
  CardModified,
  CardHeaderModified,
  CardFooterModified,
  CardTitleModified,
  CardDescriptionModified,
  CardContentModified,
};
