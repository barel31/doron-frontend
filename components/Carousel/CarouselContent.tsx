'use client';

import { handleDragEnd } from '@/lib/utils';
import { imageTransition, imageVariants } from '@/lib/variants';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import ImageView from '../ImageView';

type Props = {
  images: string[];
  page: number;
  direction: number;
  paginate: (newDirection: number) => void;
};

const CarouselContent = ({ images, page, direction, paginate }: Props) => {
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const [isImageViewOpen, setIsImageViewOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageViewOpen(true);
  };

  const handleCloseImageView = () => {
    setIsImageViewOpen(false);
  };

  return (
    <div className="carousel-content relative flex justify-center items-center w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <button onClick={handleImageClick} className="cursor-zoom-in">
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={imageVariants}
            transition={imageTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, { offset }) => paginate(handleDragEnd(offset))}
            className="w-full object-cover rounded-lg h-[500px] md:h-[650px]"
            alt={`Carousel image ${imageIndex + 1}`}
          />
        </button>
      </AnimatePresence>
      {isImageViewOpen && (
        <ImageView
          imageSrc={images[imageIndex]}
          onClose={handleCloseImageView}
        />
      )}
    </div>
  );
};

export default CarouselContent;
