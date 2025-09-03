import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
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
]

const Category = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-lg mx-auto my-20">
                <CarouselContent>
                    {parts.map((job, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button
                                onClick={() => searchJobHandler(job)}
                                variant="outline"
                                className="rounded-full"
                            >
                                {job}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default Category
