import { useState } from 'react';
import { Zap, Activity, Cpu, Sparkles } from 'lucide-react';

interface NavigationProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Navigation({ onScrollToSection }: NavigationProps) {
  const [copiedStatus, setCopiedStatus] = useState(false);

  const triggerStatusCheck = () => {
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand Logo - Designed strictly after Immersive UI specification */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="flex cursor-pointer items-center space-x-2.5 hover:opacity-90 transition-opacity"
          id="nav-logo"
        >
          <div className="w-8 h-8 bg-neutral-900 rounded-lg overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)] border border-white/10">
            <img src="/favicon.png" alt="Submote Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <span className="font-display text-xl font-black tracking-tighter text-white uppercase">
              Sub<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">mote</span>
            </span>
            <div className="flex items-center space-x-1.5 leading-none">
              <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="font-mono text-[9px] text-neutral-400 font-semibold tracking-wider uppercase">
                Engine v2.4 Live
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Items - Capitalized, spaced uppercase tracked exactly like Submote Immersive Theme */}
        <div className="hidden md:flex items-center space-x-8 text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
          <button 
            onClick={() => onScrollToSection('hero')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
            id="nav-btn-converter"
          >
            Engine
          </button>
          <button 
            onClick={() => onScrollToSection('engine')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
            id="nav-btn-workflow"
          >
            Workflow
          </button>
          <button 
            onClick={() => onScrollToSection('playground')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
            id="nav-btn-live"
          >
            Playground
          </button>
          <button 
            onClick={() => onScrollToSection('pricing')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
            id="nav-btn-pricing"
          >
            Pricing
          </button>
          <button 
            onClick={() => onScrollToSection('faq')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
            id="nav-btn-faq"
          >
            Docs
          </button>
        </div>

        {/* Action Controls & Hardware Telemetry with Cyan accents */}
        <div className="flex items-center space-x-4">
          <div 
            onClick={triggerStatusCheck}
            className="hidden sm:flex cursor-pointer items-center space-x-2 rounded-full border border-white/5 bg-neutral-900/60 px-3 py-1 font-mono text-[9px] text-neutral-400 uppercase tracking-wider hover:border-cyan-500/20 hover:bg-neutral-900 transition-all"
            id="nav-status-telemetry"
          >
            <Cpu className="h-3 w-3 text-cyan-450 text-cyan-400" />
            <span>Latency:</span>
            <span className="font-semibold text-cyan-400">42ms</span>
            <span className="text-neutral-800">|</span>
            <Sparkles className="h-2.5 w-2.5 text-blue-400" />
            <span>Success:</span>
            <span className="font-bold text-white">99.8%</span>
          </div>

          <button 
            onClick={() => onScrollToSection('hero')} 
            className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            id="nav-launch-btn"
          >
            Launch Free
          </button>
        </div>
      </div>
    </nav>
  );
}
