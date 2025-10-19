import { useState } from 'react';
import Lightbox from './Lightbox';

export default function Project({ title, description, link, media }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentMediaIndex(index);
    setLightboxOpen(true);
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-light mb-2">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cv-white"
          >
            {title}
          </a>
        ) : (
          <span className="text-cv-white">{title}</span>
        )}
      </h3>
      <p className="text-cv-text mb-4">{description}</p>

      {media && media.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {media.map((item, index) => (
            <div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-lg hover:opacity-80 transition-opacity bg-gray-800"
              onClick={() => openLightbox(index)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-32 object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-full h-32 object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}
            </div>
          ))}
        </div>
      )}

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        media={media}
        currentIndex={currentMediaIndex}
        onNext={nextMedia}
        onPrev={prevMedia}
      />
    </div>
  );
}
