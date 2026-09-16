'use client';

import { useT } from '@/lib/i18n';

export default function VideoIntro() {
  const { t } = useT();
  return (
    <section id="teacher" className="bg-[#F4F7FF] text-seoul-black" style={{ padding: '64px 24px', display: 'block', width: '100%' }}>
      <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '32px', fontWeight: 800 }}>{t('Conoce a tu chingu coreano')}</h2>
      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
        <iframe width="100%" height="560" src="https://www.youtube.com/embed/DqG2nzyViOg" title="Jay Chingu" allowFullScreen style={{ display: 'block' }} />
      </div>
    </section>
  );
}
