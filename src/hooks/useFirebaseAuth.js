import { useEffect, useState } from "react";
import firebase from "config/firebase";

const auth = firebase.auth();

function useFirebaseAuth() {
  const [user, setUser] = useState();
  useEffect(
    () => {
      const removeAuthObserver = auth.onAuthStateChanged(setUser);
      return () => removeAuthObserver();
    },
    [auth]
  );
  return user;
}

export { useFirebaseAuth as default };
