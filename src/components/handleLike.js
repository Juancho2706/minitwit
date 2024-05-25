// utils/handleLike.js
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/Firebaseinit";

export const handleLike = async (postId, userId, liked) => {
  const postRef = doc(db, "posts", postId);
  
  if (liked) {
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });
  }
};
