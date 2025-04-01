import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'; // Use Next.js router instead

// Placeholder for Redux - functionality pending
// import { useDispatch } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';

const category: string[] = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel: React.FC = () => {
    const router = useRouter(); // Use Next.js router

    // Placeholder for Redux functionality
    // const dispatch = useDispatch();

    const searchJobHandler = (query: string): void => {
        // Placeholder for Redux dispatch
        // dispatch(setSearchedQuery(query));

        router.push(`/browse?query=${encodeURIComponent(query)}`); // Use router.push for navigation
    };

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
