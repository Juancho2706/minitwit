// components/AddPost.js
"use client"
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/Firebaseinit";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Creadorpost = ({onNewPost}) => {
  const [user] = useAuthState(auth);
  const [content, setContent] = useState("");

  const handleAddPost = async () => {
    if (content.trim()) {
      const newPost = {
        user: user.displayName,
        content: content,
        createdAt: serverTimestamp(),
        likes: [],
      };
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      newPost.id = docRef.id; // Set the id of the new post

      onNewPost(newPost); // Notify the parent component about the new post
      setContent(''); // Clear the input field after posting
    }
  };

  if (!user) return null;

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={handleAddPost}>Post</button>
    </div>
  );
};

export default Creadorpost;

