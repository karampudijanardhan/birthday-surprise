export type SceneId = 'welcome' | 'hero' | 'gallery' | 'letter' | 'cake' | 'final';

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface BirthdayConfig {
  sisterName: string;
  brotherName: string;
  welcome: {
    heading: string;
    subheading: string;
    buttonLabel: string;
  };
  hero: {
    greeting: string;
    subtitle: string;
    buttonLabel: string;
  };
  gallery: {
    heading: string;
    subheading: string;
    continueLabel: string;
    photos: GalleryPhoto[];
  };
  letter: {
    heading: string;
    revealLabel: string;
    greeting: string;
    paragraphs: string[];
    signoff: string;
    signature: string;
    continueLabel: string;
  };
  cake: {
    heading: string;
    hint: string;
    blowLabel: string;
    wishHeading: string;
    wishMessage: string;
    continueLabel: string;
    candleCount: number;
  };
  finalSurprise: {
    teaser: string;
    buttonLabel: string;
    heading: string;
    message: string;
    replayLabel: string;
  };
  music: {
    enabled: boolean;
    src: string;
    title: string;
  };
  theme: {
    confettiColors: string[];
  };
}
