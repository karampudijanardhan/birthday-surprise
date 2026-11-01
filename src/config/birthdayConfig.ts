
import type { BirthdayConfig } from '@/types/birthday';

const sisterName = 'Parameswari';
const brotherName = 'Janardhan';

const photoCaptions = [
  'A collection of lovely memories ✨',
  'Every moment tells a story 💖',
  'Beautiful moments to remember 🌸',
  'Little memories, big smiles 💙',
  'The beginning of a beautiful journey 🧸',
  'A precious childhood memory 🌷',
  'Always keep smiling 💕',
  'Growing with beautiful dreams ✨',
  'A special moment in your journey 💜',
  'Your story is still being written 💙',
];

export const birthdayConfig: BirthdayConfig = {
  sisterName,
  brotherName,

  welcome: {
    heading: 'A Little Surprise for Parameswari 💙',
    subheading:
      'Some people become special through their kindness, care, and the happiness they bring into our lives. I made this little birthday surprise just for you.',
    buttonLabel: 'Open Your Surprise 💌',
  },

  hero: {
    greeting: `Happy Birthday, ${sisterName}! 🎂`,
    subtitle:
      'Today is all about you! May your smile always stay bright, your heart stay happy, and your dreams take you to wonderful places. You deserve happiness, good health, and success in everything you do.',
    buttonLabel: 'Discover Your Surprise ✨',
  },

  gallery: {
    heading: 'Her Beautiful Journey 💙',
    subheading:
      'From childhood memories to the beautiful person you are today. Every picture holds a special moment. Keep smiling, Parameswari!',
    continueLabel: 'Read My Letter 💌',

    photos: Array.from({ length: 10 }, (_, index) => ({
      id: `sister-${String(index + 1).padStart(2, '0')}`,
      src: `/images/sister-${String(index + 1).padStart(2, '0')}.jpeg`,

      alt: `A special memory of Parameswari ${index + 1}`,
      caption: photoCaptions[index],
    })),
  },

  letter: {
    heading: 'A Letter From My Heart 💙',
    revealLabel: 'Open Your Letter 💌',
    greeting: `Dear ${sisterName},`,

    paragraphs: [
      'Happy Birthday, Parameswari! 🎂 Today is special because it celebrates the day someone as wonderful as you came into this world. I hope your birthday brings you happiness, beautiful moments, and countless reasons to smile.',

      'One thing I will always appreciate is the way you cared for me when I was not feeling well. You asked about my health and advised me on the precautions I should take. Those thoughtful words meant a lot to me. Sometimes, a little care from someone can make a difficult day feel easier, and I am genuinely grateful for the kindness you showed me.',

      'As you continue your B.Tech journey in CSE (AI & ML), always believe in yourself. You are clever, hardworking, and capable of achieving wonderful things. Keep learning, work towards good marks, improve your skills, and never stop dreaming. I sincerely hope you get an excellent job placement and build the successful future you deserve.',

      'More than anything, please take care of your health. Marks, placements, and achievements are important, but your happiness and well-being matter just as much. Never put so much pressure on yourself that you forget to smile, rest, and enjoy the little things in life.',

      'There is something else I want to tell you from my heart. I hope the bond we share continues for many years. Life will bring new responsibilities, busy schedules, new opportunities, and changes, but I hope we will always find time to talk, share our thoughts, encourage each other, and celebrate one another’s happiness.',

      'I believe a meaningful bond grows through trust, understanding, respect, and genuine care. I do not expect every day to be the same or that we will always be available to talk. I simply hope that, even when life gets busy, we continue to value the connection we have built. Let us always wish the best for each other, support each other when possible, and keep this bond alive with kindness and understanding. 💙',

      'You may not always realize how much your kindness means to others, but I hope you never lose that beautiful quality. Keep being the clever, caring, and hardworking person you are. May this new year of your life bring you wonderful opportunities, new achievements, peace of mind, good health, and the confidence to face every challenge.',

      'Once again, happy birthday, Parameswari! Keep smiling, keep learning, keep taking care of yourself, and keep moving towards your dreams. Whatever the future brings, I sincerely wish to see you happy, successful, and proud of the person you become.',
    ],

    signoff: 'With heartfelt birthday wishes,',
    signature: brotherName,
    continueLabel: 'Let’s Celebrate with Cake 🎂',
  },

  cake: {
    heading: 'A Birthday Cake Just for You 🎂',
    hint: 'Make a birthday wish, then tap the candles to put them out!',
    blowLabel: 'Make a Wish & Celebrate ✨',
    wishHeading: 'May Your Wishes Come True! 💫',
    wishMessage:
      'May you enjoy good health, achieve excellent marks, find a wonderful job, and build a future filled with happiness and opportunities. Believe in yourself and keep moving forward!',
    continueLabel: 'Discover Your Special Gift 🎁',
    candleCount: 6,
  },

  finalSurprise: {
    teaser: 'Wait... your birthday surprise is not over yet! 🎁',
    buttonLabel: 'Reveal Your Special Gift 💙',
    heading: 'One Pen. A Thousand Possibilities. 🖊️',
    message: `Parameswari, you always work hard and dream big.

This little golden pen is a reminder that your future is waiting to be written. May every page bring you good marks, new ideas, success, and happiness.

One day, I hope this pen helps you sign your dream job offer letter.

Keep shining, keep learning, and never stop believing in yourself. 💛`,
  },

 music: {
  enabled: true,
  src: '/audio/birthday-music.mp3',
  title: 'Birthday Song',
},

  theme: {
    confettiColors: [
      '#8bb8ff',
      '#c5b5ef',
      '#f9aec6',
      '#dbeafe',
      '#fffaf5',
      '#93c5fd',
      '#e9d5ff',
    ],
  },
};
