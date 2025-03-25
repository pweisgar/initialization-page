import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CheckboxGroup from "./CheckboxGroup";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define options for select fields
const systemModes = [
  { 
    id: "geo-kba", 
    label: "Geo-KBA"
  },
  { 
    id: "gen-kba", 
    label: "Gen-KBA"
  }
];

const questionCountOptions = [
  { id: "1", label: "1 Question" },
  { id: "2", label: "2 Questions" },
  { id: "3", label: "3 Questions (Default)" },
  { id: "4", label: "4 Questions" },
  { id: "5", label: "5 Questions" }
];

const sessionTypes = [
  { id: "demo", label: "Demo (Default)" },
  { id: "experiment", label: "Experiment" },
  { id: "testing", label: "Testing" },
  { id: "production", label: "Production" }
];

// Grouped language models
const languageModels = [
  {
    group: "OpenAI",
    models: [
      { id: "gpt4o", label: "GPT-4o" },
      { id: "gpt4omini", label: "GPT-4o-mini (Default)" }
    ]
  },
  {
    group: "Anthropic",
    models: [
      { id: "claude-3-haiku-20240307", label: "Claude 3 Haiku" },
      { id: "claude-3-sonnet-20240229", label: "Claude 3 Sonnet" },
      { id: "claude-3-opus-20240229", label: "Claude 3 Opus" },
    ],
  },
  {
    group: "Google",
    models: [
      { id: "gemini-pro-1.5", label: "Gemini 1.5 Pro" },   // Released Feb 2025, 1M token context
      { id: "gemini-ultra-1.0", label: "Gemini 1.0 Ultra" } // Still available via Vertex AI for now
    ]    
  },
  {
    group: "Meta",
    models: [
      { id: "llama-2-70b-chat", label: "LLaMA 2 (70B Chat)" },
      { id: "llama-2-13b-chat", label: "LLaMA 2 (13B Chat)" }
    ]    
  },
  {
    group: "Other Providers",
    models: [
      { id: "grok-1", label: "Grok 1 (xAI)" },
      { id: "groq-mixtral-8x7b", label: "Groq (Mixtral 8x7B)" }
    ]
  }
];

const questionCategories = [
  { id: "occupation", label: "Occupation" },
  { id: "poi", label: "Points of Interest" },
  { id: "lifestyle", label: "Lifestyle" }
  // Commented out additional categories for future use
  // { id: "education", label: "Education" },
  // { id: "hobbies", label: "Hobbies" },
  // { id: "travel", label: "Travel" },
  // { id: "social", label: "Social Media" },
  // { id: "technology", label: "Technology" },
  // { id: "finance", label: "Finance" }
];

const questionModes = [
  { id: "uni-structural", label: "Uni-structural (Default)" },
  { id: "multi-structural", label: "Multi-structural" }
];

const SessionForm = () => {
  // State for form fields
  const [systemMode, setSystemMode] = useState<string>("");
  const [selectedSystemModes, setSelectedSystemModes] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<string>("3"); // Default to 3 questions
  const [sessionType, setSessionType] = useState<string>("demo"); // Default to demo
  const [languageModel, setLanguageModel] = useState<string>("gpt4omini"); // Default to GPT-4o-mini  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionMode, setQuestionMode] = useState<string>("uni-structural"); // Default to uni-structural
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMultiModeWarning, setShowMultiModeWarning] = useState(false);

  // Update system mode when checkbox selection changes
  useEffect(() => {
    if (selectedSystemModes.length === 1) {
      setSystemMode(selectedSystemModes[0]);
      setShowMultiModeWarning(false);
    } else if (selectedSystemModes.length > 1) {
      setShowMultiModeWarning(true);
      
      // Since we're showing a warning but still need a selected mode,
      // use the first selected mode for the actual system mode
      const firstMode = selectedSystemModes[0];
      
      // We don't want to reset the selectedSystemModes here
      // as that would immediately hide the warning
      // Instead, we just set the active systemMode to the first selection
      setSystemMode(firstMode);
      
      // After a brief delay, reset to just the first mode
      // This gives the user time to see the warning
      const timer = setTimeout(() => {
        setSelectedSystemModes([firstMode]);
      }, 4000);
      
      return () => clearTimeout(timer);
    } else {
      setSystemMode("");
      setShowMultiModeWarning(false);
    }
  }, [selectedSystemModes]);

  // Add debug monitoring for selected categories
  useEffect(() => {
    console.log("Selected categories updated:", selectedCategories);
  }, [selectedCategories]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!systemMode || !questionCount || !sessionType) {
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
        questionCount,
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
              <Label className="text-base font-medium mb-3 block">
                1. Select System Mode<span className="text-red-500">*</span>
              </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {systemModes.map((mode, index) => (
                  <motion.div 
                    key={mode.id}
                    className={`flex flex-col space-y-2 rounded-lg p-4 border-2 transition-all duration-200 ${
                      selectedSystemModes.includes(mode.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-white hover:border-primary/50'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex items-center">
                      <Checkbox 
                        id={`system-mode-${mode.id}`} 
                        checked={selectedSystemModes.includes(mode.id)} 
                        onCheckedChange={(checked) => {
                          if (checked) {
                            // Try to add this mode to the selection
                            const newSelection = [...selectedSystemModes, mode.id];
                            // If this would make more than one mode selected, show warning
                            if (newSelection.length > 1) {
                              setShowMultiModeWarning(true);
                              // Still set all selections to trigger the useEffect
                              setSelectedSystemModes(newSelection);
                            } else {
                              setSelectedSystemModes([mode.id]);
                              setShowMultiModeWarning(false);
                            }
                          } else {
                            // Just remove this mode from selection
                            setSelectedSystemModes(selectedSystemModes.filter(id => id !== mode.id));
                            setShowMultiModeWarning(false);
                          }
                        }}
                        className="h-5 w-5"
                      />
                      <Label 
                        htmlFor={`system-mode-${mode.id}`} 
                        className="cursor-pointer text-base font-medium ml-2"
                      >
                        {mode.label}
                      </Label>
                    </div>
                  </motion.div>
                ))}
              </div>

              {showMultiModeWarning && (
                <Alert variant="destructive" className="mt-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Multi-system mode selection is not yet supported. Only the first selected mode will be used.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Question Count - New #2 Parameter */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Card className="overflow-hidden border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Label className="text-base font-medium mb-3 block">
                2. Number of Questions<span className="text-red-500">*</span>
              </Label>
              <Select
                value={questionCount}
                onValueChange={setQuestionCount}
                required
              >
                <SelectTrigger id="question-count" className="w-full">
                  <SelectValue placeholder="Select number of questions" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {questionCountOptions.map(option => (
                    <SelectItem 
                      key={option.id} 
                      value={option.id}
                      className="focus:bg-primary/10 cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Session Type - Now #3 */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Card className="overflow-hidden border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Label className="text-base font-medium mb-3 block">
                3. Select Session Type<span className="text-red-500">*</span>
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
              {/* Large Language Model - Now #4 */}
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
                    <Label className="text-base font-medium mb-3 block">
                      4. Select Large Language Model<span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={languageModel}
                      onValueChange={setLanguageModel}
                      required={systemMode === "gen-kba"}
                    >
                      <SelectTrigger id="language-model" className="w-full">
                        <SelectValue placeholder="Select large language model" />
                      </SelectTrigger>
                      <SelectContent className="bg-white max-h-80">
                        {languageModels.map(group => (
                          <SelectGroup key={group.group}>
                            <SelectLabel>{group.group}</SelectLabel>
                            {group.models.map(model => (
                              <SelectItem 
                                key={model.id} 
                                value={model.id}
                                className="focus:bg-primary/10 cursor-pointer pl-6"
                              >
                                {model.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Question Categories - Now #5 */}
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
                        5. Select Question Categories<span className="text-red-500">*</span>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select one or more categories of questions to include
                      </p>
                    </div>
                    <CheckboxGroup
                      options={questionCategories}
                      selectedOptions={selectedCategories}
                      onChange={(newCategories) => {
                        try {
                          setSelectedCategories(newCategories);
                        } catch (error) {
                          console.error("Failed to update selected categories:", error);
                        }
                      }}
                      className="mt-3"
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Question Mode - Now #6 */}
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
                    <Label className="text-base font-medium mb-3 block">
                      6. Select Question Mode<span className="text-red-500">*</span>
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
