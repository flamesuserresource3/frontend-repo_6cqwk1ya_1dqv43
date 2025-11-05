import React from 'react';
import { ChevronRight } from 'lucide-react';

const PLATFORMS = [
  { id: 'zomato', name: 'Zomato', color: 'bg-rose-600' },
  { id: 'swiggy', name: 'Swiggy', color: 'bg-orange-500' },
  { id: 'uber', name: 'Uber', color: 'bg-zinc-900' },
  { id: 'urban', name: 'Urban Company', color: 'bg-indigo-600' },
];

const Onboarding = ({ selectedPlatform, onSelect, onNext }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-medium text-white mb-3">Choose your platform</h2>
      <p className="text-slate-300 text-sm mb-6">We’ll personalize your payouts and tips.</p>

      <div className="grid grid-cols-2 gap-3">
        {PLATFORMS.map((p) => {
          const active = selectedPlatform === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`flex items-center gap-3 rounded-2xl border p-4 transition-all ${
                active ? 'border-white/50 bg-white/5' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className={`h-10 w-10 rounded-xl ${p.color} flex items-center justify-center text-white font-semibold`}>{p.name[0]}</div>
              <div className="text-left">
                <div className="text-white font-medium text-sm">{p.name}</div>
                <div className="text-slate-400 text-xs">Connected via UPI/Bank</div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!selectedPlatform}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 text-white py-3"
      >
        Continue <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Onboarding;
