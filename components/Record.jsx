"use client"
import React from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam'
import { Button } from './ui/button';
import { Mic } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StopCircle } from 'lucide-react';
import { chatSession } from '@/utils/model';
import { toast } from 'sonner';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from 'moment';
import { UserAnswer } from '@/utils/schema';

const Record = ({InterviewQuestion,QuestionIndex,interviewData}) => {
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();  
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
      });

      const StartStopRecording = async () => {
        if (isRecording) {
            setLoading(true);
            stopSpeechToText();
            // if (userAnswer?.length < 10) {
            //     setLoading(false);
            //     toast("Error while saving your answer, please record again");
            //     return;
            // }


        } else {
          startSpeechToText();
        }
      };




      const UpdateUserAnswer = async () => {
        const feedbackPrompt = `Question: ${InterviewQuestion[QuestionIndex]?.question}, User Answer: ${userAnswer}, Depends on question and user answer for given interview question please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

            const result = await chatSession.sendMessage(feedbackPrompt);
            const JsonRes = await result.response.text();
            const cleanedJsonRes = JsonRes.replace("```json", "").replace("```", "");
            console.log(cleanedJsonRes);
            const JsonFeedback = JSON.parse(cleanedJsonRes);

            // Debug logs
            console.log("interViewData:", interviewData);
            console.log("interViewData.mockId:", interviewData?.mockId);

            if (interviewData?.mockId) {
                const resp = await db.insert(UserAnswer).values({
                    mockIdRef: interviewData.mockId,
                    question: InterviewQuestion[QuestionIndex]?.question,
                    correctAns: InterviewQuestion[QuestionIndex]?.answer,
                    userAns: userAnswer,
                    feedback: JsonFeedback?.feedback,
                    rating: JsonFeedback?.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("DD-MM-YYYY"),
                });

                if (resp) {
                    toast('User answer recorded successfully');
                    setUserAnswer('')
                    setResults([])
                }
                setResults([])
                setLoading(false);
            }

      }


      useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
          UpdateUserAnswer();
        }
      }, [userAnswer]);

      useEffect(() => {
        results.map((result)=>{
            setUserAnswer(prevAns=>prevAns + result?.transcript);
        });
      }, [results]);


  return (
    <div className="flex justify-cente items-center flex-col">
    <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        {/* <Image
          src={"/PrepPal.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
          priority
        /> */}
        <Webcam
          style={{ height: 300, width: "100%", zIndex: 10 }}
          mirrored={true}
        />
      </div>
      <Button
      disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
      </div>
  )
}

export default Record