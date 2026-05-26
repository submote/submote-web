import { useState } from 'react';
import { OUTPUT_FORMATS } from '../data';
import { 
  Tv, MessageSquare, Layers, Download, Columns, Check,
  Sparkles, Grid, Eye
} from 'lucide-react';

export default function Comparison() {
  const [activeTab, setActiveTab] = useState<'twitch' | 'discord'>('twitch');

  return (
    <section id="comparison" className="relative bg-[#050505] py-20 border-b border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-widest uppercase font-mono text-cyan-400 block mb-2">
            Twitch & Discord Legibility
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Optimized Platform Outputs
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Never guess how an outline or expression scale reads at miniature chat sizes. Our platform outputs sub-sampled, pixel-mapped packs optimized for retina platforms.
          </p>
        </div>

        {/* Output format and platform grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Panel: Format Breakdown specs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block">
                🧬 Resolution Grid Spec Sheets
              </span>

              <div className="space-y-2.5">
                {OUTPUT_FORMATS.map((f, i) => (
                  <div 
                    key={i}
                    className="flex justify-between items-center p-3.5 rounded-2xl border border-white/5 bg-neutral-900/15 hover:bg-neutral-900/40 transition-all cursor-default"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="font-mono text-xs font-black bg-[#050505] border border-white/10 px-2 py-1 rounded text-cyan-400">
                        {f.extension}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-white block leading-tight">
                          {f.useCase}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          Auto-centered golden transparent grid
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-cyan-400 bg-cyan-950/20 border border-cyan-400/25 px-2 py-0.5 rounded">
                      {f.resolution}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality assurance badges */}
            <div className="p-4 lg:p-5 rounded-3xl bg-[#050505]/95 border border-white/5 space-y-3 shadow-lg">
              <span className="text-[10px] font-mono tracking-[0.15em] text-cyan-400 font-extrabold block uppercase">
                ⚡ EXPORT COMPLIANCE CHECKS
              </span>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Twitch-safe color limits (avoid chat-background melting keys).</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Sub-sampled outline profiles ensures 28px readability.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Alpha-level transparent backgrounds pre-rasterised in WebP.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Panel: Active Chat Simulator Viewports */}
          <div className="lg:col-span-7 bg-neutral-900/40 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between" id="chat-simulator-panel">
            
            <div className="space-y-4">
              
              {/* Simulator Tabs */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex space-x-1.5 bg-[#050505] p-1 rounded-full border border-white/5">
                  <button
                    onClick={() => setActiveTab('twitch')}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold font-display transition-all flex items-center space-x-1.5 ${
                      activeTab === 'twitch'
                        ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                        : 'text-zinc-500 hover:text-cyan-300'
                    }`}
                    id="simulator-tab-twitch"
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>Twitch Chat</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('discord')}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold font-display transition-all flex items-center space-x-1.5 ${
                      activeTab === 'discord'
                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                        : 'text-zinc-500 hover:text-blue-400'
                    }`}
                    id="simulator-tab-discord"
                  >
                    <Tv className="h-3 w-3" />
                    <span>Discord Server</span>
                  </button>
                </div>

                <div className="flex items-center space-x-1.5 font-mono text-[9.5px] text-zinc-500 uppercase">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span>High-contrast legibility simulator</span>
                </div>
              </div>

              {/* Chat View Frame screen */}
              {activeTab === 'twitch' ? (
                /* Twitch Chat Frame */
                <div className="bg-[#0e0e10] border border-[#18181b] rounded-xl p-4 font-sans text-xs space-y-3.5 h-64 overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#252529] pb-2 text-[10px] text-zinc-500 font-mono">
                    <span>🔴 TWITCH STREAM CHAT FEED</span>
                    <span>11,402 Viewers</span>
                  </div>
                  
                  {/* Message 1 */}
                  <div className="flex items-start space-x-2">
                    <span className="font-bold text-[#eb0400]">ModPro_Alex</span>
                    <span className="text-zinc-600">:</span>
                    <span className="text-zinc-300">
                      OMG that stream is so hype right now! Let&apos;s go chat!{' '}
                      <span className="inline-block align-middle h-5 w-5 rounded bg-pink-500/40 text-center text-[10px] font-bold">🌸</span>
                      <span className="inline-block align-middle h-5 w-5 rounded bg-pink-500/40 text-center text-[10px] font-bold ml-1">🌸</span>
                    </span>
                  </div>

                  {/* Message 2 */}
                  <div className="flex items-start space-x-2 bg-cyan-500/5 p-1 rounded">
                    <span className="font-bold text-cyan-400 flex items-center space-x-1">
                      <span>⚡ Streamer_Mia</span>
                      <span className="text-[8px] bg-cyan-400 text-black px-1 rounded font-black py-0.5 leading-none">VIP</span>
                    </span>
                    <span className="text-zinc-600">:</span>
                    <span className="text-zinc-200 font-medium">
                      Unlocked my new custom sub emotes! They scale down beautifully even at 28px inside the chat container!
                      <span className="inline-block align-middle h-5 w-5 bg-cyan-500/20 text-center rounded text-[10px] font-bold ml-2">⚡</span>
                    </span>
                  </div>

                  {/* Message 3 */}
                  <div className="flex items-start space-x-2">
                    <span className="font-bold text-[#06b6d4]">LurkerPrime</span>
                    <span className="text-zinc-600">:</span>
                    <span className="text-zinc-300">
                      poggers! absolute perfection. Love the bold boundaries outlines on dark mode!! {' '}
                      <span className="inline-block align-middle h-5 w-5 rounded bg-pink-500/40 text-center text-[10px] font-bold">🌸</span>
                    </span>
                  </div>

                  {/* Message 4 */}
                  <div className="flex items-start space-x-2">
                    <span className="font-bold text-[#fbbf24]">GamerGawd</span>
                    <span className="text-zinc-600">:</span>
                    <span className="text-zinc-300">
                      EZ CLAP guys ! Finally customizable. No Photoshop needed. 
                      <span className="inline-block align-middle h-5 w-5 rounded bg-purple-600/20 text-center text-[10px] font-bold ml-1.5">⚡</span>
                    </span>
                  </div>
                </div>
              ) : (
                /* Discord Server Frame */
                <div className="bg-[#313338] border border-[#232428] rounded-xl p-4 font-sans text-xs space-y-3.5 h-64 overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#2b2d31] pb-2 text-[10px] text-zinc-400 font-mono">
                    <span>💬 DISCORD CHANNELS FEED — #announcements</span>
                    <span>1,811 Online</span>
                  </div>

                  {/* DisMessage 1 */}
                  <div className="flex items-start space-x-3.5">
                    <div className="h-8 w-8 rounded-full bg-purple-500/25 flex items-center justify-center font-bold text-xs">V</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">GamerKai</span>
                        <span className="text-[9px] bg-indigo-500 text-white px-1 rounded-sm leading-none font-black py-0.5">MOD</span>
                        <span className="text-[9.5px] text-zinc-500">Today at 11:22 AM</span>
                      </div>
                      <p className="text-zinc-300 mt-1">
                        We just uploaded the new custom guild emoji pack in 128x128px! Make sure to spam our chat stream with the custom Chibi and Pixel styles.
                      </p>
                      <div className="mt-2 flex space-x-1.5">
                        <div className="flex items-center space-x-1 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 px-2 py-1 rounded-sm cursor-pointer fit-content">
                          <span className="text-[11px]">🌸</span>
                          <span className="text-[10px] text-zinc-300 font-bold">144</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 px-2 py-1 rounded-sm cursor-pointer fit-content">
                          <span className="text-[11px]">🕹️</span>
                          <span className="text-[10px] text-zinc-300 font-bold">89</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DisMessage 2 */}
                  <div className="flex items-start space-x-3.5 border-t border-[#2b2d31] pt-3">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/25 flex items-center justify-center font-bold text-xs">A</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">ASMR_Luna</span>
                        <span className="text-[9.5px] text-zinc-500">Today at 11:29 AM</span>
                      </div>
                      <p className="text-zinc-300 mt-1">
                        The facial extraction works flawlessly! Loving how the outline contrast holds up even against dark discord themes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Simulated Action row */}
            <div className="mt-6 border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 text-xs text-zinc-500">
              <span className="font-mono">
                Supports outputs packaged in WebP, PNG, standard GIFs, and SVG paths.
              </span>
              <button 
                onClick={() => {
                  const el = document.getElementById('hero');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
              >
                Launch Sandbox Converter
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
