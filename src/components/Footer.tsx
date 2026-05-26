import { Zap, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 text-xs text-zinc-500 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="h-7 w-7 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <span className="font-display font-bold text-white text-base">
                Sub<span className="text-cyan-400">mote</span>
              </span>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed max-w-xs">
              Automated, real-time AI twitch and discord emote generation. Powered by high-contrast neural expression weights.
            </p>
            <div className="flex items-center space-x-2 text-[10px] text-zinc-600 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>DMCA Compliant Sandboxing</span>
            </div>
          </div>

          {/* Links Col 1: Converter */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider block mb-4">
              PRODUCT DEMO
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => onScrollToSection('hero')} 
                  className="hover:text-zinc-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Instant Sandbox Converter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('engine')} 
                  className="hover:text-zinc-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Neural Processing Pipeline
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('playground')} 
                  className="hover:text-zinc-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Style weight models
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Licensing */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider block mb-4">
              COMMERCIAL PRIVACY
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <a href="#hero" className="hover:text-zinc-300 transition-colors text-left block">
                  Commercial Rights Policy
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-zinc-300 transition-colors text-left block">
                  Twitch Partner compliance
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-zinc-300 transition-colors text-left block">
                  Terms & SLA Agreements
                </a>
              </li>
            </ul>
          </div>

          {/* Core System Telemetry */}
          <div className="space-y-3 p-4 bg-[#050505] border border-white/5 rounded-2xl">
            <h4 className="font-mono text-[10px] tracking-wider font-bold text-white uppercase block">
              SYSTEM STATUS OVERVIEW
            </h4>
            
            <div className="space-y-1.5 font-mono text-[9.5px]">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Pipeline Model:</span>
                <span className="text-cyan-400 font-bold">Submote Core v2.4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">GPU Nodes:</span>
                <span className="text-emerald-400 font-black">94 Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Active API Keys:</span>
                <span className="text-zinc-300 font-bold">4,112 active</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Base */}
        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-[10.5px]">
          <div>
            &copy; {currentYear} Submote (SaaS Technologies Inc). All platforms holdings reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Cultivated with precision by Lead Product Architects</span>
            <Heart className="h-3 w-3 text-red-500 animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
}
