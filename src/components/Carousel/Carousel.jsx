import React, { useEffect, useState } from "react";

const slides = [
    {
        image: "https://picsum.photos/id/1015/800/400",
        title: "Build Fast UI",
        description: "Reusable components with clean architecture"
    },
    {
        image: "https://picsum.photos/id/1016/800/400",
        title: "Modern Design",
        description: "Professional UI patterns used in real apps"
    },
    {
        image: "https://picsum.photos/id/1018/800/400",
        title: "Scalable Code",
        description: "Optimized, readable and interview-ready code"
    }
];

export const Carousel = ({ autoSlide = true, interval = 3000 }) => {
    const [current, setCurrent] = useState(0);

    const total = slides.length;


    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % total);

    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + total) % total);
    };

    useEffect(() => {
        if (!autoSlide) return;

        const timer = setInterval(nextSlide, interval);
        return () => clearInterval(timer);
    }, [current, autoSlide, interval]);

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg">

            {/* Image */}
            <img
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-[300px] object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-semibold">
                    {slides[current].title}
                </h3>
                <p className="text-sm opacity-90">
                    {slides[current].description}
                </p>
            </div>

            {/* Prev Button */}
            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-9 h-9 rounded-full"
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-9 h-9 rounded-full"
            >
                ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2.5 h-2.5 rounded-full ${current === index ? "bg-white" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
