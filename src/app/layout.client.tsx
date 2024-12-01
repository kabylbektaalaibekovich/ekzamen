"use client";
import React, { FC, ReactNode } from "react";
import ReduxProvider from "../provider/ReduxProvider";
import { store } from "@/redux/store";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

interface ReduxProps {
  children: ReactNode;
}

const RootLayoutClient: FC<ReduxProps> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default RootLayoutClient;
