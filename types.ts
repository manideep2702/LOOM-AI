export interface ViralAnalysis {
  hookStrategy: string;
  tone: string;
  formattingFeatures: string[];
  viralityScore: number;
  keywords: string[];
  emotionalArc: string;
  originalContent: string;
}

export interface GeneratedContent {
  postContent: string;
  whyItWorks: string[];
  postingAdvice: {
    bestTime: string;
    reason: string;
  };
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  ANALYSIS_COMPLETE = 'ANALYSIS_COMPLETE',
  GENERATING = 'GENERATING',
  GENERATION_COMPLETE = 'GENERATION_COMPLETE',
  ERROR = 'ERROR'
}