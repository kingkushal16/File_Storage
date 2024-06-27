'use client'

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignInButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Home() {

  const session = useSession();

  const createFile = useMutation(api.files.createFile);

  const Files = useQuery(api.files.getFiles);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      {Files?.map((file => {
        return <div key={file._id}>{file.name}</div>
      }))}

      <Button onClick={()=>{
        createFile({name:"hello World",})
      }}>
        clickMe
      </Button>
    </main>
  );
}
