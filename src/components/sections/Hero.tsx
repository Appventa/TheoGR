export function Hero() {
  return (
    <section className="relative h-dvh min-h-[600px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/Hero_BG_video_LOOP.mp4" type="video/mp4" />
      </video>

      {/* Bottom fade into Gallery section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
