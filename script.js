document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const countButton = document.getElementById("countButton");
    const filenameDisplay = document.getElementById("filenameDisplay");
    const resultDiv = document.getElementById("result");

    let uploadedFile = null;

    fileInput.addEventListener("change", () => {
        uploadedFile = fileInput.files[0];
        if (uploadedFile) {
            displayFilename(uploadedFile.name);
        }
    });

    countButton.addEventListener("click", () => {
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;
                const startTime = performance.now();
                const { wordCount, totalWords } = countWords(content); // Use countWords function
                const endTime = performance.now();
                const processingTime = (endTime - startTime) / 1000; // Convert to seconds
                displayResult(wordCount, totalWords, processingTime); // Pass totalWords to displayResult
                displayUploadText();
            };
            reader.readAsText(uploadedFile);
        } else {
            alert("Please upload a file first.");
        }
    });

    function displayFilename(name) {
        filenameDisplay.textContent = `Uploaded File: ${name}`;
    }

    function displayUploadText() {
        const uploadText = document.createElement("p");
        resultDiv.appendChild(uploadText);
    }

    function countWords(text) {
        const words = text.split(/\s+/); // Split without filtering empty strings
        const wordCount = {};
        for (const word of words) {
            const cleanedWord = word.toLowerCase();
            wordCount[cleanedWord] = (wordCount[cleanedWord] || 0) + 1;
        }
        const totalWords = words.length; // Calculate total words
        return { wordCount, totalWords };
    }

    function displayResult(wordCount, totalWords, processingTime) {
        resultDiv.innerHTML = "<h2>Word Count Result:</h2>";
        for (const word in wordCount) {
            resultDiv.innerHTML += `<p>${word}: ${wordCount[word]}</p>`;
        }
        resultDiv.innerHTML += `<p><b>Total number of words: &nbsp; ${totalWords}</b></p>`; // Display totalWords
        resultDiv.innerHTML += `<p><b>Processing time: &nbsp;${processingTime.toFixed(10)} &nbsp;sec<b></p>`;
    }
});
