export default function VideoIntro() {
  return (
    <section id="teacher" style={{ background: '#F4F7FF', padding: '64px 24px', color: '#0a0a0f', display: 'block', width: '100%' }}>
      <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '32px', fontWeight: 800 }}>Conoce a tu chingu coreano</h2>
      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
        <iframe width="100%" height="560" src="https://www.youtube.com/embed/DqG2nzyViOg" title="Jay Chingu" allowFullScreen style={{ display: 'block' }} />
      </div>
    </section>
  );
}
