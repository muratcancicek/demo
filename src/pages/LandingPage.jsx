import { Button, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DemoBox from "../components/DemoBox";
import { EDemoBoxes } from "../enums/EDemoBoxes";

const LandingPage = () => {
  const [demoBox, setDemoBox] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);

  useEffect(() => {
    setDemoBox(Object.values(EDemoBoxes));
  }, []);

  const handleBoxClick = (index) => {
    setSelectedBox((prevSelected) => (prevSelected === index ? null : index));
  };

  const handleOnclick = () => {
    // TODO:
    console.log("test")
  };

  return (
    <>
      <Grid container sx={{ padding: 10 }}>
        {demoBox.map((color, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} mt={5}>
            <DemoBox
              randomColor={color.color}
              char={color.char}
              isSelected={selectedBox === index}
              onClick={() => handleBoxClick(index)}
            ></DemoBox>
          </Grid>
        ))}
        <Grid item xs={12} mt={5} display="flex" justifyContent="center">
          <Box>
            <Button variant="contained" onClick={handleOnclick}>
              Rank Again
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
