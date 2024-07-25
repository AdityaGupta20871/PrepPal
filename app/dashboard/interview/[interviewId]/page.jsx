"use client"
import React from 'react'
import { useEffect } from 'react';
import { db } from '@/utils/db';
import { PrepSchema } from '@/utils/schema';
import { eq } from 'drizzle-orm';

const InterviewPage = (params) => {
    useEffect(() => {
        GetInterviewDetails()
      }, []);
      const GetInterviewDetails = async () => {
        const result = await db
          .select()
          .from(PrepSchema)
          .where(eq(PrepSchema.mockId, params.interviewId));
        console.log(result)
      };
  return (
    <div>Interviewpage</div>
  )
}

export default InterviewPage