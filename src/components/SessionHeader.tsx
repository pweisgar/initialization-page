
import React from 'react';
import { motion } from 'framer-motion';

const SessionHeader = () => {
  return (
    <motion.div 
      className="mb-10 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        Initialize Data Collection
      </h1>
      <p className="text-muted-foreground max-w-md mx-auto">
        Configure parameters for your session
      </p>
    </motion.div>
  );
};

export default SessionHeader;
