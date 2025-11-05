import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSpline = () => {
  return (
    <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-3xl sm:text-4xl font-semibold tracking-tight">Fin-Flex</h1>
        <p className="mt-2 text-slate-300 max-w-xl text-sm sm:text-base">Automatic jar-based money management for India’s gig workers. Get clarity, cover expenses, and grow your safety net.</p>
      </div>
    </div>
  );
};

export default HeroSpline;
