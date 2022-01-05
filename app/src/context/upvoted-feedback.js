import { createContext, useEffect, useState, useMemo, useContext } from "react";
import { useCurrentUser } from "./currentuser";

const UpvotedFeedback = createContext(null);

let useStorageKey = () => {
  const currentUser = useCurrentUser();
  return currentUser?.id || "guest";
};

export function UpvotedFeedbackProvider(props) {
  const [upvoted, setUpvoted] = useState([]);
  let storageKey = useStorageKey();

  useEffect(() => {
    setUpvoted(JSON.parse(localStorage.getItem(storageKey) || "[]"));
  }, [storageKey]);

  useEffect(() => {
    if (upvoted && upvoted.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(upvoted));
    }
  }, [storageKey, upvoted]);

  let value = useMemo(() => [upvoted, setUpvoted], [upvoted, setUpvoted]);

  return <UpvotedFeedback.Provider {...props} value={value} />;
}

export function useUpvoted() {
  return useContext(UpvotedFeedback);
}
