import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface IReduxProvider {
  children: ReactNode;
}
const ReduxProvider: FC<IReduxProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
