'use client';

import Image from 'next/image';

const cloudLayers = [
  { src: '/images/banner/cell_1.png', duration: 120, opacity: 0.2 },
  { src: '/images/banner/cell_2.png', duration: 80, opacity: 0.2 },
  { src: '/images/banner/cell_3.png', duration: 50, opacity: 0.3 },
];

interface CloudsAnimationProps {
  flipVertical?: boolean;
}

export default function CloudsAnimation({ flipVertical = false }: CloudsAnimationProps) {
  return (
    <div className={`clouds-wrapper ${flipVertical ? 'flip-vertical' : ''}`}>
      {cloudLayers.map((layer, index) => (
        <div
          key={index}
          className={`clouds-layer clouds-layer-${index + 1}`}
        >
          {/* Seamless looping container */}
          <div
            className="clouds-animation-container"
            style={{
              animationDuration: `${layer.duration}s`,
            }}
          >
            {/* First image */}
            <div className="cloud-image">
              <Image
                src={layer.src}
                alt=""
                fill
                priority={index === 0}
                quality={95}
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  opacity: layer.opacity
                }}
              />
            </div>

            {/* Duplicate for seamless loop */}
            <div className="cloud-image">
              <Image
                src={layer.src}
                alt=""
                fill
                priority={index === 0}
                quality={95}
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  opacity: layer.opacity
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}