import React, { useState } from 'react';
import { PageContainer } from '../components/common/PageContainer';
import { PageHeader } from '../components/common/PageHeader';
import { BackLink } from '../components/common/BackLink';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import img1 from '../assets/images/18957.jpg.jpeg';
import img2 from '../assets/images/18963.jpg.jpeg';
import img3 from '../assets/images/18967.jpg.jpeg';
import img4 from '../assets/images/18979.jpg.jpeg';
import img5 from '../assets/images/IMG_6850.JPG';
import img6 from '../assets/images/IMG_6853.JPG';
import img7 from '../assets/images/IMG_6857.JPG';
import img8 from '../assets/images/IMG_6978.JPG';

const galleryImages = [
  { id: 1, src: img1, alt: 'ANRF-PAIR Gallery Image 1' },
  { id: 2, src: img2, alt: 'ANRF-PAIR Gallery Image 2' },
  { id: 3, src: img3, alt: 'ANRF-PAIR Gallery Image 3' },
  { id: 4, src: img4, alt: 'ANRF-PAIR Gallery Image 4' },
  { id: 5, src: img5, alt: 'ANRF-PAIR Gallery Image 5' },
  { id: 6, src: img6, alt: 'ANRF-PAIR Gallery Image 6' },
  { id: 7, src: img7, alt: 'ANRF-PAIR Gallery Image 7' },
  { id: 8, src: img8, alt: 'ANRF-PAIR Gallery Image 8' },
];

export const GalleryPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryImages.length);
  };

  return (
    <PageContainer>
      <BackLink to="/" label="Back to Home" />
      <PageHeader title="Gallery" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close image viewer"
          >
            <X size={24} />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={galleryImages[selectedIndex].src}
            alt={galleryImages[selectedIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </PageContainer>
  );
};
