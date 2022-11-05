import { useState, useEffect } from "react";
import { TreeInfo } from "../types";

export const useTree = (treeKey = "") => {
  const [treeInfo, setTreeInfo] = useState<TreeInfo>();

  const storageHandler = (changes) => {
    for (const key in changes) {
      if (key !== treeKey) continue;
      try {
        if (changes[key].newValue) setTreeInfo(changes[key].newValue);
      } catch (e) {
        console.log("e", e);
      }
    }
  };

  useEffect(() => {
    chrome.storage.onChanged.addListener(storageHandler);
    return () => {
      chrome.storage.onChanged.removeListener(storageHandler);
    };
  }, []);

  return { treeInfo };
};

// function useFriendStatus(friendID) {
//   const [isOnline, setIsOnline] = useState(null);

//   useEffect(() => {
//     function handleStatusChange(status) {
//       setIsOnline(status.isOnline);
//     }

//     ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
//     };
//   });

//   return isOnline;
// }
