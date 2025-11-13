'use client';

import { useEffect, useRef } from 'react';

interface YandexMapProps {
  address: string;
  center?: [number, number]; // [latitude, longitude]
  zoom?: number;
  className?: string;
}

// Yandex Maps types
declare global {
  interface Window {
    ymaps?: any;
  }
}

export function YandexMap({ address, center = [52.097621, 23.73405], zoom = 16, className }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    // Load Yandex Maps API script
    const loadYandexMaps = () => {
      if (window.ymaps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.async = true;
      script.onload = () => {
        window.ymaps?.ready(initializeMap);
      };
      document.body.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || mapInstance.current) return;

      try {
        // Create map
        mapInstance.current = new window.ymaps.Map(mapRef.current, {
          center: center,
          zoom: zoom,
          controls: ['zoomControl', 'fullscreenControl'],
        });

        // Add placemark (pin)
        const placemark = new window.ymaps.Placemark(
          center,
          {
            balloonContent: `<strong>${address}</strong>`,
            hintContent: address,
          },
          {
            preset: 'islands#redDotIcon',
          }
        );

        mapInstance.current.geoObjects.add(placemark);

        // Disable scroll zoom by default (better UX)
        mapInstance.current.behaviors.disable('scrollZoom');
      } catch (error) {
        console.error('Error initializing Yandex Map:', error);
      }
    };

    loadYandexMaps();

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [address, center, zoom]);

  return (
    <div
      ref={mapRef}
      className={className || 'w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden'}
      style={{ width: '100%' }}
    />
  );
}
