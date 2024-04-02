import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.tsx";
import { AuthProvider } from "./Contexts/AuthContext.tsx";
import { SearchContextProvider } from "./Contexts/SearchContext.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <SearchContextProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SearchContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
