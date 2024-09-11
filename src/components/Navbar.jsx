import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import SignoutButton from "./signoutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex h-[70px] z-10  flex-row sticky px-4 md:px-8 top-0 border-b border-dashed border-white bg-neutral-900 w-full text-neutral-100 backdrop-blur-sm  items-center justify-between ">
      {/* Logo */}
      <Link href={"/"} className=" flex gap-2 items-center">
        <Image src={"/logo-nobg.png"} width={100} height={0} className="w-10 h-10" alt="lognobg" />
        <div className="text-xl">NEXAURA</div>
      </Link>
      {/* Nav */}

      <div className="gap-10 hidden lg:flex ">
        <Link href={"/howto"}>How its Works</Link>
        <Link href={"/Blog"}>Membership</Link>
        <Link href={"/roadmap"}>Write</Link>
        <Link href={"/roadmap"}>About us</Link>
      </div>
      {/* download */}
      {session && session.user && session.user.name ? (
        <Link
          href={"./profile"}
          className="lg:flex hidden items-center gap-2 bg-teal-600 px-3 py-2 text-neutral-900 rounded-md"
        >
          <Image
            src={session.user.image}
            width={26}
            height={26}
            className="rounded-full border"
          />
          {session.user.name}
        </Link>
      ) : (
        <div className="flex gap-4 items-center">
          <Link href={"/blog"} className="hidden lg:flex">
            Sign in
          </Link>
          <div className="px-[16px] py-[9px] bg-teal-600 text-sm  gap-2 text-neutral-900  items-center hidden lg:flex rounded-md">
            <Link href={"./singup"} className="flex items-center gap-2">
              Get Started
              <GoArrowUpRight className="text-xl" />
            </Link>
          </div>
        </div>
      )}
      {/* Mobile Responsive */}
      <div className="lg:hidden flex">
        {/* Menu Button */}
        <input type="checkbox" name="click" id="click" className="hidden" />
        <label htmlFor="click">
          <div className="flex lg:hidden  flex-col gap-1">
            <div className="w-6 h-1 bg-slate-100  " />
            <div className="w-6 h-1 bg-slate-100  " />
            <div className="w-6 h-1 bg-slate-100  " />
          </div>
        </label>
        {/* Mobile nav */}
        <div className="fixed h-[calc(100vh-80px)] menu left-0 ease-in-out duration-700 bg-neutral-800 text-neutral-100 w-full  flex flex-col justify-between top-[70px]">
          <div className="flex flex-col w-full ">
            <Link
              href={"/howto"}
              className="border-b border-dashed px-10 py-6 w-full"
            >
              How its Works
            </Link>
            <Link
              href={"/roadmap"}
              className="border-b border-dashed px-10 py-6 w-full"
            >
              Write
            </Link>
            <Link
              href={"/Blog"}
              className="border-b border-dashed px-10 py-6 w-full"
            >
              Membership
            </Link>
            <Link
              href={"/roadmap"}
              className="border-b border-dashed px-10 py-6 w-full"
            >
              About us
            </Link>
           
          </div>
          <div className="border-b border-dashed w-full ">
              {session && session.user && session.user.name ? (
                <div>
                  <Link
                    href={"/Login"}
                    className="flex gap-2 justify-center rounded-md px-4 m-8 py-3 bg-teal-500 items-center text-lg "
                  >
                    <Image
                      src={session.user.image}
                      width={26}
                      height={26}
                      alt="profile"
                      className="rounded-full border"
                    />
                    {session.user.name}
                  </Link>
                  <SignoutButton />
                </div>
              ) : (
                <div className="">
                  <Link
                    href={"/Login"}
                    className="flex gap-2 justify-center rounded-md px-4 m-8 py-3 bg-teal-500 items-center text-lg "
                  >
                    Get Started
                    <GoArrowUpRight className="text-xl" />
                  </Link>
                  <Link
                    href={"/Login"}
                    className="flex gap-2 justify-center rounded-md px-4 m-8 py-3 bg-neutral-300 text-neutral-800 border items-center text-lg "
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
