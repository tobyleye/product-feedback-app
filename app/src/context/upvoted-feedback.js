import { createContext, useEffect, useState, useMemo, useContext } from "react";
import { useCurrentUser } from "./currentuser";

const UpvotedFeedback = createContext(null);

export function UpvotedFeedbackProvider(props) {
  const [upvoted, setUpvoted] = useState([]);

  let [currentUser] = useCurrentUser();

  useEffect(() => {
    let loadCurrentUserUpvotedFeedbacks = () => {
      if (currentUser) {
        let upvotedFeedbacks = JSON.parse(
          localStorage.getItem(currentUser.id) || "[]"
        );
        setUpvoted(upvotedFeedbacks);
      }
      else{
        setUpvoted([])
      }
    };
    loadCurrentUserUpvotedFeedbacks();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && upvoted.length > 0) {
      localStorage.setItem(currentUser.id, JSON.stringify(upvoted));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upvoted]);

  let value = useMemo(() => [upvoted, setUpvoted], [upvoted, setUpvoted]);

  return <UpvotedFeedback.Provider {...props} value={value} />;
}

export function useUpvoted() {
  return useContext(UpvotedFeedback);
}
