import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PIPELINE_STEPS } from '../data';
import { 
  UploadCloud, Cpu, Layers, Download, CheckCircle, 
  ArrowRight, ShieldCheck, ChevronRight, Activity
} from 'lucide-react';

export default function Workflow() {
  const [activeStepId, setActiveStepId] = useState<number>(1);

  // Map step IDs to illustrative icon graphics
  const getStepIcon = (id: number, active: boolean) => {
    const cls = `h-6 w-6 ${active ? 'text-cyan-400' : 'text-zinc-500'}`;
    switch (id) {
      case 1:
        return <UploadCloud className={cls} />;
      case 2:
        return <Cpu className={cls} />;
      case 3:
        return <Layers className={cls} />;
      case 4:
        return <Download className={cls} />;
      default:
        return <CheckCircle className={cls} />;
    }
  };

  const activeStepData = PIPELINE_STEPS.find(s => s.id === activeStepId) || PIPELINE_STEPS[0];

  return (
    <section id="engine" className="relative bg-[#050505] border-y border-white/5 py-20 bg-dot-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-widest uppercase font-mono text-cyan-400 block mb-2">
            Automated Generation Pipeline
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Inside the Submote Engine
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            From RAW visual assets to production-ready twitch packages. Explore our four fully autonomous pipeline processing layers.
          </p>
        </div>

        {/* 4-Step Interactive Process */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 4 Step Navigator List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-zinc-500 block mb-1">
              Select Processing Step:
            </span>
            {PIPELINE_STEPS.map((step) => {
              const isActive = step.id === activeStepId;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`group relative flex items-center justify-between p-4.5 rounded-xl border text-left cursor-pointer transition-all hover:scale-[1.01] ${
                    isActive
                      ? 'border-cyan-400 bg-neutral-900/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                      : 'border-white/5 bg-neutral-900/20 hover:border-cyan-500/30 hover:bg-neutral-900/40'
                  }`}
                  id={`pipeline-step-nav-${step.id}`}
                >
                  {/* Active highlight side bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/6 bottom-1/6 w-[3px] bg-gradient-to-b from-cyan-400 to-blue-600 rounded-r"></div>
                  )}

                  <div className="flex items-center space-x-4">
                    {/* step index badge */}
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-[#050505] border-cyan-400 text-cyan-400 scale-105 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                        : 'bg-neutral-950 border-white/5 text-neutral-500'
                    }`}>
                      0{step.id}
                    </div>

                    <div>
                      <h3 className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-zinc-500 block">
                        {step.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getStepIcon(step.id, isActive)}
                    <ChevronRight className={`h-4 w-4 text-neutral-600 transition-transform ${isActive ? 'translate-x-1 text-cyan-400' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Technical Deep-Dive details of Active Step */}
          <div className="lg:col-span-7 bg-neutral-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl min-h-[380px] flex flex-col justify-between relative overflow-hidden" id="pipeline-details-panel">
            {/* Absolute ambient lights inside details panel */}
            <div className="absolute -top-12 -right-12 h-32 w-32 bg-cyan-400/5 blur-2xl rounded-full"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Tech tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center space-x-1.5">
                      <Activity className="h-3 w-3 text-cyan-400 animate-pulse" />
                      <span>Pipeline Layer Unit 0{activeStepId}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-mono tracking-wider font-bold border border-emerald-500/20 uppercase">
                      Operational
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {activeStepData.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {activeStepData.detail}
                  </p>

                  {/* Micro diagrams in detail panel based on active layer */}
                  <div className="mt-6 bg-[#050505]/90 rounded-2xl p-4 border border-white/5">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block mb-3 tracking-wider">
                      ⚡ Telemetry Nodes Analysis:
                    </span>

                    {activeStepId === 1 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>Facial Alpha Segmentation:</span>
                          <span className="text-emerald-400 font-bold">100% Correct / Clean cut</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full w-[96%]" />
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-1">
                          Removes background halos in sub-milliseconds without artifact outline bleeding.
                        </p>
                      </div>
                    )}

                    {activeStepId === 2 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>Vector Landmarks Plotted:</span>
                          <span className="text-emerald-400 font-bold">68 Node coordinates mapped</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full w-[85%]" />
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-1">
                          Calculates optimal tilt coordinates and extracts high-contrast outline shapes.
                        </p>
                      </div>
                    )}

                    {activeStepId === 3 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>Style Transfer Model Weight:</span>
                          <span className="text-cyan-400 font-bold">L-Res-Nets Multi-Layers</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full w-[92%]" />
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-1">
                          Adapts color distribution based on professional comic layouts and gaming guidelines.
                        </p>
                      </div>
                    )}

                    {activeStepId === 4 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>Batch Asset Packaging Speed:</span>
                          <span className="text-cyan-400 font-bold">PNG Multi-dimensions</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-full" />
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-1">
                          Compiling direct files ready for Twitch Sub tier, Discord custom emote, and YouTube.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Simulated Pipeline Log code Block */}
                <div className="mt-6 border-t border-zinc-800/60 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-zinc-500">
                      Decentralized GPU servers. Secure 256-bit SSL encryption.
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      const nextId = activeStepId >= 4 ? 1 : activeStepId + 1;
                      setActiveStepId(nextId);
                    }}
                    className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 hover:underline cursor-pointer"
                    id="pipeline-next-trigger"
                  >
                    <span>Proceed to step {activeStepId >= 4 ? 1 : activeStepId + 1}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
