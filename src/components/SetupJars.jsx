import React from 'react';
import { ChevronRight } from 'lucide-react';

const SliderRow = ({ label, value, onChange, color }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white">{label}</span>
        <span className="text-sm text-slate-300">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={50}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full accent-emerald-500`}
      />
    </div>
  );
};

const SetupJars = ({ jars, onUpdate, onNext }) => {
  const total = jars.tax + jars.expense + jars.safety + jars.savings;
  const remaining = 100 - total;

  return (
    <div>
      <h2 className="text-xl font-medium text-white mb-3">Set your jar percentages</h2>
      <p className="text-slate-300 text-sm mb-6">Use the recommended defaults. You can change anytime.</p>

      <div className="space-y-4">
        <SliderRow label="Tax" value={jars.tax} onChange={(v) => onUpdate({ ...jars, tax: v })} />
        <SliderRow label="Expenses" value={jars.expense} onChange={(v) => onUpdate({ ...jars, expense: v })} />
        <SliderRow label="Safety" value={jars.safety} onChange={(v) => onUpdate({ ...jars, safety: v })} />
        <SliderRow label="Savings" value={jars.savings} onChange={(v) => onUpdate({ ...jars, savings: v })} />
      </div>

      <div className="mt-4 p-3 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
        <span className="text-slate-300 text-sm">Available to spend</span>
        <span className="text-white text-sm font-medium">{remaining}%</span>
      </div>

      <button
        onClick={onNext}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white py-3"
      >
        Continue <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SetupJars;
