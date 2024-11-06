// Step 1: Define the API key and endpoint
const detectBtn = document.getElementById('detectBtn');
const textInput = document.getElementById('textInput');
const resultDiv = document.getElementById('result');

const apiKey = '16adff3d716b1e82e9996229dd493a06'; // Replace with your actual API key
const apiUrl = 'https://ws.detectlanguage.com/0.2/detect'; // Replace with your actual API endpoint

// Step 2: Create the function to call the API
async function detectLanguage(text) {
    try {
        const response = await fetch(detectLanguageUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${detectLanguageApiKey}`
            },
            body: JSON.stringify({ q: text })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result; // Contains detected language information
    } catch (error) {
        console.error('Error detecting language:', error);
        return null; // Return null in case of error
    }
}

detectBtn.addEventListener('click', async () => {
    const textToAnalyze = textInput.value.trim();
    if (!textToAnalyze) {
        resultDiv.textContent = 'Please enter some text to analyze.';
        return;
    }
    
    const languageInfo = await detectLanguage(textToAnalyze);
    if (languageInfo) {
        const language = languageInfo.data.detections[0].language; // Adjust based on actual response structure
        const confidence = languageInfo.data.detections[0].confidence;
        resultDiv.textContent = `Detected Language: ${language} (Confidence: ${confidence})`;
    } else {
        resultDiv.textContent = 'Could not detect language.';
    }
});
