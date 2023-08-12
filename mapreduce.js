document.addEventListener("DOMContentLoaded", function () {
    const runButton = document.getElementById("runButton");
    const inputText = document.getElementById("inputText");
    const outputDiv = document.getElementById("output");

    runButton.addEventListener("click", function () {
        if (inputText.value.trim() === "") {
            alert("Please enter some text before starting MapReduce.");
            return;
        }

        const start = performance.now(); // Record start time

        const inputData = inputText.value;
        const words = inputData.split(/\s+/);

        const wordCounts = {};

        // Map Phase
        words.forEach(function (word) {
            const normalizedWord = word.toLowerCase();
            if (!wordCounts[normalizedWord]) {
                wordCounts[normalizedWord] = 1;
            } else {
                wordCounts[normalizedWord]++;
            }
        });

        // Reduce Phase
        let outputHTML = "<h2>Word Count Result:</h2>";
        for (const word in wordCounts) {
            outputHTML += `<p>${word}: ${wordCounts[word]}</p>`;
        }

        // Calculate total number of words
        const totalWords = words.length;

        const end = performance.now(); // Record end time
        const processingTime = (end - start) / 1000; // Convert to seconds

        // Add total words and processing time to output
        outputHTML += `<p><b>Total number of words: &nbsp;${totalWords}</b></p>`;
        outputHTML += `<p><b>Processing time: &nbsp; ${processingTime.toFixed(10)}&nbsp; sec</b></p>`;

        outputDiv.innerHTML = outputHTML;
    });
});
