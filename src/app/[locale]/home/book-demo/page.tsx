'use client';

import Book3D from "@/src/components/Book3D";


export default function BookDemoPage() {
    // Custom 12 pages example
    const customPages = [
        { title: "Introduction", content: "Welcome to this amazing book! This is a demonstration of a 12-page 3D book with smooth page-turning animations." },
        { title: "How to Use", content: "Click the book to open it. Use the arrow buttons below to navigate through pages. Click the book again to close it." },
        { title: "Chapter 1", content: "Our journey begins in a small village, where a young dreamer looked up at the stars and wondered what lay beyond the horizon..." },
        { title: "The Dream", content: "Every great achievement starts with a dream. A vision of what could be, fueled by passion and determination." },
        { title: "Chapter 2", content: "The path to success is rarely straight. It winds through mountains of doubt and valleys of failure, but each step teaches us something valuable." },
        { title: "Challenges", content: "Obstacles are not roadblocks, but stepping stones. Each challenge overcome makes us stronger and wiser." },
        { title: "Chapter 3", content: "Along the journey, we meet others who share our vision. Together, we can achieve what no one could accomplish alone." },
        { title: "Collaboration", content: "The power of teamwork lies in diversity. Different perspectives, different strengths, united by a common goal." },
        { title: "Chapter 4", content: "True success is not just about reaching the destination, but about who we become along the way." },
        { title: "Growth", content: "Growth happens outside our comfort zone. Embrace change, learn from failures, and never stop improving." },
        { title: "Chapter 5", content: "As our story draws to a close, we realize that the real treasure was the journey itself and the lessons we learned." },
        { title: "Conclusion", content: "Thank you for reading! May your own journey be filled with adventure, growth, and endless possibilities. The End!" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 w-full">
            <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 max-w-4xl">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-amber-900">
                    3D Book - 12 Pages Demo
                </h1>
                <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">
                    Click the book to open • Use arrows to navigate through 12 pages
                </p>

                {/* Example 1: Default 12 Pages */}
                <div className="mb-12 sm:mb-16">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-amber-800">
                        Default 12-Page Book
                    </h2>
                    <Book3D />
                </div>

                {/* Example 2: Custom 12 Pages */}
                <div className="mb-12 sm:mb-16">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-amber-800">
                        Custom Content - 12 Pages
                    </h2>
                    <Book3D
                        title="Success Journey"
                        author="Demo Author"
                        coverColor="#2563eb"
                        frontCoverContent={
                            <div className="flex flex-col items-center justify-center h-full text-white p-4 sm:p-6">
                                <div className="text-4xl sm:text-6xl mb-4">📚</div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center">Success Journey</h3>
                                <p className="text-sm opacity-90 text-center">Demo Author</p>
                                <div className="w-16 sm:w-20 h-1 bg-white mt-4"></div>
                            </div>
                        }
                        pages={customPages}
                    />
                </div>

                {/* Features */}
                <div className="mt-16 bg-white/50 backdrop-blur rounded-xl p-6 sm:p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-amber-900">
                        ✨ Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">📖</span>
                            <p><strong>12 Pages</strong> - Multiple pages with realistic page-turning</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🎨</span>
                            <p><strong>Customizable</strong> - Custom content per page</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">📱</span>
                            <p><strong>Responsive</strong> - Works on all devices</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">⚡</span>
                            <p><strong>Smooth Animation</strong> - 1.2s page transitions</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🎯</span>
                            <p><strong>Pure CSS</strong> - No external libraries</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🖱️</span>
                            <p><strong>Easy Navigation</strong> - Arrow buttons & indicators</p>
                        </div>
                    </div>
                </div>

                {/* Usage Code */}
                <div className="mt-12 bg-gray-900 rounded-xl p-6 overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        💻 Usage Example
                    </h2>
                    <pre className="text-green-400 text-xs sm:text-sm">
{`import Book3D from "@/src/components/Book3D";

// Default 12 pages
<Book3D />

// Custom pages
<Book3D
    title="My Book"
    author="Author"
    coverColor="#2563eb"
    pages={[
        { title: "Chapter 1", content: "Content here..." },
        { title: "Chapter 2", content: "More content..." },
        // ... up to 12 pages
    ]}
/>`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
