import React from 'react';
import { Aperture } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
        <Aperture className="w-8 h-8 stroke-[2.2] animate-spin text-orange-500" />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-bold text-zinc-900 dark:text-white">
          Studio<span className="text-orange-500">Space</span>
        </p>
        <p className="text-xs text-zinc-400">Loading creative workspace data...</p>
      </div>
    </div>
  );
}
