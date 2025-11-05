import React, { useState } from 'react';
import HeroSpline from './components/HeroSpline';
import Onboarding from './components/Onboarding';
import SetupJars from './components/SetupJars';
import Dashboard from './components/Dashboard';

export default function App() {
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState(null);
  const [jars, setJars] = useState({ tax: 8, expense: 25, safety: 5, savings: 3 });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <HeroSpline />

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
          {step === 1 && (
            <Onboarding
              selectedPlatform={platform}
              onSelect={setPlatform}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <SetupJars
              jars={jars}
              onUpdate={setJars}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <Dashboard jars={jars} />
          )}
        </div>

        <div className="text-center text-xs text-slate-400">
          Core metric: Weekly Active Savers (WAS). Monetization: 1-2% platform fee on Savings Jar investments only.
        </div>
      </div>
    </div>
  );
}
