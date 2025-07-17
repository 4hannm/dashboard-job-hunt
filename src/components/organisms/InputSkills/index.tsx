import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { PlusIcon } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

interface InputSkillsProps {
  form: any;
  name: string;
  label: string;
}

const InputSkills: FC<InputSkillsProps> = ({ form, name, label }) => {
  const [isHide, setHide] = useState<boolean>(false);
  const [values, setValues] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSaveValue = () => {
    const value = inputRef.current?.value;
    if (!value) return;

    const newValue = [...values, value];
    setValues(newValue);
    form.setValue(name, newValue);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDeleteValue = (item: string) => {
    const updated = values.filter((value) => value !== item);
    setValues(updated);
    form.setValue(name, updated);
  };

  useEffect(() => {
    const val = form.getValues(name);
    if (val && val.length > 0) setValues(val);
  }, [form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="w-full">
          <FormLabel className="block">{label}</FormLabel>
          <FormControl>
            <div>
              <Button
                type="button"
                variant="outline"
                className="mb-2"
                onClick={() => setHide(!isHide)}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                {label}
              </Button>

              {isHide && (
                <div className="my-4 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                  <Input ref={inputRef} className="w-full sm:max-w-[246px]" />
                  <Button
                    type="button"
                    onClick={handleSaveValue}
                    className="w-full sm:w-auto"
                  >
                    Save
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                {values.map((item, index) => (
                  <Badge
                    variant="outline"
                    key={index}
                    onClick={() => handleDeleteValue(item)}
                    className="cursor-pointer"
                  >
                    {item}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Badge>
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputSkills;
