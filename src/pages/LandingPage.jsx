import { Button, Grid, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentBox from "../components/ContentBox";
import { generateContents } from "../enums/BaseContents";
import { initializeUserVectors, initializeContentVectors, nmfForContentRanking } from "../ranking"

const LandingPage = () => {

  function getDefaultContents(numContents) {
    let contents = generateContents(numContents);
    for (let i = 0; i < contents.length; i++) {
      contents[i] = { ...contents[i], score: 1.0, interaction: 1 };
    }
    return contents;
  }

  function gettInteractionMatrix(contents) {
    let sortedContents = contents.sort((a, b) => a.id > b.id ? 1 : -1);
    return [sortedContents.map((c) => c.interaction)];
  }

  const numUsers = 1;
  const [numContents, setNumContents] = useState(10);
  const [contents, setContents] = useState([]);
  const [abc, setAbc] = useState([]);
  const numUserFeatures = 3;
  const numContentFeatures = 3;
  const [selectedBox, setSelectedBox] = useState(null);
  const [userVectors, setUserVectors] = useState(null);
  const [contentVectors, setcontentVectors] = useState(null);

  const handleGenerateClick = () => {
    let contents = getDefaultContents(numContents);
    setContents(contents);
    setAbc(contents.map((c) => c.char));
  };

  function updateContentByChar(char, interaction, score) {
    // finds the content by the char value and updates interaction and score
    setContents(prevContents => {
      return prevContents.map(item => {
        if (item.char === char) {
          return { ...item, interaction: interaction, score: score };
        } else {
          return item;
        }
      });
    });
  }

  function rankContentsForUser() {
    let interactionMatrix = gettInteractionMatrix(contents);
    const interestScores = nmfForContentRanking(interactionMatrix, userVectors, contentVectors, 3);
    for (let i = 0; i < numContents; i++) {
      updateContentByChar(abc[i], interactionMatrix[0][i], interestScores[0][i])
    }

  }

  useEffect(() => {
    const uVectors = initializeUserVectors(numUsers, numUserFeatures);
    const cVectors = initializeContentVectors(numContents, numContentFeatures);
    setUserVectors(uVectors);
    setcontentVectors(cVectors);
  }, [numUsers, numContents, contents]);

  const handleBoxClick = (content) => {
    setSelectedBox((prevSelected) => (prevSelected === content.char ? null : content.char));
    updateContentByChar(content.char, content.interaction + 1, content.score);
  };

  const handleOnclick = () => {
    // TODO:
    console.log("test")
    rankContentsForUser();
  };

  return (
    <>
      <Grid container sx={{ padding: 10 }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Box><Typography style={{ fontSize: 25 }}>Stake for Ranking!</Typography></Box>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Box>
            Number of Contents:
            <input type="number" value={numContents} onChange={(e) => setNumContents(e.target.value)} style={{ marginLeft: "5px", marginRight: '5px' }} />
            <Button variant="contained" onClick={handleGenerateClick}>
              Generate
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} mt={5} display="flex" justifyContent="center">
          <Box>
            <Button variant="contained" onClick={handleOnclick}>
              Rank Again
            </Button>
          </Box>
        </Grid>
        {contents.sort((a, b) => a.score > b.score ? -1 : 1).map((content, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} mt={5}>
            <ContentBox
              char={content.char}
              vec={content.vec}
              score={content.score}
              isFocused={selectedBox === index}
              isSelected={content.interaction > 0}
              interaction={content.interaction}
              onClick={() => handleBoxClick(content)}
            ></ContentBox>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LandingPage;
