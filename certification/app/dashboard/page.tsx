"use client"

import React from 'react'
import { AnimatedBackground } from '@/app/component/animated-background'
import Mint from "@/app/component/mint"
import Query from "@/app/component/query"
import Transfer from "@/app/component/transfer"
import SearchByOwner from "@/app/component/getSBTbyowner"
import SearchByAllSBT from "@/app/component/getAllTokenSBT"
import { motion } from 'framer-motion'

export default function OnChainCertification() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 via-indigo-100/40 to-purple-100/40" />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Soul Bound Token Dashboard
            </h1>
            <p className="text-slate-600">
            Secure Your Achievement on the Blockchain
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants} className="glass-card">
              <Mint />
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-card">
              <Query />
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-card">
              <Transfer />
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-card">
              <SearchByOwner />
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-card md:col-span-2">
              <SearchByAllSBT />
            </motion.div>
          </motion.div>
          <div className="mt-8 text-center text-lg text-gray-500 flex justify-evenly">
          <p>Network : TESTNET</p>
          <p>BlockChain : KALP</p>
        </div>
        </div>
      </div>
    </div>
  )
}
