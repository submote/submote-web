import { EmoteStyle, EmoteExpression, PresetAvatar, PipelineStep, PricingPlan, FAQItem, OutputFormat } from './types';

export const EMOTE_STYLES: EmoteStyle[] = [
  {
    id: 'chibi',
    name: 'Chibi Cute',
    description: 'Anime vectors, giant sparkling eyes, rosy cheeks, outline glow.',
    badge: 'Trending',
    gradient: 'from-pink-500 to-rose-400',
  },
  {
    id: 'pixel',
    name: '16-bit Retro',
    description: 'Crisp hand-drawn retro grid effect with scanlines and CRT hue.',
    badge: 'Retro',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'cartoon',
    name: 'Cel Cartoon',
    description: 'Vibrant colors, thick ink outlines, comic book action shaders.',
    badge: 'Classic',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'synthwave',
    name: 'Synthwave Neon',
    description: 'Cool duotone neon purple/cyan map, retro horizon grid overlay.',
    badge: 'VIP',
    gradient: 'from-fuchsia-500 to-cyan-500',
  },
  {
    id: 'cyberpunk',
    name: 'Cyber Kawaii',
    description: 'Acid glitch accents, digital visor overlays, high contrast matrix.',
    badge: 'Special',
    gradient: 'from-green-400 to-indigo-700',
  },
];

export const EMOTE_EXPRESSIONS: EmoteExpression[] = [
  {
    id: 'hype',
    name: 'Hype / Pog',
    icon: '⚡',
    stickerText: 'POG!',
    color: '#fbbf24',
  },
  {
    id: 'rage',
    name: 'Rage / Salt',
    icon: '🔥',
    stickerText: 'SALT',
    color: '#ef4444',
  },
  {
    id: 'lurk',
    name: 'Lurking',
    icon: '👀',
    stickerText: 'LURK',
    color: '#3b82f6',
  },
  {
    id: 'smug',
    name: 'Ez Clap',
    icon: '😎',
    stickerText: 'EZ CLAP',
    color: '#10b981',
  },
  {
    id: 'love',
    name: 'Love Eyes',
    icon: '💖',
    stickerText: 'LOVE',
    color: '#ec4899',
  },
  {
    id: 'cry',
    name: 'Sadge Cry',
    icon: '😭',
    stickerText: 'SADGE',
    color: '#6366f1',
  },
];

export const PRESET_AVATARS: PresetAvatar[] = [
  {
    id: 'streamer_mia',
    name: 'Streamer Mia',
    role: 'Apex Predator VTuber',
    imageUrl: 'female_pink_hair',
    gender: 'female',
  },
  {
    id: 'gamer_kai',
    name: 'Gamer Kai',
    role: 'Speedrunner / Retro Fan',
    imageUrl: 'male_neon_cap',
    gender: 'male',
  },
  {
    id: 'cyber_v',
    name: 'Cyber V',
    role: 'Synth DJ & Tech Streamer',
    imageUrl: 'neutral_matrix_shades',
    gender: 'neutral',
  },
  {
    id: 'chibi_luna',
    name: 'Chibi Luna',
    role: 'ASMR & Variety Gamer',
    imageUrl: 'female_purple_buns',
    gender: 'female',
  },
];

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 1,
    title: 'Precision Crop & Detect',
    shortDesc: 'Automated facial isolation',
    detail: 'Our ultra-fast AI detects face geometry, isolating borders and removing complex backgrounds instantenously with high-contrast alpha channels.',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Neural Feature Extraction',
    shortDesc: 'Abstracting distinctive expressions',
    detail: 'Maps 68 facial coordinates to record eyebrows, smile depth, and gaze direction to preserve your authentic personality landmarks.',
    status: 'active',
  },
  {
    id: 3,
    title: 'Model-to-Style Transfer',
    shortDesc: 'Synthesizing creative emote shaders',
    detail: 'Applies neural style weight models (Chibi, Pixel, Cartoon) to morph features into highly readable twitch emotes.',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Dynamic Format Optimizer',
    shortDesc: 'Pixel-packed Twitch bundle',
    detail: 'Exports auto-packaged .webp, .png files pre-cropped to strict platform specs (112px, 56px, 28px) with pre-baked high-visibility borders.',
    status: 'pending',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Streamer Starter',
    price: '$12',
    period: 'one-time',
    description: 'Perfect for new streamers establishing their chat brand.',
    credits: '50 Emote Credits',
    features: [
      'Access to Chibi & Cartoon styles',
      'Twitch & Discord auto-sizing (.PNG)',
      'Basic Expression Pack (3 layout variants)',
      'Fast Cloud Render (under 10s)',
      'Static background transparencies',
    ],
    popular: false,
  },
  {
    name: 'Creator Pro',
    price: '$29',
    period: 'month',
    badge: 'Most Popular',
    description: 'Fully automated, unlimited sandbox style refinement and animated emotes.',
    credits: '500 Credits / Month',
    features: [
      'Access to ALL Styles (Pixel, Synth, Glitch)',
      'High fidelity .WEBP animated emote renderers',
      'Advanced Expressions (Love, Lurk, Rage, Pog)',
      'Commercial usage license & brand rights',
      'Priority cloud processing speed (sub-second)',
      'Smart batch uploading (Convert 5 photos at once)',
    ],
    popular: true,
  },
  {
    name: 'Esport Elite',
    price: '$89',
    period: 'month',
    description: 'Scalable tailored service for full esport organizations and VTuber agencies.',
    credits: 'Unlimited Generations',
    features: [
      'Custom Style Training (Your Org design model)',
      'Dedicated API integration access',
      'White-label twitch emote widget embedding',
      '24/7 Priority Discord concierge support',
      'Raw vectorized SVG outputs (.svg format)',
      'Multi-seat agency account controls',
    ],
    popular: false,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How does the automated emote conversion actually work?',
    answer: 'Submote feeds your uploaded facial profile into a specialized generative adversarial network (GAN) optimized for high-contrast micro-assets. First, it segments your head, crops it to the optical golden ratio, removes the background, and maps facial keypoints. It then applies custom diffusion style weights mapping your expression directly to Chibi, Pixel art, or Synthwave visual coordinates.'
  },
  {
    question: 'Are these emotes ready to import directly on Twitch, Discord, and YouTube?',
    answer: 'Yes! Every Single generation creates a downloadable bundle optimized to the exact pixel ratios required by each platform. You get Twitch sizes (112x112px, 56x56px, 28x28px) and Discord/YouTube avatars with full, clean Alpha channel transparencies. No scaling, resizing, or Photoshop required.'
  },
  {
    question: 'Can I upload a selfie taken from my phone/webcam?',
    answer: 'Absolutely. For optimal results, ensure your face is well-lit, looking directly at the camera, and with a clean background. However, our neural extractor is fine-tuned to isolate faces even in low-light stream setups and messy bedroom backgrounds.'
  },
  {
    question: 'What are the copyright holdings on generated emotes?',
    answer: 'On the Creator Pro and Esport Elite tiers, you retain absolute ownership and commercial exploitation rights. You can use them for merch, sub badges, clothing, stickers, and monetization without paying royalties.'
  },
  {
    question: 'Can you render animated emotes (GIF / APNG)?',
    answer: 'Yes! Our Creator Pro tier compiles fully animated emotes (e.g. sweating, head-banging, shaking) using our Temporal Flow neural generator, exporting high-fidelity, loop-optimized WebP anims.'
  },
  {
    question: 'Do you offer custom style guidelines for Vtuber models?',
    answer: 'Yes! Dynamic VTuber assets or illustrated character sheets can easily be converted into uniform sets. The Esport Elite tier enables custom agency style weights targeting specific color templates.'
  }
];

export const OUTPUT_FORMATS: OutputFormat[] = [
  { extension: '.webp', resolution: '112 x 112 px', useCase: 'Twitch Standard Emote' },
  { extension: '.webp', resolution: '56 x 56 px', useCase: 'Twitch Medium Retinal' },
  { extension: '.webp', resolution: '28 x 28 px', useCase: 'Twitch Small Viewport' },
  { extension: '.png', resolution: '128 x 128 px', useCase: 'Discord Guild Emote' },
  { extension: '.png', resolution: '256 x 256 px', useCase: 'YouTube Subscriber Badge' },
];
