"use client";
import { createContext, useContext, useReducer } from "react";
import { InitialTypes } from "./types";

// ************************************************************************************************

type Action =
  | {
      type: "SET_OTP";
      payload: { temporaryToken: string; phoneNumber: string };
    }
  | {
      type: "SET_NAME";
      payload: { firstName: string; lastName: string; displayName: string };
    }
  | { type: "SET_USERNAME"; payload: { username: string } }
  | { type: "SET_EMAIL"; payload: { email?: string | null } }
  | {
      type: "SET_PASSWORD";
      payload: { password: string; confirmPassword: string };
    }
  | { type: "SET_AGE"; payload: { ageRangeId: number } } // 👈 اضافه شد
  | { type: "SET_ROLE"; payload: { roleId: number } }
  | { type: "SET_INTERESTS"; payload: { interestIds: number[] } }
  | { type: "RESET" };

// ***************************************************************************************************

const initial: InitialTypes = {
  temporaryToken: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  displayName: "",
  username: "",
  password: "",
  confirmPassword: "",
  ageRangeId: undefined,
  roleId: undefined,
  interestIds: [],
};

//  *************************************************************************************************

const reducer = (state: InitialTypes, action: Action) => {
  switch (action.type) {
    case "SET_OTP":
    case "SET_NAME":
    case "SET_USERNAME":
    case "SET_EMAIL":
    case "SET_PASSWORD":
    case "SET_AGE":
    case "SET_ROLE":
    case "SET_INTERESTS":
      return { ...state, ...action.payload };
    case "RESET":
      return initial;
    default:
      return state;
  }
};

// *****************************************************************************************************

const Ctx = createContext<{
  state: InitialTypes;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// *********************************************************************************************************

export const RegistrationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initial);
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
};

// **********************************************************************************************************

export const useRegistration = () => {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useRegistration must be used within RegistrationProvider");
  return ctx;
};
