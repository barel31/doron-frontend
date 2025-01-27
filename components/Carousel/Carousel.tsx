'use client';

import { useState, useCallback } from 'react';
// import { useImagePreloader } from '@/hooks/useImagePreloader';
// import LoadingScreen from './LoadingScreen';
import CarouselContent from './CarouselContent';
import CarouselControls from './CarouselControls';

type CarouselProps = {
  images: string[];
};

const Carousel = ({ images }: CarouselProps) => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  // const { allImagesLoaded, loadedCount } = useImagePreloader(images);

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  // if (!allImagesLoaded) {
  //   return <LoadingScreen loadedCount={loadedCount} totalCount={images.length} />;
  // }

  return (
    <div className="carousel flex flex-col items-center max-w-md mx-auto mt-14 space-y-4 max-h-[750px]">
      <CarouselContent images={images} page={page} direction={direction} paginate={paginate} />
      {images.length > 1 && <CarouselControls paginate={paginate} />}
    </div>
  );
};

export default Carousel;
