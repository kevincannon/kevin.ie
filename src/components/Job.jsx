import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import Lightbox from "./Lightbox";

export default function Job({
  title,
  company,
  period,
  description,
  extrainfo,
  bullets,
  link,
  media,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(e.currentTarget.scrollLeft);
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleMouseLeave = (e) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = "grab";
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = x - startX;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="mb-8 grid md:grid-cols-[110px_1fr] gap-2 md:gap-6 w-full">
      {/* 2 colums on desktop */}
      <div className="text-sm text-cv-muted top-0.5 relative">{period}</div>
      <div className="min-w-0">
        <h3 className="text- font-light text-cv-white mb-1 ">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-cv-white no-underline hover:underline inline-flex items-center gap-1"
            >
              {title}
              <ArrowUpRight
                size={16}
                weight="regular"
                className="flex-shrink-0 transition-all duration-300 translate-y-px -translate-x-px group-hover:-translate-y-0 group-hover:translate-x-0"
              />
            </a>
          ) : (
            title
          )}
        </h3>
        {company && <p className="text-cv-text text-sm mb-1">{company}</p>}

        {description && <p className="text-cv-text mb-3">{description}</p>}
        {extrainfo && (
          <p className="text-cv-muted mb-3 text-sm whitespace-pre-line">
            {extrainfo}
          </p>
        )}
        {bullets && (
          <ul className="list-disc space-y-1 text-cv-muted mt-4 marker:text-cv-muted/33">
            {bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        )}

        {media && media.length > 0 && (
          <div
            className="flex flex-row flex-nowrap gap-3 mt-4 h-32 overflow-x-auto pr-8 cursor-grab select-none"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, black 90%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, black 90%, transparent 100%)",
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {media.map((item, index) => (
              <div
                key={index}
                className="relative cursor-grab flex-none aspect-video overflow-y-scroll h-32 rounded-lg hover:brightness-125 transition-scale transition-opacity bg-gray-800"
                onClick={() => openLightbox(index)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    draggable={false}
                    alt=""
                    className="w-full h-32 object-cover aspect-video"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-32 object-cover aspect-video"
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

        {media && (
          <Lightbox
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            media={media}
            currentIndex={currentMediaIndex}
            onNext={nextMedia}
            onPrev={prevMedia}
            title={title}
          />
        )}
      </div>
    </div>
  );
}
