import { Box, Typography } from "@mui/material";
import React from "react";

const DemoBox = ({ randomColor, char, isSelected, onClick }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        border: "1px solid black",
        width: isSelected ? "200px" : "100px",
        height: isSelected ? "200px" : "100px",
        backgroundColor: randomColor,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Box display="flex" alignItems="center">
        <Typography
          fontSize="20px"
          color={
            randomColor === "#000000" || randomColor === "#112233"
              ? "white"
              : "black"
          }
        >
          {char}
        </Typography>
      </Box>
    </Box>
  );
};

export default DemoBox;
