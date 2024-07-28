import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
        <div className="relative z-10 text-center p-6 flex flex-col justify-center items-center gap-4">
        <Image src="/PrepPal.png" alt="Feature Image" width={300} height={300} className=" rounded-lg shadow-lg"/>
          <h1 className="text-5xl font-bold mb-4 shadow-lg">Welcome to PrepPal</h1>
          <p className="text-lg mb-8">Revolutionize your interview preparation with personalized AI-driven mock interviews.</p>
         <Link href='/dashboard'><Button className="bg-yellow-400 p-5 text-gray-800 hover:bg-yellow-500 transition-all">Get Started <ArrowRight /></Button></Link> 
        </div>
      </section>
      <footer className="bg-gray-900 text-gray-400 py-4 text-center">
        <p>&copy; 2024 PrepPal. All rights reserved.</p>
      </footer>
    </div>
  );
}
