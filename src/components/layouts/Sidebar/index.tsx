"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { FaHome, FaBuilding, FaUser, FaCalendar } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosDocument, IoMdLogOut } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Sidebar: FC = ({}) => {
  const router = useRouter();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => router.push("/")}
            >
              <FaHome />
              Home
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
            >
              <FiMessageSquare />
              Messages
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
            >
              <FaBuilding />
              Company Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
            >
              <FaUser />
              All Applicants
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => router.push("/job-listings")}
            >
              <IoIosDocument />
              Job Listings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
            >
              <FaCalendar />
              My Schedule
            </Button>
          </div>
        </div>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2>Settings</h2>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => router.push("/settings")}
            >
              <FaGear />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full text-red-500 hover:bg-red-200 hover:text-red-500 justify-start rounded-none"
              onClick={() => signOut()}
            >
              <IoMdLogOut />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
