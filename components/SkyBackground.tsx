'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useMemo } from 'react';

const colorSchemes = [
  { 
    threshold: 0, 
    gradient: 'linear-gradient(180deg, #ad989cff 0%, #f5e8eaff 100%)' // Soft pink-purple
  },
  { 
    threshold: 1, 
    gradient: 'linear-gradient(180deg, #D4A5C4 0%, #EDD9E3 100%)' // Medium mauve
  },
  { 
    threshold: 2, 
    gradient: 'linear-gradient(180deg, #C896B4 0%, #E5CAD7 100%)' // Deeper rose
  },
  { 
    threshold: 3, 
    gradient: 'linear-gradient(180deg, #b88a93ff 0%, #d9bcc5ff 100%)' // Muted purple-pink
  }
];

export default function SkyBackground() {
  return (
    <div 
      className="sky-background"
      style={{ 

      }}
    />
  );
}

// export default function SkyBackground() {
//   const scrollProgress = useScrollProgress();

//   const currentGradient = useMemo(() => {
//     let gradient = colorSchemes[0].gradient;
    
//     for (const scheme of colorSchemes) {
//       if (scrollProgress >= scheme.threshold) {
//         gradient = scheme.gradient;
//       }
//     }
    
//     return gradient;
//   }, [scrollProgress]);

//   return (
//     <div 
//       className="sky-background"
//       style={{ background: currentGradient }}
//     />
//   );
// }