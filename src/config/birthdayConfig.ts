import type { BirthdayConfig } from '@/types/birthday';

const sisterName = 'Sister';
const brotherName = 'Your Brother';

export const birthdayConfig: BirthdayConfig = {
  sisterName,
  brotherName,
  welcome: {
    heading: 'A Little Surprise for Someone Special',
    subheading: 'I made something just for you...',
    buttonLabel: 'Open Your Surprise ✨',
  },
  hero: {
    greeting: `Happy Birthday, ${sisterName}!`,
    subtitle:
      'The world is a little brighter because you are in it. Let me show you how much you mean to me.',
    buttonLabel: 'Explore Our Memories',
  },
  gallery: {
    heading: 'Our Memories Together',
    subheading:
      'A few moments I will always hold close. Tap any photo to see it up close.',
    continueLabel: 'Continue to My Letter',
    photos: [
      {
        id: 'sister-01',
        src: '/images/sister-01.jpg',
        alt: 'A cherished moment with my sister',
        caption: 'Our first adventure together',
      },
      {
        id: 'sister-02',
        src: '/images/sister-02.jpg',
        alt: 'My sister laughing during a happy day',
        caption: 'Laughing until it hurt',
      },
      {
        id: 'sister-03',
        src: '/images/sister-03.jpg',
        alt: 'A quiet, beautiful memory of my sister',
        caption: 'A moment I never want to forget',
      },
    ],
  },
  letter: {
    heading: 'A Letter Just for You',
    revealLabel: 'Open the Letter',
    greeting: `Dear ${sisterName},`,
    paragraphs: [
      'Today is a special day because the world became more beautiful when you were born.',
      'You are more than my sister. You are someone I will always care about, support, and wish the very best for.',
      'May your life be filled with happiness, love, success, good health, and countless beautiful memories.',
      'Never stop smiling, dreaming, or believing in yourself.',
      'Happy Birthday, my wonderful sister!',
    ],
    signoff: 'With lots of love,',
    signature: brotherName,
    continueLabel: 'Continue to the Cake',
  },
  cake: {
    heading: 'Time for Cake',
    hint: 'Tap a candle to snuff it out, or blow them all out at once.',
    blowLabel: 'Blow Out the Candles 🎂',
    wishHeading: 'Make a Wish! ✨',
    wishMessage: 'Close your eyes, take a breath, and hold your wish close.',
    continueLabel: 'Continue to Your Final Surprise',
    candleCount: 5,
  },
  finalSurprise: {
    teaser: 'Someone has one more gift for you...',
    buttonLabel: 'One Last Surprise 💖',
    heading: 'You Will Always Be Special to Me ❤️',
    message:
      'No matter how much life changes, you will always have a special place in my heart. Keep smiling, keep dreaming, and keep shining. Happy Birthday!',
    replayLabel: 'Replay the Birthday',
  },
  music: {
    enabled: true,
    src: '/audio/birthday-music.mp3',
    title: 'Background music',
  },
  theme: {
    confettiColors: ['#f9aec6', '#c5b5ef', '#e3bfa6', '#fccfdc', '#fffaf5', '#d4a085'],
  },
};
