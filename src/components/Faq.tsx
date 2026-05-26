import { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { HelpCircle, ChevronRight, MessageSquareCode } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-[#050505] py-20 border-b border-white/5 overflow-hidden">
      {/* Light highlights */}
      <div className="absolute bottom-10 left-10 -z-10 h-72 w-72 rounded-full bg-cyan-600/5 blur-3xl"></div>
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-widest uppercase font-mono text-cyan-400 block mb-2">
            Technological & Commercial Support
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-zinc-400 text-sm">
            Everything you need to know about custom styles, sub models, copyright holding, and deployment layers.
          </p>
        </div>

        {/* Accordion FAQ container */}
        <div className="space-y-3.5" id="faq-accordions">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-cyan-400 bg-neutral-900/40 shadow-[0_0_15px_rgba(34,211,238,0.05)]'
                    : 'border-white/5 bg-neutral-900/10 hover:bg-neutral-900/30'
                }`}
                id={`faq-item-${index}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-4.5 text-left text-sm font-semibold text-white cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className={`h-4.5 w-4.5 ${isOpen ? 'text-cyan-400' : 'text-zinc-500'} shrink-0`} />
                    <span>{item.question}</span>
                  </div>
                  <ChevronRight className={`h-4.5 w-4.5 text-zinc-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-90 text-cyan-400' : ''}`} />
                </button>

                {/* Collapsible Answer Div */}
                {isOpen && (
                  <div className="p-4.5 border-t border-white/5 bg-[#050505]/60 rounded-b-2xl text-xs text-zinc-400 leading-relaxed font-sans font-medium">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Post-Faq Prompt */}
        <div className="mt-12 bg-neutral-900/20 border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between text-zinc-400">
          <div className="flex items-center space-x-3">
            <MessageSquareCode className="h-6 w-6 text-cyan-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">Need tailored illustrated custom models?</span>
              <p className="text-[11px] text-zinc-500 mt-0.5">Connect with stream brand counselors inside our verified Discord.</p>
            </div>
          </div>
          <button
            onClick={() => {
              console.log("[Discord Join Triggered]");
            }} 
            className="mt-4 sm:mt-0 px-5 py-2 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full text-xs font-mono font-bold transition-all cursor-pointer border border-white/10"
            id="faq-discord-community"
          >
            Join Discord Community
          </button>
        </div>

      </div>
    </section>
  );
}
