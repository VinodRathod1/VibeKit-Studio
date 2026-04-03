import React from 'react';

interface GalleryImage {
  url?: string;
  alt?: string;
}

interface GallerySectionProps {
  data: {
    images?: GalleryImage[];
  };
}

const GallerySection: React.FC<GallerySectionProps> = ({ data }) => {
  const images = data.images && data.images.length > 0 ? data.images : [
    { url: '', alt: 'Preview 1' },
    { url: '', alt: 'Preview 2' },
    { url: '', alt: 'Preview 3' },
    { url: '', alt: 'Preview 4' }
  ];

  return (
    <section className="py-20 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <div 
              key={i} 
              className="aspect-square relative group overflow-hidden rounded-[var(--radius)] border border-[var(--color-text)] border-opacity-5 bg-[var(--color-surface)] shadow-md hover:shadow-2xl transition-all"
            >
              {img.url ? (
                <img 
                  src={img.url} 
                  alt={img.alt || ''} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-text)] opacity-20 italic font-mono text-sm">
                  Placeholder Image {i + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
