import React from "react";
import ReactDOM from "react-dom/client";
import StyledComponent from "./StyledComponent";
import { DataFetching } from "./DataFetching";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <div>
        <DataFetching />
        <DataFetching />
        <DataFetching />
        <DataFetching />
        <DataFetching />
        <DataFetching />
        <DataFetching />
    </div>
);
