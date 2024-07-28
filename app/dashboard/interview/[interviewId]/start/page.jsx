"use client"
import { PrepSchema } from '@/utils/schema';
import { useState } from 'react';
import React from 'react';
import { useEffect } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Questions from '@/components/Questions';
import Record from '@/components/Record';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const page = ({ params }) => {
  const [InterviewData, setInterviewData] = useState();
  const [InterviewQuestion, setInterviewQuestion] = useState();
  const [QuestionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []); 

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(PrepSchema)
      .where(eq(PrepSchema.mockId, params.interviewId));
    const jsonRes = JSON.parse(result[0].jsonMockResp);
    setInterviewQuestion(jsonRes);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Questions InterviewQuestion={InterviewQuestion} QuestionIndex={QuestionIndex} />
        <Record
          InterviewQuestion={InterviewQuestion}
          QuestionIndex={QuestionIndex}
          InterviewData={InterviewData}
          key={QuestionIndex} // Added key prop
        />
      </div>
      <div className="flex justify-end gap-6">
        {QuestionIndex > 0 && (
          <Button onClick={() => setQuestionIndex(QuestionIndex - 1)}>Previous Question</Button>
        )}
        {QuestionIndex != InterviewQuestion?.length - 1 && (
          <Button onClick={() => setQuestionIndex(QuestionIndex + 1)}>Next Question</Button>
        )}
        {QuestionIndex == InterviewQuestion?.length - 1 && (
          <Link href={'/dashboard/interview/' + InterviewData?.mockId + '/result'}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default page;
