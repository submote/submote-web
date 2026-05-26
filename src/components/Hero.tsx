import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UploadCloud, Sparkles, Sliders, CheckCircle, RefreshCw, 
  HelpCircle, Download, Zap, Tv, Grid, Layers, Smile, Trash2
} from 'lucide-react';
import { EMOTE_STYLES, EMOTE_EXPRESSIONS, PRESET_AVATARS } from '../data';
import { drawEmoteToCanvas } from '../utils/canvasRenderer';
import { EmoteExpression, EmoteStyle } from '../types';

export default function Hero() {
  const [selectedStyle, setSelectedStyle] = useState<EmoteStyle>(EMOTE_STYLES[0]);
  const [selectedExpression, setSelectedExpression] = useState<EmoteExpression>(EMOTE_EXPRESSIONS[0]);
  const [selectedPreset, setSelectedPreset] = useState<string>('streamer_mia');
  const [zoom, setZoom] = useState<number>(1.1);
  const [outline, setOutline] = useState<number>(5); // 0, 2, 5, 10
  const [bgType, setBgType] = useState<string>('transparent'); // 'transparent', 'neon', 'obs'
  
  // Image Upload reference states
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [userImageElement, setUserImageElement] = useState<HTMLImageElement | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulation loader and status states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [generationPercent, setGenerationPercent] = useState<number>(0);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState<boolean>(true);

  // Canvas DOM references
  const canvasRef112 = useRef<HTMLCanvasElement>(null);
  const canvasRef56 = useRef<HTMLCanvasElement>(null);
  const canvasRef28 = useRef<HTMLCanvasElement>(null);
  const canvasRefPreview = useRef<HTMLCanvasElement>(null);

  // Trigger redrawing if options change
  const triggerRedraw = () => {
    const drawParams = {
      style: selectedStyle,
      expression: selectedExpression,
      presetId: selectedPreset,
      userImage: uploadedBase64 ? userImageElement : null,
      outlineWidth: outline,
      zoom: zoom,
      backgroundColor: bgType,
    };

    if (canvasRefPreview.current) {
      drawEmoteToCanvas({ ...drawParams, canvas: canvasRefPreview.current, resolution: 256 });
    }
    if (canvasRef112.current) {
      drawEmoteToCanvas({ ...drawParams, canvas: canvasRef112.current, resolution: 112 });
    }
    if (canvasRef56.current) {
      drawEmoteToCanvas({ ...drawParams, canvas: canvasRef56.current, resolution: 56 });
    }
    if (canvasRef28.current) {
      drawEmoteToCanvas({ ...drawParams, canvas: canvasRef28.current, resolution: 28 });
    }
  };

  // Keep drawing up to date when variables or images change
  useEffect(() => {
    triggerRedraw();
  }, [
    selectedStyle, 
    selectedExpression, 
    selectedPreset, 
    zoom, 
    outline, 
    bgType, 
    userImageElement, 
    uploadedBase64
  ]);

  // Handle preset avatar click
  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setUploadedBase64(null);
    setUserImageElement(null);
  };

  // Convert uploaded file to base64
  const processUploadedFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setUploadedBase64(base64);

      // Create dummy image element to hold for canvas drawing
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setUserImageElement(img);
        setSelectedPreset(''); // override presets
      };
      img.src = base64;
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const fileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  // Trigger the AI synthesis simulator flow
  const handleGenerateClick = () => {
    setIsGenerating(true);
    setGenerationPercent(10);
    setGenerationStep('Isolating facial bounding box...');

    // Print clear console logs detailing how full-stack API integration is structured
    console.log('[Submote Engine POST Request Routing] /api/generate-emote');
    console.log('[Submote Engine Input Payload Summary]:', {
      source: uploadedBase64 ? 'User Custom Upload (64-base String)' : `Synthetic Vector Preset: ${selectedPreset}`,
      neuralWeightsRule: selectedStyle.id,
      expressionModifier: selectedExpression.id,
      outlineStrengthPx: outline,
      environmentContrastMode: bgType,
      targetSubResolutions: ['112x112', '56x56', '28x28'],
      fileEnvelopeEncodings: ['image/png', 'image/webp']
    });

    const timers = [
      { t: 600, p: 35, s: 'Mapping coordinates & extracting 68 facial landmarks...' },
      { t: 1300, p: 68, s: 'Injecting styling weights & aligning pixels...' },
      { t: 1800, p: 92, s: 'Synthesizing edge transparency and outline contours...' },
      { t: 2200, p: 100, s: 'Auto-formatting export sizes...' }
    ];

    timers.forEach((step) => {
      setTimeout(() => {
        setGenerationPercent(step.p);
        setGenerationStep(step.s);
        if (step.p === 100) {
          setTimeout(() => {
            setIsGenerating(false);
            setHasGeneratedOnce(true);
            triggerRedraw();
          }, 300);
        }
      }, step.t);
    });
  };

  // Reset converter state
  const resetUpload = () => {
    setUploadedBase64(null);
    setUserImageElement(null);
    setSelectedPreset('streamer_mia');
  };

  // Trigger instant individual size downloads
  const handleDownloadResolution = (resSize: number, label: string) => {
    let targetCanvas: HTMLCanvasElement | null = null;
    if (resSize === 112) targetCanvas = canvasRef112.current;
    if (resSize === 56) targetCanvas = canvasRef56.current;
    if (resSize === 28) targetCanvas = canvasRef28.current;
    if (resSize === 256) targetCanvas = canvasRefPreview.current;

    if (!targetCanvas) return;

    const dataUrl = targetCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `submote_${selectedStyle.id}_${selectedExpression.id}_${resSize}px.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-[#050505] py-16 sm:py-24 bg-grid-pattern lg:py-28">
      {/* Absolute Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow blur-3xl opacity-60"></div>
      <div className="absolute top-10 right-10 -z-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Interactive Copywritting */}
          <div className="flex flex-col justify-center lg:col-span-5 space-y-8">
            
            {/* SaaS High-converting badge */}
            <div className="inline-flex w-fit items-center space-x-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs text-cyan-300">
              <Sparkles className="h-3 w-3 text-cyan-450 text-cyan-400" />
              <span className="font-semibold tracking-wide">Next-Gen Real-time Diffusion Weights</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl font-black tracking-tighter text-white sm:text-5xl lg:text-5xl xl:text-5xl leading-tight uppercase">
              From Selfie to <br />
              <span className="text-cyan-400 italic">
                Stream-Ready
              </span> <br />
              Emote in Seconds.
            </h1>

            {/* Paragraph */}
            <p className="text-base text-zinc-400 max-w-xl leading-relaxed">
              Skip complex drawing tables and $50 illustrator contracts. Submote automates background extraction, character mapping, style transfers, and platform formatting instantly. 
            </p>

            {/* Visual Value Props */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-white">Twitch Optimized</span>
                  <p className="text-xs text-zinc-500">Auto-contour outlines included</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-white">Full Transparency</span>
                  <p className="text-xs text-zinc-500">Instant background removal</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-white">Multiplatform Bundles</span>
                  <p className="text-xs text-zinc-500">PNG / WebP retinas ready</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-white">Custom Exclusives</span>
                  <p className="text-xs text-zinc-500">Over 30 styled expression permutations</p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center space-x-6 border-t border-zinc-800/60 pt-6">
              <div>
                <span className="font-display text-2xl font-bold text-white">1.8M+</span>
                <p className="text-xs text-zinc-500 font-medium">Emotes Synthetic Rendered</p>
              </div>
              <div className="h-8 w-px bg-zinc-800"></div>
              <div>
                <span className="font-display text-2xl font-bold text-white">45k+</span>
                <p className="text-xs text-zinc-500 font-medium">Streamers Empowered</p>
              </div>
              <div className="h-8 w-px bg-zinc-800"></div>
              <div>
                <span className="font-display text-2xl font-bold text-cyan-400">0.4s</span>
                <p className="text-xs text-zinc-500 font-medium">Average Processing Speed</p>
              </div>
            </div>

            {/* Small Action Prompt */}
            <div className="text-xs text-zinc-500 font-mono">
              ★ Active subscription grants commercial usage locks & vector storage access.
            </div>
          </div>

          {/* Right Column: High-Tech Emote Converter Workspace */}
          <div className="lg:col-span-7 bg-neutral-900/40 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md relative overflow-hidden" id="emote-converter-workspace">
            {/* Workspace Header decorative indicators */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono text-xs font-semibold text-zinc-300 tracking-wider uppercase">
                  Submote Synthetic Sandbox
                </span>
              </div>
              <div className="flex space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-neutral-700"></span>
                <span className="h-2 w-2 rounded-full bg-neutral-700"></span>
                <span className="h-2 w-2 rounded-full bg-neutral-700"></span>
              </div>
            </div>

            {/* Split Grid inside Sandbox */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Left Sandbox Column: The Inputs / Customization dashboard */}
              <div className="space-y-6">
                
                {/* 1. INPUT SOURCE SELECTION */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">
                      1. Target Profile
                    </label>
                    {uploadedBase64 && (
                      <button 
                        onClick={resetUpload}
                        className="flex items-center space-x-1 text-red-400 hover:text-red-300 text-xs font-semibold transition"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Reset Upload</span>
                      </button>
                    )}
                  </div>

                  {uploadedBase64 ? (
                    <div className="relative border border-dashed border-cyan-400 bg-cyan-400/10 rounded-xl p-4 flex items-center justify-center space-x-3">
                      <div className="relative h-12 w-12 rounded-lg border border-cyan-400/30 overflow-hidden bg-[#050505]">
                        <img 
                          src={uploadedBase64} 
                          alt="custom preview" 
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-white block truncate">Custom selfie.png</span>
                        <span className="text-[10px] text-zinc-400 block font-mono">Ready for style transfer weighting</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Drag & Drop Area */}
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                          dragOver 
                            ? 'border-cyan-450 border-cyan-400 bg-cyan-400/10' 
                            : 'border-neutral-700 hover:border-cyan-400/50 bg-neutral-900/80'
                        }`}
                        id="drop-zone"
                      >
                        <UploadCloud className="h-6 w-6 mx-auto text-neutral-500 mb-1" />
                        <span className="text-xs font-semibold text-neutral-500 block">DROP PHOTO HERE</span>
                        <span className="text-[10px] text-neutral-600">or click to manually browse PNG/JPG</span>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={fileSelected} 
                          accept="image/*" 
                          className="hidden" 
                        />
                      </div>

                      {/* Presets Choice Grid instead of loading URL */}
                      <div className="space-y-2">
                        <span className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase block">
                          Or pick a preset Streamer Avatar:
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                          {PRESET_AVATARS.map((avatar) => (
                            <button
                              key={avatar.id}
                              onClick={() => handleSelectPreset(avatar.id)}
                              className={`p-1.5 rounded-lg border text-center transition-all ${
                                selectedPreset === avatar.id && !uploadedBase64
                                  ? 'border-cyan-400 bg-cyan-450 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                  : 'border-white/5 bg-neutral-900/40 hover:bg-neutral-900/80'
                              }`}
                              title={`${avatar.name} (${avatar.role})`}
                              id={`preset-${avatar.id}`}
                            >
                              <div className="h-10 w-10 mx-auto rounded bg-zinc-950 flex flex-col justify-center items-center text-xs font-mono font-bold uppercase relative">
                                {avatar.gender === 'female' ? '🌸' : avatar.gender === 'male' ? '🧢' : '⚡'}
                                <span className="absolute bottom-0 text-[8px] text-zinc-400 font-sans tracking-tight leading-none scale-90 truncate mt-0.5">
                                  {avatar.name.split(' ')[1]}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. STYLE SELECTOR */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono block mb-2">
                    2. AI Aesthetic Weights
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {EMOTE_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style)}
                        className={`text-left p-2.5 rounded-xl border transition-all hover:scale-[1.01] ${
                          selectedStyle.id === style.id
                            ? 'border-cyan-400 bg-cyan-400/10'
                            : 'border-white/5 bg-neutral-900/40 hover:bg-neutral-900/80'
                        }`}
                        id={`style-select-${style.id}`}
                      >
                        <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-center w-full bg-transparent">
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {style.name}
                            </span>
                            <span className="text-[9px] text-zinc-500 hidden sm:block leading-tight line-clamp-1">
                              {style.badge} weights
                            </span>
                          </div>
                          {style.badge && (
                            <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-cyan-450 text-cyan-400 text-[8px] font-bold tracking-wider uppercase">
                              {style.badge}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. EXPRESSION EMOTE STYLES */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono block mb-2">
                    3. Target Expression Sticker
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {EMOTE_EXPRESSIONS.map((expr) => (
                      <button
                        key={expr.id}
                        onClick={() => setSelectedExpression(expr)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedExpression.id === expr.id
                            ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                            : 'border-white/5 bg-neutral-900/40 hover:bg-neutral-900/80 text-zinc-400 hover:text-zinc-200'
                        }`}
                        id={`expr-select-${expr.id}`}
                      >
                        <span className="text-xl block mb-1">{expr.icon}</span>
                        <span className="text-[10px] font-bold block leading-none saturate-150">
                          {expr.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. FINE TUNING SLIDERS */}
                <div className="border-t border-white/5 pt-4 space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center space-x-1.5">
                      <Sliders className="h-3 w-3 text-cyan-400" />
                      <span>Head Zoom Factor:</span>
                    </span>
                    <span className="font-bold text-white text-[11px] bg-neutral-800 px-1.5 py-0.5 rounded">
                      {zoom.toFixed(1)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.8"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    id="zoom-slider"
                  />

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mt-2">
                    <span>Visibility Twitch Outline:</span>
                    <div className="flex space-x-1.5">
                      {[0, 2, 5, 10].map((v) => (
                        <button
                           key={v}
                           onClick={() => setOutline(v)}
                           className={`px-2 py-0.5 rounded text-[9px] font-black uppercase transition-colors ${
                             outline === v 
                               ? 'bg-cyan-400 text-black font-extrabold shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                               : 'bg-neutral-800 text-zinc-400 hover:bg-neutral-700'
                           }`}
                           id={`outline-select-${v}`}
                        >
                           {v === 0 ? 'None' : v === 2 ? 'Thin' : v === 5 ? 'Thick' : 'Neon'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mt-2">
                    <span>Canvas Backdrop:</span>
                    <div className="flex space-x-1.5">
                      {[
                        { id: 'transparent', label: 'Alpha Grid' },
                        { id: 'neon', label: 'Neon Glow' },
                        { id: 'obs', label: 'OBS Green' }
                      ].map((bg) => (
                        <button
                          key={bg.id}
                          onClick={() => setBgType(bg.id)}
                          className={`px-2 py-0.5 rounded text-[9px] font-bold transition-colors ${
                            bgType === bg.id 
                              ? 'bg-cyan-500 text-zinc-950 font-extrabold' 
                              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                          }`}
                          id={`bgtype-select-${bg.id}`}
                        >
                          {bg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Sandbox Column: Dynamic Instant previews & loaders */}
              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-6 bg-neutral-900/10 rounded-r-xl">
                
                {/* PREVIEW CONTAINER SECTION */}
                <div className="flex-1 flex flex-col items-center justify-center p-3 relative min-h-[280px]">
                  
                  {/* Simulated Processing Loader */}
                  <AnimatePresence>
                    {isGenerating && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-[#050505]/95 flex flex-col items-center justify-center p-6 text-center rounded-xl"
                        id="simulated-loader"
                      >
                        <RefreshCw className="h-10 w-10 text-cyan-400 animate-spin mb-4" />
                        <span className="font-display font-black text-white text-base">
                          SUBMOTE ENGINE CORE 2.4
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 block mt-1.5 animate-pulse">
                          {generationStep}
                        </span>

                        {/* High tech progress segment */}
                        <div className="w-full max-w-xs bg-neutral-800 h-2 rounded-full overflow-hidden mt-6 relative">
                          <motion.div 
                            className="bg-gradient-to-r from-cyan-400 to-blue-600 h-full rounded-full" 
                            style={{ width: `${generationPercent}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-zinc-500 mt-2">
                          {generationPercent}% Complete
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Top Preview Card */}
                  <div className="text-center w-full">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase font-mono text-cyan-400 block mb-3">
                      🔬 REAL-TIME ACTIVE SANDBOX PREVIEW
                    </span>

                    {/* Display Canvas Frame */}
                    <div className="relative inline-block p-1 rounded-2xl bg-[#050505] border border-white/10 shadow-inner">
                      {/* Grid background simulation with transparency */}
                      <div className={`relative rounded-xl overflow-hidden ${bgType === 'transparent' ? 'bg-zinc-800 checkerboard-bg' : ''}`} style={{ width: 192, height: 192 }}>
                        {bgType === 'transparent' && (
                          <div className="absolute inset-0 bg-[#050505] opacity-60 bg-grid-pattern"></div>
                        )}
                        <canvas 
                          ref={canvasRefPreview}
                          style={{ width: 192, height: 192 }}
                          className="relative block rounded-lg overflow-hidden"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="text-base font-bold text-white block">
                        {selectedStyle.name} Emote Style
                      </span>
                      <span className="text-xs text-zinc-400">
                        Synthesizing with {selectedExpression.name} Expression model
                      </span>
                    </div>
                  </div>

                </div>

                {/* CORE MULTI-FORMAT OUTPUT CONTAINER */}
                <div className="border-t border-white/5 p-4 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase font-mono text-cyan-400 block mb-2.5">
                      📁 Auto-Formatted Twitch Output Pack
                    </span>

                    {/* 3 Channels Grid */}
                    <div className="grid grid-cols-3 gap-2 text-center bg-[#050505]/95 rounded-xl p-3 border border-white/5">
                      
                      {/* Large Emote */}
                      <div className="flex flex-col items-center">
                        <div className={`h-[56px] w-[56px] flex items-center justify-center rounded border border-white/5 ${bgType === 'transparent' ? 'bg-[#050505] bg-grid-pattern' : ''}`}>
                          <canvas ref={canvasRef112} className="h-[48px] w-[48px]" style={{ imageRendering: 'pixelated' }} />
                        </div>
                        <span className="text-[10px] text-zinc-300 font-mono font-bold mt-1.5 block">112 x 112 px</span>
                        <span className="text-[9px] text-zinc-500 tracking-tight">Twitch Retina</span>
                      </div>

                      {/* Medium Emote */}
                      <div className="flex flex-col items-center">
                        <div className={`h-[56px] w-[56px] flex items-center justify-center rounded border border-white/5 ${bgType === 'transparent' ? 'bg-[#050505] bg-grid-pattern' : ''}`}>
                          <canvas ref={canvasRef56} className="h-[32px] w-[32px]" style={{ imageRendering: 'pixelated' }} />
                        </div>
                        <span className="text-[10px] text-zinc-300 font-mono font-bold mt-1.5 block">56 x 56 px</span>
                        <span className="text-[9px] text-zinc-500 tracking-tight">Standard Desk</span>
                      </div>

                      {/* Small Emote */}
                      <div className="flex flex-col items-center">
                        <div className={`h-[56px] w-[56px] flex items-center justify-center rounded border border-white/5 ${bgType === 'transparent' ? 'bg-[#050505] bg-grid-pattern' : ''}`}>
                          <canvas ref={canvasRef28} className="h-[20px] w-[20px]" style={{ imageRendering: 'pixelated' }} />
                        </div>
                        <span className="text-[10px] text-zinc-300 font-mono font-bold mt-1.5 block">28 x 28 px</span>
                        <span className="text-[9px] text-zinc-500 tracking-tight">Chat Feed</span>
                      </div>

                    </div>
                  </div>

                  {/* Master Trigger Trigger Button */}
                  <div className="flex space-x-2">
                    <button
                      onClick={handleGenerateClick}
                      disabled={isGenerating}
                      className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 font-black text-black text-xs py-3.5 px-4 rounded-full flex items-center justify-center space-x-2.5 shadow-[0_0_15px_rgba(34,211,238,0.3)] cursor-pointer disabled:opacity-50 hover:scale-[1.01] transition-transform uppercase tracking-wider"
                      id="hero-generate-trigger"
                    >
                      <Zap className="h-4 w-4 animate-bounce" />
                      <span>{isGenerating ? 'Synthesizing Emote...' : 'Generate Stream Emote Pack'}</span>
                    </button>

                    <button
                      onClick={() => handleDownloadResolution(256, 'high_res')}
                      title="Download 256px Base Avatar"
                      className="px-3.5 rounded-full border border-white/10 bg-neutral-900/80 hover:bg-neutral-800 hover:text-white text-zinc-350 transition-colors flex items-center justify-center cursor-pointer"
                      id="hero-download-preview"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono px-1">
                    <span>Format: .PNG Transparents</span>
                    <button 
                      onClick={() => handleDownloadResolution(112, '112px')}
                      className="text-cyan-400 hover:underline hover:text-cyan-300"
                    >
                      Instant Download 112px
                    </button>
                  </div>

                </div>

              </div>
              
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
