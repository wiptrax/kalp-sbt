'use client'

import { useState } from 'react'
import { ArrowRight, Boxes, Lock, Wallet } from 'lucide-react'
import { Button } from '@/app/component/button'
import { motion } from 'framer-motion'

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <main className="min-h-screen relative md:px-40">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]" />
      </div>

      <div className="container mx-auto px-4">

        <header className="py-6 flex justify-between items-center border-b-4 border-black p-4">
          <div className="flex items-center gap-2">
            <Lock className="w-8 h-8" />
            <span className="font-mono font-bold text-xl">KALP SBT</span>
          </div>
        </header>

        <section className="mt-24 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-8xl font-black mb-8 leading-tight">
              SOUL
              <br />
              <span className="inline-block relative">
                BOUND
                <motion.div
                  className="absolute -right-4 -top-4 w-8 h-8 bg-yellow-300"
                  animate={{ rotate: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <br />
              TOKENS
            </h1>
            <p className="text-2xl font-mono max-w-2xl mb-12 border-l-4 border-black pl-4">
              Non-transferable tokens that represent identity, credentials, and achievements on the blockchain.
            </p>
            <div className="flex gap-6">
            <a
                  href="/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                <Button 
                  size="lg"
                  className="rounded-none bg-black text-white hover:bg-white hover:text-black border-2 border-black text-lg h-16 px-8"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  MINT NOW
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </a>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 border-4 border-black hover:bg-black hover:text-white transition-colors group"
            >
              <feature.icon className="w-12 h-12 mb-4 group-hover:text-white" />
              <h3 className="text-2xl font-bold mb-4 font-mono">{feature.title}</h3>
              <p className="text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="mb-32">
          <div className="border-8 border-black p-12 relative">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-yellow-300 -z-10" />
            <h2 className="text-4xl font-black mb-6">GET STARTED NOW</h2>
            <p className="text-xl mb-8 font-mono">
              Join the future of digital identity and credentials.
            </p>
            <a
                  href="/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
              <Button 
                size="lg"
                className="rounded-none bg-black text-white hover:bg-white hover:text-black border-2 border-black text-lg h-16 px-8"
              >
                DASHBOARD
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </a>
          </div>
        </section>

        <footer className="border-t-4 border-black py-8">
          <div className="flex justify-between items-center">
            <span className="font-mono">© 2024 KALP SBT Platform</span>
          </div>
        </footer>
      </div>
    </main>
  )
}

const features = [
  {
    title: "NON-TRANSFERABLE",
    description: "Once minted, these tokens are bound to your wallet forever, ensuring true digital identity.",
    icon: Lock
  },
  {
    title: "BLOCKCHAIN VERIFIED",
    description: "All credentials and achievements are verified and stored on the blockchain.",
    icon: Boxes
  },
  {
    title: "IDENTITY FOCUSED",
    description: "Represent your achievements, credentials, and reputation in the digital world.",
    icon: Wallet
  },
  {
    title: "FUTURE PROOF",
    description: "Built on modern blockchain technology, ensuring long-term validity and security.",
    icon: ArrowRight
  }
]

