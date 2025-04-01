
import { Suspense } from 'react';
import ApplicationForm from '@/app/applicant/application-form/ApplicationForm';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading application form...</div>}>
      <ApplicationForm />
    </Suspense>
  );
}


