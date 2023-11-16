import { Button, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentBox from "../components/ContentBox";
import { BaseContents } from "../enums/BaseContents";
import { initializeUserVectors, initializeContentVectors, nmfForContentRanking } from "../ranking"

const LandingPage = () => {
  
function getDefaultContents(baseContents) {
    let contents = [...baseContents];
    for (let i = 0; i < contents.length; i++) {
      contents[i] = { ...contents[i], score: 1.0, interaction: 1 };
    }
    return contents;
}

function gettInteractionMatrix(contents) {
  return [contents.sort((a, b) => a.char > b.char ? 1 : -1).map((c) => c.interaction)];
}

function getScores(contents) {
  return [contents.map((c) => c.score)];
}

  const [contents, setContents] = useState(getDefaultContents(Object.values(BaseContents)));
  const abc = ["a", "b", "c", "d", "e", "f"];
  const numUsers = 1;
  const numContents = BaseContents.length;
  const numUserFeatures = 3;
  const numContentFeatures = 3;
  const [selectedBox, setSelectedBox] = useState(null);
  const [userVectors, setUserVectors] = useState(null);
  const [contentVectors, setcontentVectors] = useState(null);

  function updateContentByChar(char, interaction, score) {
      // finds the content by the char value and updates interaction and score
      setContents(prevContents => {
        return prevContents.map(item => {
            if (item.char === char) {
                return {...item, interaction: interaction, score: score};
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
              randomColor={content.color}
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
