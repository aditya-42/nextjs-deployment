import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Use Next.js router instead

const HeroSection: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const router = useRouter(); // Use Next.js router

    const searchJobHandler = (): void => {
        // Implement redux logic (pending)
        router.push('/browse'); // Navigate to the browse page using Next.js router
    };

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br /> Get Your{' '}
                    <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
                
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type='text'
                        placeholder='Find your dream jobs'
                        value={query}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]'>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
