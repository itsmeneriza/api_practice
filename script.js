const detectBtn = document.getElementById('detectBtn');
const textInput = document.getElementById('textInput');
const resultDiv = document.getElementById('result');

const apiKey = '16adff3d716b1e82e9996229dd493a06';
const apiUrl = 'https://api.detectlanguage.com/0.2/detect';

async function detectLanguage(text) {
  try {
    // Display a loading indicator
    resultDiv.textContent = 'Detecting language...';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ q: text })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data: { detections: [{ language, confidence }] } = {} } = await response.json();

    if (language && confidence) {
      return { language, confidence };
    } else {
      throw new Error('Could not detect language from API response.');
    }

    console.log(JSON.stringify(result));
  } catch (error) {
    console.error('Error detecting language:', error);
    return null;
  } finally {
    // Hide the loading indicator
    // (Implement the specific logic for hiding the indicator based on your UI)
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
    const { language, confidence } = languageInfo;
    resultDiv.textContent = `Detected Language: ${language} (Confidence: ${confidence})`;
  } else {
    resultDiv.textContent = 'Could not detect language. Please try again later.';
  }
});
