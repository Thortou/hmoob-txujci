'use client';

import { useState } from 'react';
import './Book3D.css';

interface PageContent {
    title?: string;
    content?: string;
    customContent?: React.ReactNode;
}

interface Book3DProps {
    title?: string;
    author?: string;
    coverColor?: string;
    pages?: PageContent[];
    frontCoverContent?: React.ReactNode;
    className?: string;
}

export default function Book3D({
    title = "The Amazing Book",
    author = "Author Name",
    coverColor = "#8B4513",
    pages = [],
    frontCoverContent,
    className = "",
}: Book3DProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSpread, setCurrentSpread] = useState(0);

    // Default 12 pages if none provided
    const defaultPages: PageContent[] = pages.length > 0 ? pages : [
        { title: "Chapter 1", content: "Once upon a time, in a land far away, there lived a curious soul who loved to explore the mysteries of the world..." },
        { title: "The Journey", content: "Every great adventure starts with a single step. Open your mind to new possibilities and discover the magic that awaits within these pages." },
        { title: "Chapter 2", content: "As our hero continued their journey, they encountered many challenges and made new friends along the way..." },
        { title: "Discoveries", content: "Each day brought new discoveries and insights. The world was full of wonder and excitement for those willing to explore." },
        { title: "Chapter 3", content: "Through trials and tribulations, our hero grew stronger and wiser. Every obstacle was an opportunity to learn..." },
        { title: "Lessons Learned", content: "The most valuable lessons often come from the most difficult experiences. Embrace challenges as stepping stones to growth." },
        { title: "Chapter 4", content: "The path ahead was uncertain, but with courage and determination, anything was possible. The adventure continued..." },
        { title: "New Horizons", content: "Beyond every mountain peak lies a new horizon waiting to be explored. Keep moving forward and never look back." },
        { title: "Chapter 5", content: "In the heart of the journey, our hero discovered that the true treasure was the knowledge and experience gained along the way..." },
        { title: "Reflections", content: "Looking back at where it all began, our hero realized how far they had come and how much they had grown." },
        { title: "Chapter 6", content: "The final chapter was not an end, but a new beginning. Every ending is just a new start in disguise..." },
        { title: "The End", content: "And so, the story concludes, but the memories and lessons remain forever. Thank you for joining this journey!" },
    ];

    const totalPages = defaultPages.length;
    const totalSpreads = Math.ceil(totalPages / 2);

    const canGoNext = currentSpread < totalSpreads - 1;
    const canGoPrev = currentSpread > 0;

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (canGoNext) {
            setCurrentSpread(currentSpread + 1);
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (canGoPrev) {
            setCurrentSpread(currentSpread - 1);
        }
    };

    const handleToggleOpen = () => {
        if (!isOpen) {
            setCurrentSpread(0);
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className={`book-container ${className}`}>
            <div
                className={`book ${isOpen ? 'open' : ''}`}
                onClick={handleToggleOpen}
            >
                {/* Front Cover */}
                <div className="book-cover book-cover-front" style={{ backgroundColor: coverColor }}>
                    <div className="cover-content">
                        {frontCoverContent || (
                            <>
                                <h3 className="book-title">{title}</h3>
                                <p className="book-author">{author}</p>
                                <div className="book-decoration"></div>
                            </>
                        )}
                    </div>
                </div>

                {/* All 12 Pages */}
                {defaultPages.map((page, index) => {
                    const spreadIndex = Math.floor(index / 2);
                    const isLeftPage = index % 2 === 0;
                    const shouldRotate = isOpen && spreadIndex < currentSpread;

                    return (
                        <div
                            key={index}
                            className={`book-page ${isLeftPage ? 'book-page-left' : 'book-page-right'}`}
                            style={{
                                zIndex: 15 - index,
                                transform: shouldRotate ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                                transitionDelay: isOpen && spreadIndex === currentSpread - 1 ? '0.1s' : '0s',
                            }}
                        >
                            <div className="page-content">
                                {page.customContent || (
                                    <div className="default-page-content">
                                        <h4>{page.title}</h4>
                                        <p className="mt-4">{page.content}</p>
                                        <div className="page-number">{index + 1}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Back Cover */}
                <div className="book-cover book-cover-back" style={{ backgroundColor: coverColor }}>
                    <div className="cover-content back-cover">
                        <p className="back-text">Click to close ok</p>
                    </div>
                </div>
            </div>

            {/* Navigation Controls - Only show when book is open */}
            {isOpen && (
                <div className="book-navigation">
                    <button
                        className="nav-button nav-button-prev"
                        onClick={handlePrev}
                        disabled={!canGoPrev}
                        aria-label="Previous pages"
                    >
                        ‹
                    </button>
                    <span className="page-indicator">
                        {currentSpread + 1} / {totalSpreads}
                    </span>
                    <button
                        className="nav-button nav-button-next"
                        onClick={handleNext}
                        disabled={!canGoNext}
                        aria-label="Next pages"
                    >
                        ›
                    </button>
                </div>
            )}

            <p className="book-instruction">
                {isOpen ? 'Click the book to close or use arrows to navigate' : 'Click the book to open'}
            </p>
        </div>
    );
}
