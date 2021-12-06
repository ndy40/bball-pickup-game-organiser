import { CircularProgress, LinearProgress, Stack } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "white",
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loading;
