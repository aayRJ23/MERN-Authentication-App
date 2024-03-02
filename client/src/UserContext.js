import React, { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export const UserContextProvider = (props) => {
  const [email, setEmail] = useState("");

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {props.children}
    </UserContext.Provider>
  );
};
