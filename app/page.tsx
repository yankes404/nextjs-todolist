"use client";

import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div
      className="w-screen h-screen overflow-hidden p-2 flex flex-col items-center sm:justify-center gap-6 bg-cover bg-no-repeat bg-center"
    >
      <h1 className="text-lg font-bold drop-shadow mt-14 sm:mt-0">
        Tasky<span className="text-indigo-300">App</span>
      </h1>
      <Card className="w-full sm:w-[450px] flex gap-2">
        <Input
          placeholder="Search..."
          className="w-auto flex-grow"
        />
        {isSignedIn && (
          <Button
            className="!w-9 p-0 h-9"
          >
            <FaPlus className="size-3" />
          </Button>
        )}
      </Card>
      <Card className="w-full sm:w-[450px] flex flex-col flex-grow sm:flex-grow-0 sm:max-h-[512px] overflow-y-auto">
        {/* <p className="text-xs font-semibold text-neutral-400 text-center">
          No data.
        </p> */}
        {Array.from({ length: 12 }).map((_, index) => (
          <TaskCard
            key={index}
            id={index.toString()}
            title={"Walking the dog " + index }
            description="At 8 PM go with Carmel outside to the park!"
            status="completed"
            createdAt={new Date(2024, 8, 14, 16, 12)}
          />
        ))}
      </Card>
      <Card className="w-full sm:w-[450px] flex justify-center">
        <footer className="text-xs font-medium text-white drop-shadow-sm text-center">
          &copy; TaskyApp 2024. Created by <Link href="https://yankes.net" target="_blank" className="text-indigo-300 font-semibold hover:underline">yankes</Link>
        </footer>
      </Card>
    </div>
  );
}
