import { Grid, Box } from "@mui/material";
import React from "react";

const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const DemoBox = () => {
  const randomColor = getRandomColor();
  return (
    <Box
      sx={{
        border: "1px solid black", // Fix the syntax for border style
        width: "100px",
        height: "100px",
        backgroundColor: randomColor,
      }}
    >
      test
    </Box>
  );
};

export default DemoBox;
