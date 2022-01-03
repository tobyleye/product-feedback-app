import { createContext, useContext, useState } from "react";

export let FeedbackListContext = createContext(null);

export let FeedbackListContextProvider = (props) => {
  let [sortKey, setSortKey] = useState("+upvotes");
  let [selectedCategory, setSelectedCategory] = useState('all');

  let value = {
    sortKey,
    setSortKey,
    selectedCategory,
    setSelectedCategory,
  };

  return <FeedbackListContext.Provider {...props} value={value} />;
};

export let useFeedbackListContext = () => {
  let value = useContext(FeedbackListContext);
  if (value === undefined) {
    throw new Error("no FeedbackListContextProvider found");
  }
  return value;
};
