
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
    if (checked) {
      onChange([...selectedOptions, id]);
    } else {
      onChange(selectedOptions.filter(optionId => optionId !== id));
    }
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${className}`}>
      {options.map((option, index) => (
        <motion.div 
          key={option.id}
          className="flex items-center space-x-2 bg-white rounded-md p-3 border border-border hover:border-primary/50 transition-all duration-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Checkbox 
            id={option.id} 
            checked={selectedOptions.includes(option.id)} 
            onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
          />
          <Label 
            htmlFor={option.id} 
            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </Label>
        </motion.div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
