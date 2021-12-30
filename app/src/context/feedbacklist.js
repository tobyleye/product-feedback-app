import { createContext, useContext, useState } from "react";

export let FeedbackListContext = createContext(null);

export let FeedbackListContextProvider = (props) => {
  let [sortKey, setSortKey] = useState("+upvotes");
  let [selectedCategories, setSelectedCategories] = useState([]);

  let value = {
    sortKey,
    setSortKey,
    selectedCategories,
    setSelectedCategories,
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
