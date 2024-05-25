// components/Navbar.js
"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleprovider } from "../firebase/Firebaseinit";
import { signInWithPopup, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const handleSignIn = () => {
    signInWithPopup(auth, googleprovider);
  };

  const handleSignOut = () => {
    signOut(auth);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <nav>
      <h1>My App</h1>
      <div>
        {user ? (
          <>
            <img src={user.photoURL} alt="Profile" width="30" height="30" />
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={handleSignIn}>Sign In with Google</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
