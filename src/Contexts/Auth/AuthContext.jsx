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
  const [loading, setLoading] = useState(true);

  // create a user with email and password
  const handleCreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // handle log in user
  const handleLogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // handle reset password
  const handleResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // handle google sign in
  const handleGoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // handle facebook sign in
  const handleFacebookSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  // handle github sign in
  const handleGithubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // handleUpdateUser
  const handleUpdateUserInfo = () => {
    setLoading(true);
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
    handleCreateUser,
    handleLogIn,
    handleGoogleSignIn,
    handleFacebookSignIn,
    handleGithubSignIn,
    user,
    loading,
    handleResetPassword,
    handleDeleteUser,
    handleSignOut,
    handleUpdateUserInfo,
  };

  return (
    <Authentication.Provider value={authInfo}>
      {children}
    </Authentication.Provider>
  );
};

export default AuthContext;
