"use client"
import { useState } from "react";
import Creadorpost from "@/components/Creadorpost";
import Timeline from "@/components/Timeline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Firebaseinit";

export default function Home() {
  const [user] = useAuthState(auth);
  const [newPost, setNewPost] = useState(null);

  const handleNewPost = (newPost) => {
    setNewPost(newPost);
  };

  return (
    <div>
      {user ? <Creadorpost onNewPost={handleNewPost} /> : <p>Please log in to create a new post.</p>}

      <Timeline newPost={newPost} />
    </div>
  );
}
