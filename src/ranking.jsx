
import numeric from 'numeric';

// Function to generate a random number within a given range
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to create a random matrix
  const createRandomMatrix = (rows, cols, min, max) => {
    return Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => generateRandomNumber(min, max))
    );
  };

function initializeUserVectors(numUsers, numFeatures) {
    return createRandomMatrix(numUsers, numFeatures, 0, 1);
}

function initializeContentVectors(numContents, numFeatures) {
    return createRandomMatrix(numFeatures, numContents, 0, 1);
}

function updateMatrices(interactionMatrix, userVectors, contentVectors, numIterations) {
    for (let i = 0; i < numIterations; i++) {
        // Update rules for W and H
        // Typically involves matrix multiplications and element-wise operations
        // Ensure non-negativity
        // Update W
        let WH = numeric.dot(userVectors, contentVectors);
        let numerator = numeric.dot(interactionMatrix, numeric.transpose(contentVectors));
        numerator = numeric.mul(userVectors, numerator);
        let denominator = numeric.dot(WH, numeric.transpose(contentVectors));
        denominator = numeric.add(denominator, 1e-9);
        userVectors = numeric.div(numerator, denominator);

        // Update H
        numerator = numeric.dot(numeric.transpose(userVectors), interactionMatrix);
        numerator = numeric.mul(contentVectors, numerator);
        denominator = numeric.dot(numeric.transpose(userVectors), WH);
        denominator = numeric.add(denominator, 1e-9);
        contentVectors = numeric.div(numerator, denominator);
    }
    return { userVectors,  contentVectors };
}

function matrixMultiply(W, H) {
    return numeric.dot(W, H);
}

function normalizeScores(matrix) {
    // Normalize the scores for each user
    let absoluteMatrix = matrix.map(row => row.map(value => Math.abs(value)));
    let maxVal = numeric.sup(absoluteMatrix);

    // Divide each element in the matrix by the maximum value
    let normalizedMatrix = numeric.div(matrix, maxVal);

    return normalizedMatrix;
    
}
function calculateInterestScores(userVectors, contentVectors) {
    let approximatedMatrix = matrixMultiply(userVectors, contentVectors);
    return normalizeScores(approximatedMatrix);
}

function rankContentsForUser(approximatedMatrix, userId) {
    // Sort the contents for the given user based on interest scores
    // Return the sorted list of contents
    // Get the scores for the given user
    let userScores = approximatedMatrix[userId];

    // Create an array of content ids
    let contentIds = Array.from({length: userScores.length}, (_, i) => i);

    // Sort the content ids based on the user's scores
    contentIds.sort((a, b) => userScores[b] - userScores[a]);

    return contentIds;
}

// Main function
function nmfForContentRanking(interactionMatrix, userVectors, contentVectors, numIterations) {
    let { userVectors: updatedUserVectors, contentVectors: updatedContentVectors} = 
    updateMatrices(interactionMatrix, userVectors, contentVectors, numIterations);
    // let interestScores = calculateInterestScores(userVectors, contentVectors);
    let interestScores = calculateInterestScores(updatedUserVectors, updatedContentVectors);
    return interestScores;//.map((userScores, userId) => rankContentsForUser(userScores, userId));
}

export { initializeUserVectors, initializeContentVectors, nmfForContentRanking };