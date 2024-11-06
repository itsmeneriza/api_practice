// Step 1: Define the API key and endpoint
const apiKey = '16adff3d716b1e82e9996229dd493a06'; // Replace with your actual API key
const apiUrl = 'https://ws.detectlanguage.com/0.2/detect'; // Replace with your actual API endpoint

// Step 2: Create the function to call the API
async function fetchData() {
    try {
        const response = await fetch(fetchDataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Assuming data contains text to analyze
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Step 3: Detect language of the fetched text
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
    }
}

// Step 4: Main function to orchestrate fetching and detecting language
async function main() {
    const fetchedData = await fetchData();
    if (fetchedData) {
        const textToAnalyze = fetchedData.text; // Adjust based on your data structure
        const languageInfo = await detectLanguage(textToAnalyze);
        console.log('Detected Language Info:', languageInfo);
    }
}

// Step 5: Execute the main function
main();
