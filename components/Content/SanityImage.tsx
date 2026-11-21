import { urlFor } from '@/lib/client';
import { cn } from '@/lib/utils';
import { type SanityImageSource } from '@sanity/image-url';
import Image from 'next/image';

function SanityImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: SanityImageSource;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={urlFor(src).format('webp').dpr(2).quality(80).url()}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
      className={cn('w-full h-[70vh] object-cover', className)}
    />
  );
}

export default SanityImage;
