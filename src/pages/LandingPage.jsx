import { Grid } from "@mui/material";
import React from "react";
import DemoBox from "../components/DemoBox";

const LandingPage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <DemoBox></DemoBox>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
