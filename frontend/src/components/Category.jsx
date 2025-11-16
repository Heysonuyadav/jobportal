import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
    import { setSearchedQuery } from '../redux/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const parts = [
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Data Science",
    "Python Developer",
    "Web Developer"
];

const Category = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="w-full px-4 mt-16 mb-24">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
                Popular Job Categories
            </h2>

            <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                    {parts.map((job, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center"
                        >
                            <Button
                                onClick={() => searchJobHandler(job)}
                                variant="outline"
                                className="rounded-full px-4 py-2 text-sm md:text-base hover:bg-gray-100"
                            >
                                {job}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    );
};

export default Category;
