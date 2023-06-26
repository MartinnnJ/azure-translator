import axios from "axios";

// only env variables prefixed with 'VITE_' are exposed to client code (only if we are using vite bundler!)
async function translate(text, targetLang) {
  const KEY = import.meta.env.VITE_API_KEY;
  const ENDPOINT = "https://api.cognitive.microsofttranslator.com"; 
  const LOCATION = import.meta.env.VITE_SERVICE_LOCATION;

  const config = {
    baseURL: ENDPOINT,
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': KEY,
      'Ocp-Apim-Subscription-Region': LOCATION,
      'Content-type': 'application/json',
    },
    params: {
      'api-version': '3.0',
      'to': [`${targetLang}`] // 'from': 'en', for manual selection of a source language
    },
    data: [{ 'text': `${text}` }],
    responseType: 'json'
  }

  const response = await axios(config).then(data => {
    return data;
  })

  return {
    statusCode: response.status,
    detectedLanguage: response.data[0].detectedLanguage.language,
    translation: response.data[0].translations[0].text,
  }
}

export default translate;