import { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowSquareOut } from "@phosphor-icons/react";

function GrammarlyCorrection() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [cardState, setCardState] = useState("closed"); // closed | opening | open | closing
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const openRafRef = useRef(null);

  const openCard = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setCardState((prev) => (prev === "closed" ? "opening" : "open"));
  };

  const closeCard = () => {
    setCardState("closing");
    const closeDur =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--dropdown-close-dur"
        )
      ) || 150;
    closeTimeoutRef.current = setTimeout(() => {
      setCardState("closed");
    }, closeDur);
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    openCard();
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      closeCard();
    }, 300);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    closeCard();
  };

  const handleUndo = () => {
    setIsAccepted(false);
    closeCard();
  };

  const handleClickOutside = (e) => {
    if (
      cardRef.current &&
      !cardRef.current.contains(e.target) &&
      textRef.current &&
      !textRef.current.contains(e.target)
    ) {
      closeCard();
    }
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeCard();
    }
  };

  useEffect(() => {
    if (cardState !== "closed") {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [cardState]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (openRafRef.current) cancelAnimationFrame(openRafRef.current);
    };
  }, []);

  useEffect(() => {
    if (cardState !== "opening") return;
    // Mount at the pre-open scale/opacity first, then flip to is-open on the
    // next frame so the browser has a state to transition from.
    const raf1 = requestAnimationFrame(() => {
      openRafRef.current = requestAnimationFrame(() => setCardState("open"));
    });
    return () => cancelAnimationFrame(raf1);
  }, [cardState]);

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
      <span className="relative inline-grid">
        {/* Invisible reference copies reserve a box sized to the wider of
            the two words, so swapping text doesn't reflow the line. */}
        <span
          aria-hidden="true"
          className="invisible pointer-events-none whitespace-nowrap col-start-1 row-start-1"
        >
          Grammarly
        </span>
        <span
          aria-hidden="true"
          className="invisible pointer-events-none whitespace-nowrap col-start-1 row-start-1"
        >
          Superhuman
        </span>
        <span
          ref={textRef}
          className={`col-start-1 row-start-1 justify-self-start cursor-pointer !hover:text-white relative whitespace-nowrap ${
            !isAccepted ? "grammarly-underline" : ""
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMouseEnter}
        >
          {isAccepted ? "Superhuman" : "Grammarly"}
        </span>
      </span>

      {cardState !== "closed" && (
        <div
          ref={cardRef}
          className="absolute top-full -translate-y-[4px] -translate-x-[100px] sm:left-0 sm:translate-x-0 mt-2 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            data-origin="top-left"
            className={`t-dropdown w-64 bg-white rounded-xl shadow-xl outline outline-gray-800/20 p-3 ${
              cardState === "open"
                ? "is-open"
                : cardState === "closing"
                ? "is-closing"
                : ""
            }`}
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
        </div>
      )}
    </span>
  );
}

export default GrammarlyCorrection;
