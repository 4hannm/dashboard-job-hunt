import React, { FC, useState } from "react";
import DialogAddBenefit from "./DialogAddBenefit";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { PartyPopper, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { jobFormSchema } from "@/lib/form-schema";
import z from "zod";

type BenefitItem = {
  benefit: string;
  description: string;
};

interface InputBenefitsProps {
  form: UseFormReturn<z.infer<typeof jobFormSchema>>;
}

const InputBenefits: FC<InputBenefitsProps> = ({ form }) => {
  const [benefits, setBenefits] = useState<BenefitItem[]>([]);

  const deleteBenefit = (item: BenefitItem) => {
    const deletedBenefits = benefits.filter((benefit) => item !== benefit);
    setBenefits(deletedBenefits);
    form.setValue("benefits", deletedBenefits);
  };

  const updateBenefits = (item: BenefitItem) => {
    const newValue = [...benefits, item];
    setBenefits(newValue);
    form.setValue("benefits", newValue);
  };

  return (
    <div className="block">
      <DialogAddBenefit updateBenefits={updateBenefits} />
      <div className="grid grid-cols-3 gap-5 mt-5">
        {benefits.map((item, i) => (
          <div
            className="border border-gray-200 rounded-sm p-3 relative w-[200px]"
            key={i}
          >
            <PartyPopper className="w-7 h-7 mb-5 text-primary" />

            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => deleteBenefit(item)}
            >
              <X className="w-6 h-6" />
            </div>

            <div className="text-xl font-semibold mb-3">{item.benefit}</div>
            <div className="text-gray-500 text-sm">{item.description}</div>
          </div>
        ))}
      </div>

      <FormField
        control={form.control}
        name="benefits"
        render={() => (
          <FormItem>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputBenefits;
