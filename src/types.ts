export interface EmoteStyle {
  id: string;
  name: string;
  description: string;
  badge: string;
  gradient: string;
}

export interface EmoteExpression {
  id: string;
  name: string;
  icon: string;
  stickerText: string;
  color: string;
}

export interface PresetAvatar {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  gender: 'male' | 'female' | 'neutral';
}

export interface PipelineStep {
  id: number;
  title: string;
  shortDesc: string;
  detail: string;
  status: 'pending' | 'active' | 'completed';
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  badge?: string;
  description: string;
  features: string[];
  credits: string;
  popular: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface OutputFormat {
  extension: '.png' | '.webp';
  resolution: string;
  useCase: string;
}
