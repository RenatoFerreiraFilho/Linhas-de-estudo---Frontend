import React from "react";
import ReactDOM from "react-dom/client";
import StyledComponent from "./StyledComponent";
import { DataFetching } from "./DataFetching";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();
root.render(
    <div>
        <QueryClientProvider client={queryClient}>
            <DataFetching />
        </QueryClientProvider>
    </div>
);
