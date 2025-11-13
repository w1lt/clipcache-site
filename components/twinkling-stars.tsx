"use client";

export function TwinklingStars() {
  // Generate stars with even distribution across entire area
  const stars = Array.from({ length: 50 }, (_, i) => {
    // Use different mathematical constants for independent distributions
    const goldenRatio = 0.618033988749895;
    const sqrt2 = 1.4142135623730951;
    const euler = 2.718281828459045;

    // Create independent seeds for x and y to avoid clustering
    const xSeed = (i * goldenRatio) % 1;
    const ySeed = (i * sqrt2) % 1;
    const animSeed = (i * euler) % 1;

    // Distribute evenly across the entire viewport (0-100%)
    const left = xSeed * 100;
    const top = ySeed * 100;

    return {
      left: left,
      top: top,
      delay: animSeed * 3,
      duration: 2 + animSeed * 2,
      size: 1 + xSeed * 1,
      opacity: 0.3 + ySeed * 0.5,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
