export default function Loader() {
  return (
    <div className="flex items-center gap-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="
            h-3
            w-3
            rounded-full
            bg-stone-700
            animate-bounce-high
          "
          style={{
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  );
}
