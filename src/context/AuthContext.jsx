import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [userExistsError, setUserExistsError] = useState(false);
  const [pwLengthError, setPwLengthError] = useState(false)
  const [pwError, setPwError] = useState("")
  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return setDoc(doc(db, "users", email), {
        watchList: [],
      });
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setUserExistsError(true);
      } else if (password.length < 6) {
        setPwLengthError(true)
      }else{
        console.log(error)
      }
    }
  };

  const signIn = async(email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        setPwError(error.message);
        console.log(error.message)
    } 
   
  };

  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        signUp,
        signIn,
        logOut,
        user,
        userExistsError,
        setUserExistsError,
        pwLengthError,
        setPwLengthError,
        pwError,
        setPwError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
