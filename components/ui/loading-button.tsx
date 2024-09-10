import React, { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";

type Props = {
  type?: "button" | "submit" | "reset";
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
};

const LoadingButton = ({
  isLoading,
  loadingText,
  children,
  buttonProps,
  className,
}: Props) => {
  return (
    <Button type="submit" className={className} {...buttonProps}>
      {isLoading ? (
        <div className="flex gap-0.5 items-center">
          <LoaderCircleIcon className="h-4 w-4 animate-spin" />
          <div>{loadingText}</div>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
export default LoadingButton;
