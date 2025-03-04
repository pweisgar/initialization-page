
import React from 'react';
import { motion } from 'framer-motion';
import SessionHeader from '@/components/SessionHeader';
import SessionForm from '@/components/SessionForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-200/20 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div 
            className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-indigo-200/20 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-200/20 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
        </div>

        {/* Content */}
        <div className="container px-4 py-16 sm:px-6 lg:py-20 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <SessionHeader />
            <SessionForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
