import React, { useEffect, createContext, useReducer } from "react";
import firebase from "../lib/firebase";

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  login: () => {},
  logout: () => {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATE_CHANGED": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const AuthContext = createContext({
  ...initialAuthState,
  method: "FirebaseAuth",
  signInWithGoogle: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithFacebook: () => Promise.resolve(),
  
  logout: () => Promise.resolve(),
});

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const signInWithEmailAndPassword = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const createUserWithEmailAndPassword = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    const facebook = firebase
      .auth()
      .signInWithPopup(provider)
      // .then(function (result) {
      //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //   var token = result.credential.accessToken;
      //   // The signed-in user info.
      //   var user = result.user;
      //   // ...
      // })
      // .catch(function (error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // The email of the user's account used.
      //   var email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
      //   // ...
      // });
      return facebook
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Here you should extract the complete user profile to make it available in your entire app.
        // The auth state only provides basic information.

        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              avatar: user.photoURL,
              email: user.email,
              name: user.displayName || user.email,
              tier: "Premium",
            },
          },
        });
      } else {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "FirebaseAuth",
        signInWithGoogle,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signInWithFacebook,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
