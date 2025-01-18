const sourceLanguage = document.getElementById('sourceLanguage');
const targetLanguage = document.getElementById('targetLanguage');
const inputText = document.getElementById('inputText');
const translationOutput = document.getElementById('translationOutput');
const translateBtn = document.getElementById('translateBtn');
const sourceVoiceBtn = document.getElementById('sourceVoiceBtn');
const targetVoiceBtn = document.getElementById('targetVoiceBtn');

const languages = {
  ru: "Russian",
  uz: "Uzbekistan",
  en: "English",
  af: "Afrikaans",
  es: "Spanish",
  fr: "French",
  de: "German",
  zh: "Chinese",
  ar: "Arabic",
  ja: "Japanese",
  it: "Italian",
  ko: "Korean",
  pt: "Portuguese",
  hi: "Hindi",
  bn: "Bengali",
  tr: "Turkish",
  nl: "Dutch",
  sv: "Swedish",
  pl: "Polish",
  bg: "Bulgarian",
  el: "Greek",
  cs: "Czech",
  fi: "Finnish",
  hu: "Hungarian",
  ro: "Romanian",
  id: "Indonesian",
  th: "Thai",
  vi: "Vietnamese",
  my: "Burmese",
  sk: "Slovak",
  lt: "Lithuanian",
  lv: "Latvian",
  et: "Estonian",
  ka: "Georgian",
};

for (const [code, name] of Object.entries(languages)) {
  const sourceOption = document.createElement('option');
  sourceOption.value = code;
  sourceOption.textContent = name;
  sourceLanguage.appendChild(sourceOption);

  const targetOption = document.createElement('option');
  targetOption.value = code;
  targetOption.textContent = name;
  targetLanguage.appendChild(targetOption);
}

translateBtn.addEventListener('click', async () => {
  const text = inputText.value;
  const sourceLang = sourceLanguage.value;
  const targetLang = targetLanguage.value;

  if (!text) {
    alert('Iltimos, matn kiriting.');
    return;
  }

  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
    const data = await response.json();

    if (data.responseData) {
      translationOutput.value = data.responseData.translatedText;

      targetVoiceBtn.style.display = 'inline-block';
      targetVoiceBtn.onclick = () => {
        const utterance = new SpeechSynthesisUtterance(data.responseData.translatedText);
        utterance.lang = targetLang;
        speechSynthesis.speak(utterance);
      };
    } else {
      translationOutput.value = 'Tarjima bajarilmadi.';
      targetVoiceBtn.style.display = 'none';
    }
  } catch (error) {
    translationOutput.value = 'Tarjima jarayonida xatolik yuz berdi.';
    console.error(error);
    targetVoiceBtn.style.display = 'none';
  }
});

inputText.addEventListener('input', () => {
  sourceVoiceBtn.style.display = inputText.value ? 'inline-block' : 'none';
});

sourceVoiceBtn.onclick = () => {
  const utterance = new SpeechSynthesisUtterance(inputText.value);
  utterance.lang = sourceLanguage.value;
  speechSynthesis.speak(utterance);
};
