import { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowSquareOut } from "@phosphor-icons/react";

function GrammarlyCorrection() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowCard(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowCard(false);
    }, 300);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    setShowCard(false);
  };

  const handleUndo = () => {
    setIsAccepted(false);
    setShowCard(false);
  };

  const handleClickOutside = (e) => {
    if (
      cardRef.current &&
      !cardRef.current.contains(e.target) &&
      textRef.current &&
      !textRef.current.contains(e.target)
    ) {
      setShowCard(false);
    }
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setShowCard(false);
    }
  };

  useEffect(() => {
    if (showCard) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [showCard]);

  return (
    <span className="relative inline-block">
      <style>{`
        .grammarly-underline::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #ef4444;
          transform: scaleX(0);
          transform-origin: left;
          animation: underline-grow 0.8s ease-out 0.1s forwards;
          animation-delay: 1.5s;
        }
        @keyframes underline-grow {
          to { transform: scaleX(1); }
        }
      `}</style>
      <span
        ref={textRef}
        className={`cursor-pointer !hover:text-white relative ${
          !isAccepted ? "grammarly-underline" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseEnter}
      >
        {isAccepted ? "Superhuman" : "Grammarly"}
      </span>

      {showCard && (
        <div
          ref={cardRef}
          className="absolute top-full -translate-y-[4px] -translate-x-[100px] sm:left-0 sm:translate-x-0 mt-2 w-64 bg-white rounded-xl shadow-xl outline outline-gray-800/20 p-3 z-50 opacity-0 animate-[fadeIn_150ms_ease-in_forwards]"
          style={{
            animation: "fadeIn 150ms ease-in forwards",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-normal">
              Company Rebrand:
            </span>
          </div>

          <div className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through">Grammarly</span>
              <ArrowRight
                size={16}
                weight="regular"
                className="text-gray-400"
              />
              <span className="text-neutral-800  py-1.5 font-normal">
                Superhuman
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={isAccepted ? handleUndo : handleAccept}
              className={`w-20 text-white py-1.5 px-2 rounded-md transition-colors duration-75 cursor-pointer ${
                isAccepted
                  ? "bg-[#714cb6] hover:bg-[#5f3d9a]"
                  : "bg-[#027e6f] hover:bg-[#026a5d]"
              }`}
            >
              {isAccepted ? "Undo" : "Accept"}
            </button>

            <a
              href="https://medium.com/smith-diction/branding-superhuman-and-grammarly-and-coda-8c57f970bead"
              target="_blank"
              rel="noopener noreferrer"
              title="Learn more about Grammarly's rebrand to Superhuman"
              className="!text-gray-500 py-1.5 px-2 rounded-md hover:bg-gray-100 !hover:text-gray-800 !no-underline whitespace-nowrap flex items-center gap-1"
            >
              Learn more&nbsp;
              <ArrowSquareOut
                size={16}
                weight="regular"
                className="text-gray-500"
              />
            </a>
          </div>
        </div>
      )}
    </span>
  );
}

export default GrammarlyCorrection;
