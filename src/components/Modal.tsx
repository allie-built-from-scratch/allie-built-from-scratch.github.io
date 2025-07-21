import React, { useState, useRef, useEffect } from 'react';
import upArrowImage from '../images/up-arrow.png';

// Log the imported image path
console.log('Imported up-arrow image:', upArrowImage);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: {
    name: string;
    modalStats: Array<{
      name: string;
      value: number | string;
    }>;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, character }) => {
  if (!isOpen) return null;

  // Start with arrow visible to ensure it works
  const [showScrollArrow, setShowScrollArrow] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);

  // Check if content is scrollable
  const checkScrollable = () => {
    if (statsRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = statsRef.current;
      // Show arrow if there's more content to scroll down
      // Hide arrow if we're at the bottom
      const shouldShowArrow = scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight;
      console.log('Scroll check:', { scrollHeight, clientHeight, scrollTop, shouldShowArrow });
      setShowScrollArrow(shouldShowArrow);
    }
  };

  // Check on initial render and when content changes
  useEffect(() => {
    // Check immediately
    checkScrollable();

    // Check again after a short delay to ensure content is fully rendered
    const timer = setTimeout(() => {
      checkScrollable();
      console.log('Delayed scroll check executed');
    }, 500);

    return () => clearTimeout(timer);
  }, [character.modalStats]);

  // Log when showScrollArrow changes
  useEffect(() => {
    console.log('showScrollArrow changed:', showScrollArrow);
  }, [showScrollArrow]);

  // Force a re-check when the modal is opened
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened, checking if scrollable');
      // Wait for modal to be fully rendered
      const timer = setTimeout(() => {
        checkScrollable();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle click on the overlay to close the modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click is directly on the overlay, not on its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle scroll events to show/hide the arrow
  const handleScroll = () => {
    checkScrollable();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="pixel-button close-button" onClick={onClose}>
          CLOSE
        </button>
        <h2 className="modal-title">{character.name} STATS</h2>
        <div className="modal-stats-container" style={{ position: 'relative' }}>
          <div 
            className="modal-stats" 
            ref={statsRef}
            onScroll={handleScroll}
          >
            {character.modalStats.map((stat, index) => (
              <div key={index} className="modal-stat-item">
                <span className="modal-stat-name">{stat.name}:</span>
                <span className="modal-stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
          {showScrollArrow && (
            <div className="scroll-down-arrow">
              <img src={upArrowImage} alt="Scroll down" style={{ transform: 'rotate(180deg)', width: '100%', height: '100%' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
