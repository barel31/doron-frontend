import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type ImageViewProps = {
  imageSrc: string;
  onClose: () => void;
};

function ImageView({ imageSrc, onClose }: ImageViewProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50"
      onClick={onClose}>
      <div className="relative w-full h-full cursor-zoom-out">
        <Image
          src={imageSrc}
          alt="Full screen view"
          layout="fill"
          objectFit="contain"
          className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <p className="text-white">טוען...</p>
        </div>
      )}
    </div>
  );
}

export default ImageView;
