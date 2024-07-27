"use client"
import React from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam'
import { Button } from './ui/button';
import { Mic } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

const Record = ({InterviewQuestion,QuestionIndex}) => {
    const [userAnswer, setUserAnswer] = useState("");
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
          stopSpeechToText();
          if (userAnswer?.length < 10) {
            // setLoading(false)
            toast("Error while saving your answer,please record again");
            return;
          }
        } else {
          startSpeechToText();
        }
      };


      useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
          UpdateUserAnswer();
        }
      }, [userAnswer]);


  return (
    <div className="flex justify-cente items-center flex-col">
    <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        {/* <Image
          src={"/webcam.png"}
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
      <Button onClick={() => console.log("------", userAnswer)}>
        Show User Answer
      </Button>
      </div>
  )
}

export default Record