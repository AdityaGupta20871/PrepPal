# PrepPal

PrepPal is a web application designed to help users prepare for interviews by providing a platform to practice and receive feedback on their responses.

## Features

- Record answers to interview questions using voice and video.
- Receive feedback on your answers to improve your performance.
- View and manage previous mock interviews.

## Technologies Used

- Next.js
- React
- Clerk for authentication
- Drizzle ORM
- PostgreSQL
- Vercel for deployment

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- PostgreSQL database set up and accessible.
- Clerk account for authentication setup.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/PrepPal.git
   cd PrepPal

2.  ## Install Dependencies
    ```bash
    npm intall


3. ## Set up Environment Variables

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_DRIZZLE_DATABASE_URL=
NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_INTERVIEW_QUESTION=5
NEXT_PUBLIC_QUESTION_NOTE='To enhance your interview practice, this feature allows you to record your responses using voice and video. Simply click on the record button to start capturing your answer to each question. Ensure your microphone and camera permissions are enabled for accurate recording. '
