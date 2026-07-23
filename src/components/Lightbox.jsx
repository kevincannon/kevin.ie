import { useEffect, useRef, useState } from "react";
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
  const [modalState, setModalState] = useState("closed"); // closed | opening | open | closing
  const closeTimeoutRef = useRef(null);
  const openRafRef = useRef(null);
  const isActive = modalState !== "closed";

  useEffect(() => {
    if (isOpen) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setModalState((prev) => (prev === "closed" ? "opening" : "open"));
    } else {
      setModalState((prev) => (prev === "closed" ? prev : "closing"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (modalState !== "opening") return;
    // Mount at the pre-open scale/opacity first, then flip to is-open on the
    // next frame so the browser has a state to transition from.
    const raf1 = requestAnimationFrame(() => {
      openRafRef.current = requestAnimationFrame(() => setModalState("open"));
    });
    return () => cancelAnimationFrame(raf1);
  }, [modalState]);

  useEffect(() => {
    if (modalState !== "closing") return;
    const closeDur =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--modal-close-dur"
        )
      ) || 150;
    closeTimeoutRef.current = setTimeout(() => {
      setModalState("closed");
    }, closeDur);
    return () => clearTimeout(closeTimeoutRef.current);
  }, [modalState]);

  useEffect(() => {
    return () => {
      if (openRafRef.current) cancelAnimationFrame(openRafRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isActive) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Get the scroll position from the body's top style
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // Restore the scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isActive, onClose]);

  if (!isActive || !media) return null;

  const current = media[currentIndex];

  return (
    <div
      className={`t-modal fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-blur backdrop-blur p-4 ${
        modalState === "open"
          ? "is-open"
          : modalState === "closing"
          ? "is-closing"
          : ""
      }`}
      style={{ height: "-webkit-fill-available", minHeight: "100dvh" }}
      onClick={onClose}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 cursor-pointer hover:scale-110 transition-all duration-120 ease-[var(--ease-smooth-out)]"
      >
        <XCircle size={24} weight="fill" />
      </button>

      <div
        className="max-w-6xl max-h-[75vh] overflow-hidden rounded-xl"
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
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-1 text-cv-white"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onPrev}
            className="text-4xl hover:text-gray-300 px-4 cursor-pointer hover:scale-110 transition-all duration-120 ease-[var(--ease-smooth-out)]"
          >
            <CaretCircleLeft size={24} weight="fill" />
          </button>
          <div className="text-sm pt-1 font-normal text-cv-muted">
            {currentIndex + 1}/{media.length}
          </div>
          <button
            onClick={onNext}
            className="text-4xl hover:text-gray-300 px-4 cursor-pointer hover:scale-110 transition-all duration-120 ease-[var(--ease-smooth-out)]"
          >
            <CaretCircleRight size={24} weight="fill" />
          </button>
        </div>
      )}
    </div>
  );
}
