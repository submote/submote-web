import { useState } from 'react';
import { PRICING_PLANS } from '../data';
import { Check, Info, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');

  // Calculates annual checkout prices assuming 20% discount
  const getDisplayPrice = (planPrice: string) => {
    if (planPrice === '$12') return { pr: '$12', per: 'one-time' }; // static one-time

    const value = parseInt(planPrice.replace('$', ''));
    if (billingPeriod === 'year') {
      const discounted = Math.floor(value * 0.8);
      return { pr: `$${discounted}`, per: 'month' };
    }
    return { pr: planPrice, per: 'month' };
  };

  return (
    <section id="pricing" className="relative bg-[#050505] py-20 border-b border-white/5 overflow-hidden bg-dot-pattern">
      {/* Glow lights behind cards */}
      <div className="absolute top-1/4 right-[20%] -z-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase font-mono text-cyan-400 block mb-2">
            Scalable Cloud Subscriptions
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Flexible, Credit-Backed Pricing
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
            Choose a plan optimized for your streaming velocity. Use credits when you need them, or activate unlimited scales on professional Vtuber teams.
          </p>

          {/* Billing Toggle Switch */}
          <div className="mt-8 flex items-center justify-center space-x-3">
            <span className={`text-xs font-semibold ${billingPeriod === 'month' ? 'text-white' : 'text-zinc-500'}`}>
              Pay Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(prev => prev === 'month' ? 'year' : 'month')}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-white/10 bg-neutral-900 transition-colors duration-200 ease-in-out focus:outline-none"
              id="pricing-billing-toggle"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  billingPeriod === 'year' ? 'translate-x-5 bg-cyan-400' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center space-x-1.5 ${billingPeriod === 'year' ? 'text-cyan-400 font-bold' : 'text-zinc-500'}`}>
              <span>Pay Annually</span>
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 text-[9px] font-bold tracking-wider font-mono">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, idx) => {
            const { pr, per } = getDisplayPrice(plan.price);
            
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-7 rounded-3xl border transition-all ${
                  plan.popular
                    ? 'border-cyan-400 bg-neutral-900/40 shadow-[0_0_20px_rgba(34,211,238,0.15)] scale-[1.02] md:scale-[1.04]'
                    : 'border-white/5 bg-neutral-900/20 hover:border-cyan-500/20'
                }`}
                id={`pricing-plan-card-${idx}`}
              >
                {/* Popular Neon outline banner */}
                {plan.popular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-3.5 py-1 text-[10px] font-black tracking-wider uppercase text-black shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Name */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-400 min-h-[32px] leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing segment */}
                  <div className="mt-6 border-b border-white/5 pb-5">
                    <div className="flex items-baseline text-white">
                      <span className="font-display text-4xl font-extrabold tracking-tight">
                        {pr}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 ml-1.5 lowercase">
                        / {per}
                      </span>
                    </div>
                    {/* Credits badge representing platform values */}
                    <div className="mt-3 inline-flex items-center space-x-1.5 rounded-full bg-[#050505] border border-white/5 px-2.5 py-1 text-xs text-zinc-300 font-mono font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      <span>{plan.credits}</span>
                    </div>
                  </div>

                  {/* Feature Lists */}
                  <ul className="mt-6 space-y-3.5 text-xs text-zinc-300">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2.5">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Action block */}
                <div className="mt-8">
                  <button
                    onClick={() => {
                      const el = document.getElementById('hero');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full font-bold text-xs py-3 rounded-full transition-all hover:scale-[1.01] hover:brightness-110 cursor-pointer uppercase tracking-wider ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-lg shadow-cyan-400/20'
                        : 'bg-neutral-800 text-zinc-350 border border-white/5 hover:bg-neutral-700 hover:text-white'
                    }`}
                    id={`pricing-action-${idx}`}
                  >
                    {plan.popular ? 'Unlock Creator Pro Sandbox' : 'Initiate Demo License'}
                  </button>

                  <div className="flex items-center justify-center space-x-1.5 text-[9.5px] text-zinc-500 font-mono mt-3 text-center">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span>Cancel anytime • 14 day moneyback limit</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Credit Breakdown helper */}
        <div className="mt-12 bg-neutral-900/20 border border-white/5 rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400" id="pricing-credits-disclaimer">
          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>
              <strong>What is an "Emote Credit"?</strong> Each credit generates a full, 3-size, platform-optimized export bundle of a single expression. Sandbox test runs do not burn credits.
            </span>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('faq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-2 sm:mt-0 font-bold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
          >
            Read billing FAQs
          </button>
        </div>

      </div>
    </section>
  );
}
