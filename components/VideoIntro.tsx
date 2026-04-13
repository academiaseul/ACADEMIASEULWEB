export default function VideoIntro() {
  return (
    <section style={{ background: '#0a0a0f', padding: '100px 20px', color: 'white' }}>
      <h2 style={{ fontSize: '40px', textAlign: 'center' }}>Tu chingu coreano</h2>
      <div style={{ maxWidth: '300px', margin: '40px auto' }}>
        <iframe width="100%" height="500" src="https://www.youtube.com/embed/DqG2nzyViOg" title="Jay Chingu" allowFullScreen />
      </div>
    </section>
  );
}
