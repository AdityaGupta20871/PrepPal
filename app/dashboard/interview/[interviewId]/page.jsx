"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/utils/db';
import { PrepSchema } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam'; // Import react-webcam
import { Button } from '@/components/ui/button';
import { WebcamIcon } from 'lucide-react';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';

const InterviewPage = ({params}) => {
    const [interviewData, setInterviewData] = useState();
    const [startWebcam, setStartWebcam] = useState(false);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        const result = await db
          .select()
          .from(PrepSchema)
          .where(eq(PrepSchema.mockId, params.interviewId));
          console.log(result)
        setInterviewData(result[0]);
      };

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'>Let's get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            <div className="flex flex-col my-5 gap-5">

            <div className="flex flex-col p-5  rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/tech Stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <span>Information</span>
            </h2>
            {/* <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2> */}
          </div>
        </div>

        <div>
            {startWebcam ? (
                <Webcam
                    audio={true} // Enable audio if needed
                    style={{ height: 300, width: 300 }}
                />
            ) : (
                <>
                    <WebcamIcon className="h-72 my-7 border rounded-lg w-full p-20 bg-secondary" />
                    <Button onClick={() => setStartWebcam(true)}>Start webcam and microphone</Button>
                </>
            )}
        </div>
        </div>
        <div className="flex justify-end items-end">
        <Link>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
    );
};

export default InterviewPage;
