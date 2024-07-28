"use client";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { PrepSchema } from '@/utils/schema';
import { db } from "@/utils/db";
import Card from "./Card";

const List = () => {
    const { user } = useUser();
    const [InterviewList, setInterviewList] = useState([]);

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
        try {
            const result = await db
                .select()
                .from(PrepSchema)
                .where(
                    eq(PrepSchema.createdBy, user?.primaryEmailAddress?.emailAddress)
                )
                .orderBy(desc(PrepSchema.id));

            console.log("GetInterviewList:", result); // Fixed logging
            setInterviewList(result);
        } catch (error) {
            console.error("Error fetching interview list:", error);
        }
    };

    return (
        <div>
            <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
                {InterviewList && InterviewList.map((interview, index) => (
                    <Card interview={interview} key={index} />
                ))}
            </div>
        </div>
    );
};

export default List;
