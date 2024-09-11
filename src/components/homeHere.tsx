import React from "react";
import Editor from "./Richedior/Editor";

export default function HomeHere() {
  return (
    <div className=" w-full">
      <div className="lg:w-[80vw]  h-[calc(100vh-80px)]  relative  flex flex-col items-center justify-center">
        <div className="xl:text-[18vh] text-[6vh] md:text-[11vh] px-4 lg:text-[14vh] uppercase leading-none ">
          Blogging IS <br />{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent">
            The Art of
          </span>
          <br /> Self-Expression
        </div>
        <div className="absolute  bottom-0 right-0">
          <div>
            <h1 className="font-extralight w-4/5 md:w-full px-4 lg:px-0 ">
              Increased Exposure:{" "}
              <b className="font-bold">61% of online consumers </b> in the US{" "}
              <br /> have made a <b className="font-bold">purchase</b> based on
              a blog post
            </h1>
          </div>
        </div>
      </div>
      <div className=" w-full h-max flex px-4  md:px-8 my-10 items-center">
        <div className="h-full hidden md:flex md:px-16 items-center justify-center w-1/6 flex-col">
          <div className="p-3 bg-cyan-300 h-full rounded-full" />
          <div className="w-1 h-screen border-l border-dashed" />
        </div>
        <div className="md:w-5/6 w-full flex flex-col ">
          <Editor />
        </div>
      </div>
    </div>
  );
}
