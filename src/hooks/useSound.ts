import { useCallback, useState } from 'react';
import { checkMute, toggleMute } from '../Sounds';

export const useSound = () => {
  const [muted, setMuted] = useState<boolean>(() => checkMute());

  const toggleSound = useCallback(() => {
    const nextMuted = toggleMute();
    setMuted(nextMuted);
  }, []);

  return {
    muted,
    toggleSound
  };
};
