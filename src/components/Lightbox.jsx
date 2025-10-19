import { useEffect } from "react";
import {
  XCircle,
  CaretCircleRight,
  CaretCircleLeft,
} from "@phosphor-icons/react/dist/ssr";

export default function Lightbox({
  isOpen,
  onClose,
  media,
  currentIndex,
  onNext,
  onPrev,
  title,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !media) return null;

  const current = media[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-blur backdrop-blur p-4"
      style={{ height: "-webkit-fill-available", minHeight: "100dvh" }}
      onClick={onClose}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 cursor-pointer"
      >
        <XCircle size={24} weight="fill" />
      </button>

      <div
        className="max-w-6xl max-h-[75vh] overflow-auto rounded-1xl"
        onClick={(e) => e.stopPropagation()}
      >
        {current.type === "image" ? (
          <img
            src={current.url}
            alt=""
            className="max-w-full max-h-[75vh] object-contain"
          />
        ) : (
          <video
            src={current.url}
            controls
            autoPlay
            loop
            playsInline
            className="max-w-full max-h-[75vh]"
          />
        )}
      </div>

      {media.length > 1 && (
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-cv-white"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onPrev}
            className="text-4xl hover:text-gray-300 px-4 cursor-pointer"
          >
            <CaretCircleLeft size={24} weight="fill" />
          </button>
          <div className="text-sm pt-1 font-normal text-cv-muted">
            {currentIndex + 1} / {media.length}
          </div>
          <button
            onClick={onNext}
            className="text-4xl hover:text-gray-300 px-4 cursor-pointer"
          >
            <CaretCircleRight size={24} weight="fill" />
          </button>
        </div>
      )}
    </div>
  );
}
