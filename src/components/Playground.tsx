import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EMOTE_STYLES, PRESET_AVATARS, EMOTE_EXPRESSIONS } from '../data';
import { 
  Smile, Tv, Grid, Layers, RefreshCw, Sparkles, 
  Eye, Zap, CornerDownRight, Check
} from 'lucide-react';

export default function Playground() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('streamer_mia');
  const [activeExpIndex, setActiveExpIndex] = useState<number>(0);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  // Auto-cycles the active emote expression on the demonstration cards to make it feel "constantly live"!
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExpIndex((prev) => (prev + 1) % EMOTE_EXPRESSIONS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeExpression = EMOTE_EXPRESSIONS[activeExpIndex];

  // Helper mapping face shapes to look like high-tech emotes
  const getSimulatedEmoteGlyph = (styleId: string, charId: string) => {
    // Return emoji representation supporting high resolution layout fallback
    if (styleId === 'chibi') return charId === 'streamer_mia' ? '🌸 Chibi Mia' : '🕶️ Chibi Kai';
    if (styleId === 'pixel') return charId === 'streamer_mia' ? '👾 Retro Mia' : '🕹️ Retro Kai';
    if (styleId === 'cartoon') return charId === 'streamer_mia' ? '🎨 Cartoon Mia' : '🎭 Cartoon Kai';
    if (styleId === 'synthwave') return charId === 'streamer_mia' ? '🌆 Synth Mia' : '🌅 Synth Kai';
    return charId === 'streamer_mia' ? '🏍️ Matrix Mia' : '🔋 Matrix Kai';
  };

  // Pre-compiled stylized preview matrices
  const STYLIZE_DEMOS = [
    {
      styleId: 'chibi',
      name: 'Chibi Cute',
      accentColor: 'border-pink-500/40 text-pink-400 bg-pink-500/5',
      badge: 'Chibi weights',
      emoji: '🥺',
      specs: 'Kawaii anime eyes • 4:3 crop ratio • Rosy overlay'
    },
    {
      styleId: 'pixel',
      name: '16-bit Retro',
      accentColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/5',
      badge: '16-bit rules',
      emoji: '👾',
      specs: 'Cellular grid blocks • Retro Scanlines • 8-Color map'
    },
    {
      styleId: 'cartoon',
      name: 'Cel Cartoon',
      accentColor: 'border-amber-500/40 text-amber-400 bg-amber-500/5',
      badge: 'Brush stroke',
      emoji: '💥',
      specs: '64-level posterize • Outer outline stroke • Action clouds'
    },
    {
      styleId: 'synthwave',
      name: 'Synthwave Neon',
      accentColor: 'border-fuchsia-500/40 text-fuchsia-400 bg-fuchsia-500/5',
      badge: 'Neon map',
      emoji: '🌴',
      specs: 'Duotone pink/cyan • Luminous sky horizon • Sun cuts'
    },
    {
      styleId: 'cyberpunk',
      name: 'Cyber Kawaii',
      accentColor: 'border-green-500/40 text-green-400 bg-green-500/5',
      badge: 'Visor HUD',
      emoji: '🔋',
      specs: 'Toxic neon greens • Crosshair coordinates • Digital glitch'
    }
  ];

  return (
    <section id="playground" className="relative bg-[#050505] py-20 border-b border-white/5 overflow-hidden">
      {/* Glow lines */}
      <div className="absolute top-1/2 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dynamic header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase font-mono text-cyan-400 block mb-2">
              Constant Live Transformation Grid
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Live Emote Styles Playground
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              Demonstrating the same subject under different neural style weights. See how characters dynamically morph into standard streaming layouts below.
            </p>
          </div>

          {/* Quick Selection controller inside grid header */}
          <div className="flex items-center space-x-2.5 bg-neutral-900/40 border border-white/5 p-1.5 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-500 font-bold px-2 block uppercase tracking-wider">
              Target face:
            </span>
            {PRESET_AVATARS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPresetId(p.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-tight transition-all uppercase ${
                  selectedPresetId === p.id
                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
                id={`playground-char-toggle-${p.id}`}
              >
                {p.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STYLIZE_DEMOS.map((demo) => {
            const isHovered = hoveredStyle === demo.styleId;
            const chosenChar = PRESET_AVATARS.find(p => p.id === selectedPresetId) || PRESET_AVATARS[0];

            return (
              <div
                key={demo.styleId}
                onMouseEnter={() => setHoveredStyle(demo.styleId)}
                onMouseLeave={() => setHoveredStyle(null)}
                className={`relative bg-neutral-900/20 border rounded-3xl p-4 transition-all hover:scale-[1.02] flex flex-col justify-between ${
                  isHovered 
                    ? 'border-cyan-400/85 bg-neutral-900/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                    : 'border-white/5'
                }`}
                id={`playground-demo-card-${demo.styleId}`}
              >
                {/* Style badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-[0.12em] font-extrabold uppercase text-cyan-400">
                    {demo.name}
                  </span>
                  <div className="flex items-center space-x-1 font-mono text-[9px] bg-[#050505] border border-white/10 px-1.5 py-0.5 rounded text-neutral-400 font-bold uppercase">
                    {demo.emoji} <span>Live</span>
                  </div>
                </div>

                {/* Simulated Avatar Output Area */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-[#050505] border border-white/5 flex flex-col items-center justify-center p-3">
                  
                  {/* Styled Background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${demo.styleId === 'synthwave' ? 'from-[#06b6d4]/10 to-zinc-950' : 'from-neutral-900/40 to-zinc-950'} opacity-80`} />
                  
                  {/* Simulated Emote Character representation */}
                  <div className="relative text-center z-10 flex flex-col items-center">
                    
                    {/* Simulated visual head shape */}
                    <div className={`h-22 w-22 rounded-full border-2 flex items-center justify-center text-4xl shadow-lg transition-all ${
                      demo.styleId === 'chibi' ? 'border-pink-500 bg-pink-500/10' :
                      demo.styleId === 'pixel' ? 'border-cyan-400 bg-cyan-400/10 pixelated' :
                      demo.styleId === 'cartoon' ? 'border-cyan-300 bg-cyan-300/10' :
                      demo.styleId === 'synthwave' ? 'border-[#06b6d4] bg-[#06b6d4]/10' :
                      'border-emerald-400 bg-emerald-500/10'
                    }`}>
                      {/* Return corresponding emoji reflecting selected preset + style character traits */}
                      {demo.styleId === 'chibi' && (chosenChar.gender === 'female' ? '🌸' : '🎀')}
                      {demo.styleId === 'pixel' && (chosenChar.gender === 'female' ? '👾' : '🕹️')}
                      {demo.styleId === 'cartoon' && (chosenChar.gender === 'female' ? '🦊' : '🎨')}
                      {demo.styleId === 'synthwave' && (chosenChar.gender === 'female' ? '🌇' : '🌃')}
                      {demo.styleId === 'cyberpunk' && (chosenChar.gender === 'female' ? '🦾' : '🔋')}
                    </div>

                    {/* Floating Expression Modifier node indicator */}
                    <div className="absolute -bottom-1 -right-1 bg-neutral-900 border border-white/10 rounded-lg py-0.5 px-1.5 text-[10px] font-mono flex items-center space-x-1 shadow-md saturate-150">
                      <span>{activeExpression.icon}</span>
                      <span className="text-zinc-400 text-[9px] font-bold">
                        {activeExpression.stickerText}
                      </span>
                    </div>

                  </div>

                </div>

                {/* Footer description & features */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans font-medium">
                    {demo.specs}
                  </p>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-zinc-500">
                    <CornerDownRight className="h-3 w-3 text-cyan-400" />
                    <span>Resolution compliant</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom banner demonstrating automated looping */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-4.5 rounded-2xl border border-white/5 bg-neutral-900/20 text-xs text-zinc-400">
          <div className="flex items-center space-x-2.5">
            <RefreshCw className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
            <span>
              <strong>Constant Live Sandbox Pipeline:</strong> Looping active expressions [Currently illustrating{' '}
              <span className="text-white font-mono bg-[#050505] border border-white/10 px-1.5 py-0.5 rounded font-extrabold text-[11px] uppercase tracking-wide">
                {activeExpression.name}
              </span>] every 4.5 seconds.
            </span>
          </div>

          <button 
            onClick={() => {
              const el = document.getElementById('hero');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-3 sm:mt-0 font-bold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>Try with your photo</span>
            <Sparkles className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
