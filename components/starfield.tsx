"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize stars
    const starCount = 80;
    starsRef.current = [];

    for (let i = 0; i < starCount; i++) {
      starsRef.current.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        size: Math.random() * 2 + 0.5,
      });
    }

    const speed = 5;

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = "rgba(2, 6, 23, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      starsRef.current.forEach((star) => {
        // Move star away from camera (forward)
        star.z += speed;

        // Wrap around when star goes too far
        if (star.z >= canvas.width) {
          star.z = 1;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        // Project 3D to 2D with perspective
        const scale = canvas.width / (2 * star.z);
        const screenX = star.x * scale + centerX;
        const screenY = star.y * scale + centerY;
        const screenSize = star.size * scale;

        // Draw star (closer stars are brighter)
        const opacity = 0.5 - star.z / canvas.width;
        ctx.fillStyle = `rgba(147, 112, 219, ${opacity * 0.1})`;
        ctx.fillRect(
          screenX - screenSize / 2,
          screenY - screenSize / 2,
          screenSize,
          screenSize
        );

        // Draw star trail (trailing behind as star moves away)
        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.4})`;
        ctx.lineWidth = screenSize / 2;
        ctx.beginPath();
        ctx.moveTo(screenX, screenY);
        ctx.lineTo(
          screenX - (screenX - centerX) * 0.1,
          screenY - (screenY - centerY) * 0.1
        );
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
