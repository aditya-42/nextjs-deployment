Job Portal



This is a Job Portal application designed for recruiters and job applicants. The portal allows recruiters to post jobs, manage applicants, and verify or delete companies. Applicants can apply for jobs, view job details, and track their application status.

Features
For Admin:

Manage job applicants (view, delete).

Manage registered companies (verify, delete).

View detailed information about applicants and companies.

Toggle between the applicant and company views.

For Recruiters:

View applicants' details and applications.

Verify and manage companies.

Delete companies from the portal.

For Job Applicants:

View job opportunities.

Apply for jobs and track application status.

Technologies Used
Frontend:

React.js

Next.js

Tailwind CSS

Axios for API requests

Backend:

Node.js (Express.js)

MongoDB (or MySQL depending on your setup)

REST API

Authentication:

JWT or Session-based authentication for the admin and recruiters.

Deployment:

Heroku (for deployment)

Nginx (for reverse proxy and app server management)

Installation
1. Clone the repository
Clone this repository to your local machine using:


git clone
(https://github.com/2025-Winter-ITE-5425-0NB/project-phase-1-techtitans/new/final_version_v)

2. Install dependencies
Navigate into the project folder and install the necessary dependencies:


cd job-portal
npm install
3. Setup Environment Variables
You need to create an .env file in the root of the project to store your sensitive data such as API URLs, database credentials, etc.

Example .env:
NEXT_PUBLIC_API_URL=http://localhost:5000
DB_URL=mongodb://localhost:27017/job_portal
SECRET_KEY=your_secret_key_here
JWT_SECRET=your_jwt_secret_key
Replace DB_URL with the connection URL of your MongoDB or MySQL database.

Replace SECRET_KEY and JWT_SECRET with your own secure values.

4. Run the Development Server
Once everything is set up, you can run the application locally using:


npm run dev
This will start the Next.js app on http://localhost:3000.

5. API and Backend
For the backend, you should start the server separately. If you're using Express.js, navigate to the backend folder (if it's separate) and run:


npm run start
Or if it's within the same project, simply run the server from the root:


node server.js


Usage
Admin
The admin dashboard allows the admin to view and manage applicants and companies.

Admin can verify or delete companies and view applicant details.

Recruiters
Recruiters can view the details of applicants and manage company details.

Admin must verify companies before they can access the portal.

Applicants
Applicants can search for jobs, apply, and track their application status.
