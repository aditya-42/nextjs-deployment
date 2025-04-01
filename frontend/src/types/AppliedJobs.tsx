export type AppliedJobs = {
    id: string;
    date:string;
    role:string;
    company:string;
    status:'PENDING' | 'APPROVED' | 'REJECTED'
}