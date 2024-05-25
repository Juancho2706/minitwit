// components/PostList.js
"use client";
import { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  orderBy,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase/Firebaseinit";
import { useAuthState } from "react-firebase-hooks/auth";
import { handleLike } from "../components/handlelike";

const Timeline = ({newPost}) => {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [user] = useAuthState(auth);
  const latestDocRef = useRef(null);

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(latestDocRef)
      if (latestDocRef.current) {
        const newPostsData = postsData.filter(
          (post) => post.createdAt > latestDocRef.current.createdAt
        );
        if (newPostsData.length > 0) {
          setNewPosts(prev => [...newPostsData, ...prev]);
        }
      } else {
        setPosts(postsData);
      }

      if (postsData.length > 0) {
        latestDocRef.current = postsData[0];
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (newPost) {
      setPosts(prevPosts => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  const handleShowNewPosts = () => {
    setPosts((prevPosts) => [...newPosts, ...prevPosts]);
    setNewPosts([]);
  };

  const handleLikeClick = async (postId, likes) => {
    const userId = user.uid;
    const liked = likes.includes(userId);
    await handleLike(postId, userId, liked);

    // Update the local state to reflect the change
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: liked
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId],
            }
          : post
      )
    );
  };

  return (
    <div>
      {newPosts.length > 0 && (
        <button onClick={handleShowNewPosts}>
          Show {newPosts.length} new post{newPosts.length > 1 ? "s" : ""}
        </button>
      )}
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.user}</h3>
          <p>{post.content}</p>
          <div>
            <span>{post.likes.length} Likes</span>
            {user && (
              <button onClick={() => handleLikeClick(post.id, post.likes)}>
                {post.likes.includes(user.uid) ? "Unlike" : "Like"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
