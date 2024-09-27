"use client";

import { CreateTaskDialog } from "@/components/dialogs/create-task-dialog";
import { SecondaryText } from "@/components/secondary-text";
import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTasksQuery } from "@/hooks/use-tasks-query";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const qParam = searchParams.get("q");

  const { isSignedIn } = useUser();

  const { data, isPending } = useTasksQuery();

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(qParam || "");
  }, [qParam]);

  const searchedData = useMemo(() => data ? data.filter((task) => {
    const lowerSearch = search.toLowerCase();
    const title = task.title.toLowerCase();

    return title.includes(lowerSearch) || lowerSearch.includes(title);
  }) : [], [data, search]);

  function handleSearchChange (value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("q", value);
    else params.delete("q");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      className="w-screen h-screen overflow-hidden p-2 flex flex-col items-center sm:justify-center gap-6 bg-cover bg-no-repeat bg-center"
    >
      <h1 className="text-lg font-bold drop-shadow mt-14 sm:mt-0">
        Tasky<span className="text-indigo-300">App</span>
      </h1>
      <Card className="w-full sm:w-[450px] flex gap-3">
        <Input
          placeholder="Search..."
          className="w-auto flex-grow"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {isSignedIn && (
          <CreateTaskDialog>
            <Button
              className="!w-9 p-0 h-9"
            >
              <FaPlus className="size-3" />
            </Button>
          </CreateTaskDialog>
        )}
      </Card>
      <Card className="w-full sm:w-[450px] flex flex-col flex-grow sm:flex-grow-0 sm:max-h-[512px] overflow-y-auto">
        <SignedOut>
          <SecondaryText>
            You have to <Button asChild variant="link" size="sm" className="p-0 text-xs"><SignInButton>sign in</SignInButton></Button> if you want to use application.
          </SecondaryText>
        </SignedOut>
        <SignedIn>
          {isPending ? (
            <SecondaryText>
              <FaSpinner className="animate-spin mr-2" /><span>We&apos;re loading data...</span>
            </SecondaryText>
          ): searchedData.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
            />
          ))}
          {searchedData.length === 0 && !isPending && (
            <SecondaryText>
              No result.
            </SecondaryText>
          )}
        </SignedIn>
      </Card>
      <Card className="w-full sm:w-[450px] flex justify-center">
        <footer className="text-xs font-medium text-white drop-shadow-sm text-center">
          &copy; TaskyApp 2024. Created by <Link href="https://yankes.net" target="_blank" className="text-indigo-300 font-semibold hover:underline">yankes</Link>
        </footer>
      </Card>
      <Button
        asChild
        variant="link"
        size="sm"
        className="hidden sm:block fixed bottom-0 right-0 mr-10 mb-8 opacity-50"
      >
        <Link href="/about">
          About
        </Link>
      </Button>
    </div>
  );
}
