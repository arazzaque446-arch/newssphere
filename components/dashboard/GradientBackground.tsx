export default function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/30 blur-[140px]" />

      <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-purple-500/30 blur-[140px]" />

      <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-pink-500/20 blur-[140px]" />

      <div className="absolute inset-0 bg-slate-950" />

    </div>
  );
}