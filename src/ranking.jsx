function initializeMatrices(numUsers, numContents, numFeatures) {
    let W = createRandomMatrix(numUsers, numFeatures);
    let H = createRandomMatrix(numFeatures, numContents);
    return { W, H };
}

function updateMatrices(V, W, H, numIterations) {
    for (let i = 0; i < numIterations; i++) {
        // Update rules for W and H
        // Typically involves matrix multiplications and element-wise operations
        // Ensure non-negativity
    }
    return { W, H };
}

function calculateInterestScores(W, H) {
    let approximatedMatrix = matrixMultiply(W, H);
    return normalizeScores(approximatedMatrix);
}

function rankContentsForUser(approximatedMatrix, userId) {
    // Sort the contents for the given user based on interest scores
    // Return the sorted list of contents
}

// Main function
function nmfForContentRanking(interactionMatrix, numFeatures, numIterations) {
    let { W, H } = initializeMatrices(interactionMatrix.length, interactionMatrix[0].length, numFeatures);
    let updatedMatrices = updateMatrices(interactionMatrix, W, H, numIterations);
    let interestScores = calculateInterestScores(updatedMatrices.W, updatedMatrices.H);
    return interestScores.map((userScores, userId) => rankContentsForUser(userScores, userId));
}

// Additional functions needed: 
// createRandomMatrix, matrixMultiply, normalizeScores, etc.
