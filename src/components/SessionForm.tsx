
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CheckboxGroup from "./CheckboxGroup";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// Define options for select fields
const systemModes = [
  { id: "geo-kba", label: "Geo-KBA" },
  { id: "gen-kba", label: "Gen-KBA" }
];

const sessionTypes = [
  { id: "experiment", label: "Experiment" },
  { id: "demo", label: "Demo" },
  { id: "testing", label: "Testing" },
  { id: "production", label: "Production" }
];

const languageModels = [
  { id: "openai", label: "OpenAI" },
  { id: "google-bard", label: "Google Bard" },
  { id: "claude", label: "Anthropic Claude" },
  { id: "llama3", label: "Meta LLaMA 3" },
  { id: "grok", label: "Grok by xAI" },
  { id: "groq", label: "Groq" }
];

const questionCategories = [
  { id: "occupation", label: "Occupation" },
  { id: "poi", label: "Points of Interest" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "education", label: "Education" },
  { id: "hobbies", label: "Hobbies" },
  { id: "travel", label: "Travel" },
  { id: "social", label: "Social Media" },
  { id: "technology", label: "Technology" },
  { id: "finance", label: "Finance" }
];

const questionModes = [
  { id: "uni-structural", label: "Uni-structural" },
  { id: "multi-structural", label: "Multi-structural" }
];

const SessionForm = () => {
  // State for form fields
  const [systemMode, setSystemMode] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>("");
  const [languageModel, setLanguageModel] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionMode, setQuestionMode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!systemMode || !sessionType) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (systemMode === "gen-kba" && (!languageModel || selectedCategories.length === 0 || !questionMode)) {
      toast.error("Please complete all Gen-KBA related fields");
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success path
      toast.success("Session configuration saved successfully");
      console.log("Form submitted:", {
        systemMode,
        sessionType,
        languageModel: systemMode === "gen-kba" ? languageModel : null,
        selectedCategories: systemMode === "gen-kba" ? selectedCategories : null,
        questionMode: systemMode === "gen-kba" ? questionMode : null
      });
      
      // Reset form or redirect
      // resetForm();
    } catch (error) {
      toast.error("Failed to save configuration. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* System Mode */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Card className="overflow-hidden border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Label htmlFor="system-mode" className="text-base font-medium mb-3 block">
                1. Select System Mode<span className="text-red-500">*</span>
              </Label>
              <Select
                value={systemMode}
                onValueChange={setSystemMode}
                required
              >
                <SelectTrigger id="system-mode" className="w-full">
                  <SelectValue placeholder="Select system mode" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {systemModes.map(mode => (
                    <SelectItem 
                      key={mode.id} 
                      value={mode.id}
                      className="focus:bg-primary/10 cursor-pointer"
                    >
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Session Type */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Card className="overflow-hidden border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Label htmlFor="session-type" className="text-base font-medium mb-3 block">
                2. Select Session Type<span className="text-red-500">*</span>
              </Label>
              <Select
                value={sessionType}
                onValueChange={setSessionType}
                required
              >
                <SelectTrigger id="session-type" className="w-full">
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {sessionTypes.map(type => (
                    <SelectItem 
                      key={type.id} 
                      value={type.id}
                      className="focus:bg-primary/10 cursor-pointer"
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conditional fields for Gen-KBA */}
        <AnimatePresence>
          {systemMode === "gen-kba" && (
            <>
              {/* Language Model */}
              <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Card className="overflow-hidden border-0 shadow-md bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Label htmlFor="language-model" className="text-base font-medium mb-3 block">
                      3. Select Language Model<span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={languageModel}
                      onValueChange={setLanguageModel}
                      required={systemMode === "gen-kba"}
                    >
                      <SelectTrigger id="language-model" className="w-full">
                        <SelectValue placeholder="Select language model" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {languageModels.map(model => (
                          <SelectItem 
                            key={model.id} 
                            value={model.id}
                            className="focus:bg-primary/10 cursor-pointer"
                          >
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Question Categories */}
              <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-2"
              >
                <Card className="overflow-hidden border-0 shadow-md bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Label className="text-base font-medium block">
                        4. Select Question Categories<span className="text-red-500">*</span>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select one or more categories of questions to include
                      </p>
                    </div>
                    <CheckboxGroup
                      options={questionCategories}
                      selectedOptions={selectedCategories}
                      onChange={setSelectedCategories}
                      className="mt-3"
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Question Mode */}
              <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-2"
              >
                <Card className="overflow-hidden border-0 shadow-md bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Label htmlFor="question-mode" className="text-base font-medium mb-3 block">
                      5. Select Question Mode<span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={questionMode}
                      onValueChange={setQuestionMode}
                      required={systemMode === "gen-kba"}
                    >
                      <SelectTrigger id="question-mode" className="w-full">
                        <SelectValue placeholder="Select question mode" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {questionModes.map(mode => (
                          <SelectItem 
                            key={mode.id} 
                            value={mode.id}
                            className="focus:bg-primary/10 cursor-pointer"
                          >
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div 
          className="pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            type="submit" 
            className="w-full py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Initializing Session...
              </div>
            ) : (
              <div className="flex items-center">
                Initialize Session <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default SessionForm;
