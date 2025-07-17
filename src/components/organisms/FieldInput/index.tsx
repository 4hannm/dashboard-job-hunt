import { Separator } from "@/components/ui/separator";
import React, { FC, ReactNode } from "react";

interface FieldInputProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const FieldInput: FC<FieldInputProps> = ({ children, subtitle, title }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 mb-6">
        <div className="sm:w-[35%] w-full">
          <div className="font-semibold">{title}</div>
          <div className="text-gray-400">{subtitle}</div>
        </div>
        <div className="w-full">{children}</div>
      </div>
      <Separator />
    </>
  );
};

export default FieldInput;
