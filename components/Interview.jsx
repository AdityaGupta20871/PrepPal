"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/model";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { PrepSchema } from "@/utils/schema";
import { db } from "@/utils/db";
import { v4 as uuid } from 'uuid';
import moment from "moment";
import { useRouter } from "next/navigation";


function Interview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading,setLoading] = useState(false)
  const [jsonResponse, setJsonResponse] = useState([]);
  const {user} = useUser();  
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
  {
    "question": "Your question here",
    "answer": "Your answer here"
  }`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      console.log("🚀 ~ file: AddNewInterview.jsx:41 ~ onSubmit ~ responseText:", responseText)
      const jsonMatch = responseText.match(/\[.*?\]/s);
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in the response");
      }
  
      const jsonResponsePart = jsonMatch[0];
      console.log("🚀 ~ file: AddNewInterview.jsx:43 ~ onSubmit ~ jsonResponsePart:", jsonResponsePart);
  
      if (jsonResponsePart) {
        const mockResponse = JSON.parse(jsonResponsePart.trim());
        console.log("🚀 ~ file: AddNewInterview.jsx:45 ~ onSubmit ~ mockResponse:", mockResponse)
        setJsonResponse(mockResponse);
        const jsonString = JSON.stringify(mockResponse);
        const res = await db.insert(PrepSchema)
          .values({
            mockId: uuid(),
            jsonMockResp: jsonString,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY'),
          }).returning({ mockId: PrepSchema.mockId });
          setLoading(false);
          router.push(`dashboard/interview/${res[0]?.mockId}`);
          
      } else {
        console.error("Error: Unable to extract JSON response");
      }
    } catch (error) {
      console.error("Error fetching interview questions:", error);
    } finally {
      setLoading(false);
      
    }
  };


  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h1 className="font-bold text-lg text-center">+ Add New</h1>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more about your job Interviewing
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <div>
                <p>
                  Add details about your job position/role, job description, and
                  years of experience
                </p>
                <div className="mt-7 my-3">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Job Description/Tech Stack (In short)</label>
                  <Textarea
                    placeholder="Ex. React, Angular, NodeJs, MySql etc"
                    required
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Years of Experience</label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    min="1"
                    max="70"
                    required
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                    {loading?
                    <>
                        <LoaderCircle />'Generating from AI'</>
                        :'Start'
                         }
                  Submit
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Interview;
