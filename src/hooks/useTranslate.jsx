import { useState, useEffect } from 'react';
import translateRunes from '../helpers/translateRunes';
import translate from '../helpers/translate';

const DEFAULT_OUTPUT = {
  placeHolder: true,
  sourceLang: null,
  text: 'Translation',
}

function useTranslate(text, targetLang, limit) {
  const [output, setOutput] = useState(DEFAULT_OUTPUT);

  // debounced translation
  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (text.length === 0 || !targetLang) {
        setOutput({ ...DEFAULT_OUTPUT });
        return;
      }

      if (targetLang === 'R') {
        const result = translateRunes(text);
        console.log(result); // printing translation result
        setOutput({ placeHolder: false, sourceLang: result.detectedLanguage, text: result.translation });
      } else {
        if (text.length > limit) {
          console.log('Error. Request text is too long.');
          return;
        }
        const result = await translate(text, targetLang);
        console.log(result); // printing translation result
        setOutput({ placeHolder: false, sourceLang: result.detectedLanguage, text: result.translation });
      }
    }, 1500);

    return () => {
      clearTimeout(timerId);
    }
  }, [text, targetLang, limit])

  return output;
}

export default useTranslate;