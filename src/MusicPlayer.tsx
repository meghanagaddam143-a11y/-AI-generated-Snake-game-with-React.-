/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2, Disc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { DUMMY_TRACKS, Track } from './types';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const onSeek = (value: number[]) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (duration) {
        audioRef.current.currentTime = (value[0] / 100) * duration;
        setProgress(value[0]);
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-black border-4 border-magenta p-6 shadow-[8px_8px_0px_#00FFFF] overflow-hidden">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={handleNext}
      />

      <div className="flex flex-col gap-6">
        {/* Track Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0 border-2 border-cyan">
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover grayscale contrast-150"
              referrerPolicy="no-referrer"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-magenta/20 animate-pulse pointer-events-none" />
            )}
          </div>

          <div className="flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentTrack.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-sm font-heading text-cyan truncate glitch"
                data-text={currentTrack.title}
              >
                {currentTrack.title}
              </motion.h3>
            </AnimatePresence>
            <p className="text-magenta text-[10px] font-heading uppercase tracking-wider truncate">
              {currentTrack.artist}
            </p>
            <div className="mt-2 flex gap-1 items-end h-6">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={isPlaying ? { height: [2, 16, 4, 20, 2] } : { height: 2 }}
                  transition={{ repeat: Infinity, duration: 0.3 + Math.random() * 0.5, ease: "steps(4)" }}
                  className="w-1 bg-cyan"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <Slider
            value={[progress]}
            max={100}
            step={1}
            onValueChange={onSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-[8px] font-heading text-cyan/40 uppercase">
            <span>{Math.floor((audioRef.current?.currentTime || 0) / 60)}:{(Math.floor((audioRef.current?.currentTime || 0) % 60)).toString().padStart(2, '0')}</span>
            <span>{Math.floor((audioRef.current?.duration || 0) / 60)}:{(Math.floor((audioRef.current?.duration || 0) % 60)).toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handlePrev}
              className="text-cyan hover:bg-cyan hover:text-black rounded-none"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              size="icon" 
              onClick={togglePlay}
              className="w-12 h-12 rounded-none bg-magenta text-black hover:bg-cyan transition-all border-b-4 border-r-4 border-white/20"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-1" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNext}
              className="text-cyan hover:bg-cyan hover:text-black rounded-none"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-24">
            <Volume2 className="w-3 h-3 text-cyan/40" />
            <Slider
              value={[volume * 100]}
              max={100}
              onValueChange={(v) => setVolume(v[0] / 100)}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Track List Mini */}
        <div className="mt-2 border-t-2 border-cyan/20 pt-4">
          <div className="flex items-center gap-2 mb-3 text-[8px] font-heading text-magenta uppercase tracking-widest">
            <Music2 className="w-3 h-3" /> QUEUE_LIST
          </div>
          <div className="flex flex-col gap-1">
            {DUMMY_TRACKS.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => {
                  setCurrentTrackIndex(idx);
                  setIsPlaying(true);
                }}
                className={`flex items-center gap-3 p-2 transition-all text-left border ${
                  currentTrackIndex === idx ? 'bg-cyan text-black border-magenta' : 'hover:bg-magenta/10 border-transparent text-cyan/60'
                }`}
              >
                <div className="w-6 h-6 flex-shrink-0 border border-current flex items-center justify-center text-[8px] font-heading">
                  {currentTrackIndex === idx ? <Disc className="w-3 h-3 animate-spin" /> : idx + 1}
                </div>
                <span className="text-[10px] font-heading truncate uppercase">
                  {track.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
