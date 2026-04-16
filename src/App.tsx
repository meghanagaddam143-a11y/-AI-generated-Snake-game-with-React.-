/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import SnakeGame from './SnakeGame';
import MusicPlayer from './MusicPlayer';
import { Terminal, Activity, ShieldAlert } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-cyan selection:bg-magenta selection:text-black overflow-x-hidden font-sans crt-flicker">
      {/* Scanline Effect */}
      <div className="scanline" />
      
      {/* Header */}
      <header className="relative z-10 border-b-4 border-cyan bg-black p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-magenta flex items-center justify-center border-2 border-cyan shadow-[4px_4px_0px_#00FFFF]">
              <ShieldAlert className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-heading glitch tracking-tighter" data-text="SYSTEM_OVERRIDE">
              SYSTEM_OVERRIDE
            </h1>
          </div>
          
          <div className="flex items-center gap-8 text-xs font-heading uppercase tracking-widest text-magenta">
            <div className="flex items-center gap-2 animate-pulse">
              <Activity className="w-4 h-4" /> CORE_LOAD: 98%
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" /> PORT: 3000
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cryptic Logs */}
          <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 border-2 border-cyan bg-black shadow-[4px_4px_0px_#FF00FF]"
            >
              <h2 className="text-xs font-heading text-magenta mb-4 underline">LOG_STREAM</h2>
              <div className="space-y-2 text-xs font-mono leading-tight">
                <p className="text-cyan">{`> INITIALIZING_NEURAL_LINK...`}</p>
                <p className="text-cyan/60">{`> BUFFERING_AUDIO_STREAM...`}</p>
                <p className="text-magenta">{`> WARNING: DATA_CORRUPTION_DETECTED`}</p>
                <p className="text-cyan">{`> SNAKE_PROTOCOL_ACTIVE`}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 border-2 border-magenta bg-black shadow-[4px_4px_0px_#00FFFF]"
            >
              <h2 className="text-xs font-heading text-cyan mb-4 underline">INPUT_MAP</h2>
              <div className="space-y-2 text-xs font-mono uppercase">
                <div className="flex justify-between">
                  <span>NAVIGATE</span>
                  <span className="text-magenta">[ARROWS]</span>
                </div>
                <div className="flex justify-between">
                  <span>HALT</span>
                  <span className="text-magenta">[SPACE]</span>
                </div>
                <div className="flex justify-between">
                  <span>REBOOT</span>
                  <span className="text-magenta">[F5]</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Column: The Grid */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 border-2 border-dashed border-cyan/30 animate-spin-slow pointer-events-none" />
              <SnakeGame />
            </motion.div>
          </div>

          {/* Right Column: Audio Interface */}
          <div className="lg:col-span-3 flex flex-col gap-6 order-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8"
            >
              <MusicPlayer />
            </motion.div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-4 border-magenta bg-black py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-heading text-cyan/40">
            [REDACTED] // ARCHIVE_2026 // GLITCH_CORE_V1
          </div>
          <div className="flex gap-8">
            {['ENCRYPT', 'DECRYPT', 'PURGE'].map((action) => (
              <button key={action} className="text-[10px] font-heading text-magenta/60 hover:text-cyan transition-colors uppercase">
                {action}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
