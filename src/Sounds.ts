import { circle, cross, game } from './lib/audio';

type SoundKey = 'gameSound' | 'crossSound' | 'circleSound';
type SoundMap = Partial<Record<SoundKey, HTMLAudioElement>>;

let sounds: SoundMap = {};

// juryrig to catch SSR error for audio objects
try {
  sounds = {
    gameSound: new Audio(game),
    crossSound: new Audio(cross),
    circleSound: new Audio(circle)
  };
} catch {
  // caught untill client code.
}

const status: { muted: boolean } = {
  muted: false
};

const forEachSound = (callback: (audio: HTMLAudioElement) => void) => {
  Object.values(sounds).forEach(audio => {
    if (audio) {
      callback(audio);
    }
  });
};

const loadAndPlay = (soundKey: SoundKey) => {
  sounds[soundKey]?.load();
  sounds[soundKey]?.play();
};

export const checkMute = () => status.muted;

export const muteAll = () => {
  forEachSound(audio => {
    audio.load();
    audio.muted = true;
  });
  status.muted = true;
};

export const unMuteAll = () => {
  forEachSound(audio => {
    audio.load();
    audio.muted = false;
  });
  status.muted = false;
};

export const toggleMute = () => {
  if (status.muted) {
    unMuteAll();
    return status.muted;
  }
  muteAll();
  return status.muted;
};

export const playCircle = () => {
  loadAndPlay('circleSound');
};

export const playCross = () => {
  loadAndPlay('crossSound');
};

export const playGame = () => {
  loadAndPlay('gameSound');
};
