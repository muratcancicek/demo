import { Box, Typography } from "@mui/material";
import React from "react";

const ContentBox = ({ randomColor, char, vec, isFocused, isSelected, score, interaction, onClick }) => {
  let border = "1px solid black";
  let width = "100px";
  let height = "100px";
  // if (isSelected || isFocused) {
  //   let color = isSelected ? "green" : "black";
  //   border = "15px solid {color}";
  //   width = "70px";
  //   height = "70px";
  // }
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        border: "1px solid black",
        width: "150px",
        height: "150px",
        backgroundColor: randomColor,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Box display="flex" alignItems="center">
        <Typography
          fontSize="20px"
          color="white"
        >
          {char}<br/>Inter: {interaction}<br/>Score: {score && score.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContentBox;
