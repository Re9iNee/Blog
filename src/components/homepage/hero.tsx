"use client";

import useDynamicHeight from "@/hooks/useDynamicHeight";
import React from "react";
import { Button } from "../ui/button";

function HeroSection() {
  useDynamicHeight("hero-container", "header");
  return (
    <section
      id='hero-container'
      className='bg-yellow-500 px-4 border-b border-black min-h-screen'
    >
      <h1 className='py-16 text-6xl text-black font-medium'>Stay curious.</h1>
      <h3 className='text-2xl text-black py-4'>
        Discover stories, thinking, and expertise from writers on any topic.
      </h3>
      <Button
        variant={"outline"}
        className='rounded-3xl font-light text-xl px-8 my-8'
      >
        Start reading
      </Button>
    </section>
  );
}

export default HeroSection;
