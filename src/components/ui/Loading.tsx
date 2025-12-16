import React from 'react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-void-black text-white font-mono">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-t-signal-red border-r-transparent border-b-white border-l-transparent rounded-full animate-spin"></div>
        <p className="tracking-widest animate-pulse text-sm text-static-gray">// SYSTEM_LOADING...</p>
      </div>
    </div>
  );
};