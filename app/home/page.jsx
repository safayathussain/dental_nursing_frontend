"use client"
import HeroSection from '@/components/pageComponents/home/HeroSection'
import HomePageQuestions from '@/components/pageComponents/home/HomePageQuestions'
import { FetchApi } from '@/utils/FetchApi';
import React, { useEffect } from 'react'

const Page = () => {
   useEffect(() => {
    const loadData = async () => {
      try {
        await FetchApi({ url: "/auth/test", method: 'post' });
        // You can add success handling here
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle the error (e.g., show a notification, update state, etc.)
      }
    };
    loadData()
  }, []);
  return (
    <div>
      <HeroSection/>
      <HomePageQuestions/>
    </div>
  )
}

export default Page