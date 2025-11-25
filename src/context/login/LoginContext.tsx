"use client";
import React, { createContext, useContext, useReducer } from "react";
import { InitialTypes } from "./types";

type Action =
  | {
      type: "SET_PHONENUMBER";
      payload: {
        phone_number: string;
        password: string;
      };
    }
  | {
      type: "SET_LOGIN";
      payload: {
        otp: string;
      };
    }
  | { type: "RESET" };

const initial: InitialTypes = {
  phone_number: "",
  password: "",
  otp: "",
};

const reducer = (state: InitialTypes, action: Action): InitialTypes => {
  switch (action.type) {
    case "SET_PHONENUMBER":
      return { ...state, ...action.payload };
    case "SET_LOGIN": {
      return { ...state, ...action.payload };
    }

    case "RESET":
      return initial;
    default:
      return state;
  }
};

const Ctx1 = createContext<{
  state: InitialTypes;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initial);
  return <Ctx1.Provider value={{ state, dispatch }}>{children}</Ctx1.Provider>;
};

export const useLogin = () => {
  const ctx1 = useContext(Ctx1);
  if (!ctx1) throw new Error("useLogin must be used within LoginProvider");
  return ctx1;
};
