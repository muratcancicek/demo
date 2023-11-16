import { Box, Typography } from "@mui/material";
import React from "react";

const ContentBox = ({char, vec, score, interaction, onClick }) => {
  const color = `rgb(${vec[0]}, ${vec[1]}, ${vec[2]})`;
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        border: "1px solid black",
        width: "150px",
        height: "150px",
        backgroundColor: color,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Box display="flex" alignItems="center">
        <Typography
          fontSize="20px"
          color="white"
          align="center"
        >
          {char}<br/>Interaction: {interaction}<br/>Score: {score && score.toFixed(4)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContentBox;
