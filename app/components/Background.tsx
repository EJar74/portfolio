'use client'
// components/Background.tsx
import { useEffect, useState } from 'react';

const Background = () => {
  const [circles, setCircles] = useState<any>([]);
  const [maxCircles, setMaxCircles] = useState(60); // Default to a larger number of circles

  useEffect(() => {
    // Update maxCircles based on the window size
    const handleResize = () => {
      setMaxCircles(window.innerWidth < 768 ? 30 : 60);
    };

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const addCircle = () => {
      if (circles.length >= maxCircles) return;

      const size = Math.random() * (window.innerWidth < 768 ? 40 : 80) + 20;
      const greyShade = Math.floor(Math.random() * 155) + 100;
      const circle = {
        id: Math.random(),
        size,
        x: Math.random() * (window.innerWidth - size),
        y: -size,
        animationDuration: Math.random() * (25 - 10) + 10,
        color: `rgb(${greyShade}, ${greyShade}, ${greyShade})`,
        opacity: Math.random() * 0.6 + 0.4,
        animationTiming: `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`,
      };
      setCircles((prevCircles:any) => [...prevCircles, circle]);
    };

    const intervalId = setInterval(addCircle, 3000);

    return () => clearInterval(intervalId);
  }, [circles.length]);

  useEffect(() => {
    const updateCircles = () => {
      setCircles((prevCircles:any) => prevCircles.filter((circle:any) => circle.y < window.innerHeight + circle.size));
    };

    const timeoutId = setTimeout(updateCircles, 500);

    return () => clearTimeout(timeoutId);
  }, [circles]);

  // Mouse move handler (basic example)
  useEffect(() => {
    const handleMouseMove = (event:any) => {
      const { clientX, clientY } = event;
      setCircles((prevCircles:any) => prevCircles.map((circle:any) => {
        const distanceX = clientX - circle.x;
        const distanceY = clientY - (window.innerHeight - circle.y);
        if (Math.sqrt(distanceX * distanceX + distanceY * distanceY) < 100) {
          return { ...circle, x: circle.x + 10, y: circle.y - 10 };
        }
        return circle;
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      {circles.map((circle:any) => (
        <div
          key={circle.id}
          className="absolute bg-gray-500 rounded-full transition-opacity duration-300 shadow-lg"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            backgroundColor: circle.color,
            opacity: circle.opacity,
            boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
            animation: `falling ${circle.animationDuration}s ${circle.animationTiming} infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes falling {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) scale(0.5);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Background;
