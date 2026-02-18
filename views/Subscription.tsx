
import React, { useState } from 'react';
import { useStore } from '../store';
import { simulatePayment } from '../mockService';
import { Check, Zap, Sparkles, Loader2, CreditCard } from 'lucide-react';

const Subscription = () => {
  const { isPro, setProStatus } = useStore();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    await simulatePayment(19.99);
    setProStatus(true);
    setLoading(false);
  };

  const tiers = [
    {
      name: "Free",
      price: "$0",
      features: ["Access to 5 free courses", "Community forum access", "Standard certificates", "Ads supported"],
      button: "Current Plan",
      current: !isPro,
      disabled: true
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      features: ["Unlimited course access", "AI Doubt Solver (GPT-4)", "Live class participation", "Priority support", "Pro badge"],
      button: isPro ? "Current Plan" : "Upgrade to Pro",
      current: isPro,
      premium: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Custom learning paths", "Team analytics", "dedicated account manager", "White-label support"],
      button: "Contact Sales",
      current: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold dark:text-white">Choose Your Learning Path</h1>
        <p className="text-slate-500 max-w-xl mx-auto text-lg">Unlock advanced features, AI tutoring, and exclusive content with a Pro subscription.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`relative p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col ${
              tier.premium 
                ? 'bg-white dark:bg-slate-900 border-indigo-600 shadow-2xl shadow-indigo-200 dark:shadow-none scale-105 z-10' 
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'
            }`}
          >
            {tier.premium && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center">
                <Sparkles size={12} className="mr-1" /> Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold dark:text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-black dark:text-white">{tier.price}</span>
                {tier.period && <span className="text-slate-500 ml-1 text-sm">{tier.period}</span>}
              </div>
            </div>

            <ul className="space-y-4 flex-1 mb-10">
              {tier.features.map((feat) => (
                <li key={feat} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                  <div className="mt-0.5 mr-3 bg-indigo-50 dark:bg-indigo-900/20 p-1 rounded-full">
                    <Check size={12} className="text-indigo-600" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <button
              onClick={tier.premium ? handleSubscribe : undefined}
              disabled={tier.disabled || (tier.current && tier.premium) || loading}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center ${
                tier.current 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default' 
                  : tier.premium 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' 
                    : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90'
              }`}
            >
              {loading && tier.premium ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
              {tier.button}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
            <CreditCard size={32} className="text-indigo-600" />
          </div>
          <div>
            <h4 className="font-bold dark:text-white text-lg">Billing History</h4>
            <p className="text-slate-500 text-sm">Download your invoices and manage payment methods.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors">
          View Transactions
        </button>
      </div>
    </div>
  );
};

export default Subscription;
