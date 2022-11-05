import { Props } from "@utilities/types";
import { createContext, useState, useEffect, FC } from "react";

// create context
const AppContext = createContext(null);

const AppContextProvider: FC<Props> = ({ children }) => {
  // the value that will be given to the context
  const [App, setApp] = useState(null);

  const storageHandler = (changes: {
    [key: string]: chrome.storage.StorageChange;
  }) => {
    for (var key in changes) {
      const newValue = changes[key].newValue;
      if (typeof newValue == "undefined") continue;
      // if (key == extensionName) {
      //   setAppInfo(newValue);
      // }
    }
  };

  useEffect(() => {
    chrome.storage.onChanged.addListener(storageHandler);
    return () => {
      chrome.storage.onChanged.removeListener(storageHandler);
    };
  }, []);

  //   useEffect(() => {
  //     const fetchApp = () => {
  //       // this would usually be your own backend, or localStorage
  //       // for example
  //       fetch("https://randomApp.me/api/")
  //         .then((response) => response.json())
  //         .then((result) => setApp(result.results[0]))
  //         .catch((error) => console.log("An error occured"));
  //     };

  //     fetchApp();
  //   }, []);

  return (
    // the Provider gives access to the context to its children
    <AppContext.Provider value={App}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
