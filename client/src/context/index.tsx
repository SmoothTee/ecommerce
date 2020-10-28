import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryConfigProvider } from "react-query";

import { AuthProvider } from "./AuthContext";

const queryConfig = {
  queries: {},
};

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  // Optional provider component:
  // Used to define defaults for all instances of 'useQuery' within it's sub-tree.
  <ReactQueryConfigProvider config={queryConfig}>
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  </ReactQueryConfigProvider>
);
