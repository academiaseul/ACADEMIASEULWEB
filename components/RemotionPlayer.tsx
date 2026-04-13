'use client';

import { Player } from '@remotion/player';
import { HeroComposition } from '@/remotion/HeroComposition';

export default function RemotionPlayerComponent() {
  return (
    <Player
      component={HeroComposition}
      durationInFrames={450}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: '100%', height: '100%' }}
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
      acknowledgeRemotionLicense
    />
  );
}