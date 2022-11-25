import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";

export const Authentication = createContext("");

const auth = getAuth(app);

// ----------------providers for auth started here  -------------------
// google auth provider
const googleProvider = new GoogleAuthProvider();

// facebook auth provider
const facebookProvider = new FacebookAuthProvider();

// github auth provider
const githubProvider = new GithubAuthProvider();

// ----------------providers for auth finished here  -------------------

// ------------main auth funtions------------
const AuthContext = ({ children }) => {
  // user state
  const [user, setUser] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // create a user with email and password
  const handleCreateUer = (email, password) => {
    loading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // handle log in user
  const handleLogIn = (email, password) => {
    loading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // handle reset password
  const handleResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // handle google sign in
  const handleGoogleSignIn = () => {
    loading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // handle facebook sign in
  const handleFacebookSignIn = () => {
    loading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  // handle github sign in
  const handleGithubSignIn = () => {
    loading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // handleUpdateUser
  const handleUpdateUserInfo = () => {
    return updateProfile(user);
  };

  // handle sign out
  const handleSignOut = () => {
    return signOut(auth);
  };

  // delete user
  const handleDeleteUser = () => {
    return deleteUser(user);
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const authInfo = {
    handleCreateUer,
    handleLogIn,
    handleGoogleSignIn,
    handleFacebookSignIn,
    handleGithubSignIn,
    user,
    loading,
    handleResetPassword,
    handleDeleteUser,
  };

  return (
    <Authentication.Provider value={authInfo}>
      {children}
    </Authentication.Provider>
  );
};

export default AuthContext;
