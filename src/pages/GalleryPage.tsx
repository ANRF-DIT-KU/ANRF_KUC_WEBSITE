import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "../components/common/PageContainer";
import { PageHeader } from "../components/common/PageHeader";
import { BackLink } from "../components/common/BackLink";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchGalleryApi } from "../api";

export const GalleryPage: React.FC = () => {
  const { data: gallery = [] } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => fetchGalleryApi(),
  });

  const galleryImages = gallery.map((g) => ({
    id: g.id,
    src: g.src,
    alt: g.caption ?? "ANRF-PAIR Gallery Image",
    caption: g.caption,
  }));

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

  const selected = selectedIndex !== null ? galleryImages[selectedIndex] : undefined;

  return (
    <PageContainer>
      <BackLink to="/" label="Back to Home" />
      <PageHeader title="Gallery" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {image.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-4 pt-8 pb-3 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selected && (
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

          <figure onClick={(e) => e.stopPropagation()} className="flex flex-col items-center">
            <img
              src={selected.src}
              alt={selected.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            {selected.caption && (
              <figcaption className="mt-3 text-sm text-white/90 text-center">
                {selected.caption}
              </figcaption>
            )}
          </figure>

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
