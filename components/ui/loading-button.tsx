import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  type?: "button" | "submit" | "reset";
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
  buttonProps?: any;
};

const LoadingButton = ({
  isLoading,
  loadingText,
  children,
  buttonProps,
}: Props) => {
  return (
    <Button type="submit" {...buttonProps}>
      {isLoading ? loadingText : children}
    </Button>
  );
};
export default LoadingButton;
