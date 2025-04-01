import { useEffect, useState } from 'react';

// Define an interface for the job objects
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

const useGetAllJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);  // State to hold the jobs
  const [searchedQuery, setSearchedQuery] = useState('');  // Search query state

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Sample jobs data
        const sampleJobs: Job[] = [
          { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'Remote', description: 'Develop software applications.' },
          { id: 2, title: 'Product Manager', company: 'Innovate Ltd.', location: 'New York, NY', description: 'Lead product development initiatives.' },
          { id: 3, title: 'UX Designer', company: 'DesignWorks', location: 'San Francisco, CA', description: 'Design intuitive user interfaces.' },
          { id: 4, title: 'Data Scientist', company: 'DataCo', location: 'Chicago, IL', description: 'Analyze and interpret complex data sets.' },
          { id: 5, title: 'Marketing Specialist', company: 'BrandUp', location: 'Austin, TX', description: 'Develop and execute marketing campaigns.' }
        ];

        // Filter jobs based on searched query
        const filteredJobs = sampleJobs.filter(job =>
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchedQuery.toLowerCase())
        );

        // Set jobs in state
        setJobs(filteredJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery]);

  return { jobs, searchedQuery, setSearchedQuery };
};

export default useGetAllJobs;