import React, { useMemo, useState } from 'react';
import { Wallet, Shield, PiggyBank, CreditCard, Bell, ArrowRight } from 'lucide-react';

const JarCard = ({ label, amount, color }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="text-slate-300 text-xs">{label}</div>
    <div className="text-white text-lg font-semibold mt-1">₹{amount.toLocaleString()}</div>
  </div>
);

const PayoutModal = ({ visible, onClose, split, lastPayout }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-5">
        <div className="flex items-center gap-2 text-white">
          <Bell className="h-5 w-5 text-emerald-400" />
          <h3 className="font-medium">Payout received</h3>
        </div>
        <p className="text-slate-300 text-sm mt-1">You just got ₹{lastPayout.toLocaleString()}! We split it automatically:</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <JarCard label={`Tax • ₹${split.tax.toLocaleString()}`} amount={split.tax} />
          <JarCard label={`Expenses • ₹${split.expense.toLocaleString()}`} amount={split.expense} />
          <JarCard label={`Safety • ₹${split.safety.toLocaleString()}`} amount={split.safety} />
          <JarCard label={`Savings • ₹${split.savings.toLocaleString()}`} amount={split.savings} />
        </div>
        <button onClick={onClose} className="mt-5 w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white py-3">OK</button>
      </div>
    </div>
  );
};

const WithdrawPanel = ({ balances, onWithdraw }) => {
  const [target, setTarget] = useState('expense');
  const [amount, setAmount] = useState('');

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium">Withdraw</h4>
        <span className="text-slate-400 text-xs">Instant to bank</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => setTarget('expense')}
          className={`rounded-xl p-3 border ${target==='expense' ? 'border-white/50 bg-white/5' : 'border-white/10'}`}
        >
          <div className="text-slate-300 text-xs">From</div>
          <div className="text-white font-medium text-sm">Expense Jar</div>
          <div className="text-slate-400 text-xs mt-1">₹{balances.expense.toLocaleString()}</div>
        </button>
        <button
          onClick={() => setTarget('safety')}
          className={`rounded-xl p-3 border ${target==='safety' ? 'border-white/50 bg-white/5' : 'border-white/10'}`}
        >
          <div className="text-slate-300 text-xs">From</div>
          <div className="text-white font-medium text-sm">Safety Jar</div>
          <div className="text-slate-400 text-xs mt-1">₹{balances.safety.toLocaleString()}</div>
        </button>
      </div>
      <div className="mt-3">
        <label className="text-slate-300 text-xs">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="₹0"
          className="mt-1 w-full rounded-xl bg-slate-900 border border-white/10 text-white p-3 outline-none"
        />
      </div>
      <button
        onClick={() => {
          const v = Number(amount || 0);
          if (v > 0) onWithdraw(target, v);
          setAmount('');
        }}
        className="mt-3 w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white py-3"
      >
        Withdraw
      </button>
    </div>
  );
};

const Dashboard = ({ jars, balances, onSimulatePayout, onWithdraw }) => {
  const totalBalance = balances.available + balances.tax + balances.expense + balances.safety + balances.savings;
  return (
    <div>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-emerald-400/10 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-slate-300 text-sm">Available to spend</div>
            <div className="text-3xl text-white font-semibold mt-1">₹{balances.available.toLocaleString()}</div>
          </div>
          <button onClick={() => onSimulatePayout(800)} className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2">
            <Bell className="h-4 w-4" /> Simulate payout
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-slate-300 text-xs"><CreditCard className="h-4 w-4"/>Tax</div>
            <div className="text-white text-lg font-semibold mt-1">₹{balances.tax.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-slate-300 text-xs"><Wallet className="h-4 w-4"/>Expenses</div>
            <div className="text-white text-lg font-semibold mt-1">₹{balances.expense.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-slate-300 text-xs"><Shield className="h-4 w-4"/>Safety</div>
            <div className="text-white text-lg font-semibold mt-1">₹{balances.safety.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-slate-300 text-xs"><PiggyBank className="h-4 w-4"/>Savings</div>
            <div className="text-white text-lg font-semibold mt-1">₹{balances.savings.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <WithdrawPanel balances={balances} onWithdraw={onWithdraw} />
      </div>
    </div>
  );
};

export default function DashboardWrapper(props) {
  const { jars } = props;
  const [balances, setBalances] = useState({ tax: 0, expense: 0, safety: 0, savings: 0, available: 0 });
  const [modal, setModal] = useState({ open: false, split: { tax:0, expense:0, safety:0, savings:0 }, last: 0 });

  const splitAmount = (amount) => {
    const pct = jars;
    const tax = Math.floor((pct.tax / 100) * amount);
    const expense = Math.floor((pct.expense / 100) * amount);
    const safety = Math.floor((pct.safety / 100) * amount);
    const savings = Math.floor((pct.savings / 100) * amount);
    const used = tax + expense + safety + savings;
    const available = amount - used;
    return { tax, expense, safety, savings, available };
  };

  const onSimulatePayout = (amount) => {
    const split = splitAmount(amount);
    setBalances((b) => ({
      tax: b.tax + split.tax,
      expense: b.expense + split.expense,
      safety: b.safety + split.safety,
      savings: b.savings + split.savings,
      available: b.available + split.available,
    }));
    setModal({ open: true, split, last: amount });
  };

  const onWithdraw = (from, amount) => {
    setBalances((b) => {
      const source = b[from];
      const amt = Math.min(source, amount);
      return { ...b, [from]: source - amt };
    });
  };

  return (
    <div>
      <Dashboard jars={jars} balances={balances} onSimulatePayout={onSimulatePayout} onWithdraw={onWithdraw} />
      <PayoutModal visible={modal.open} onClose={() => setModal((m) => ({ ...m, open: false }))} split={modal.split} lastPayout={modal.last} />
    </div>
  );
}
