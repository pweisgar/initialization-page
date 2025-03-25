import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';

interface CheckboxGroupProps {
  options: Array<{ id: string; label: string }>;
  selectedOptions: string[];
  onChange: (selectedIds: string[]) => void;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedOptions,
  onChange,
  className,
}) => {
  const handleCheckboxChange = (id: string, checked: boolean) => {
    try {
      if (checked) {
        onChange([...selectedOptions, id]);
      } else {
        onChange(selectedOptions.filter(optionId => optionId !== id));
      }
    } catch (error) {
      console.error("Error updating checkbox selection:", error);
    }
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${className}`}>
      {options.map((option, index) => (
        <motion.div 
          key={option.id}
          className={`flex items-center space-x-3 rounded-lg p-4 border-2 transition-all duration-200 ${
            selectedOptions.includes(option.id) 
              ? 'border-primary bg-primary/5' 
              : 'border-border bg-white hover:border-primary/30'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Checkbox 
            id={option.id} 
            checked={selectedOptions.includes(option.id)} 
            onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
            className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <Label 
            htmlFor={option.id} 
            className="cursor-pointer text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none ml-2"
          >
            {option.label}
          </Label>
        </motion.div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
