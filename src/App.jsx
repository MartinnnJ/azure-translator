import { useEffect, useState, useRef } from "react";
import useFetchInitialData from "./components/hooks/useFetchInitialData";
import useTranslate from "./components/hooks/useTranslate";
import Header from "./components/Header";
import Input from "./components/Input";
import Select from "./components/Select";
import Output from "./components/Output";

function App() {
  const [textLimit, supportedLanguages] = useFetchInitialData('limit', 'languages');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  const [selectedLang, setSelectedLang] = useState(''); // target language only
  const output = useTranslate(inputValue, selectedLang, textLimit);

  // setting initial 'selectedLang' value
  useEffect(() => {
    if (supportedLanguages.length > 0) {
      setSelectedLang(supportedLanguages[0].langCode);
    }
  }, [supportedLanguages])

  // 'document.activeElement' returns the currently focused element in the document
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape' && inputRef.current === document.activeElement) {
        setInputValue('');
      }
    })
  }, [])

  const onInputChange = e => {
    setInputValue(e.target.value)
  }

  const onSelectChange = e => {
    setSelectedLang(e.target.value)
  }

  return (
    <div className="wrapper">
      <Header />
      <Input
        textLimit={selectedLang === 'R' ? null : textLimit}
        inputValue={inputValue}
        onInputChange={onInputChange}
        ref={inputRef}
      />
      <div className="selectors">
        {supportedLanguages.length > 0 && (
          <>
            <Select
              label="from"
              disabled={true}
              supportedLanguages={supportedLanguages}
              detectedLang={output.sourceLang}
              selectedLang={selectedLang}
              onSelectChange={onSelectChange}
            />
            <Select
              label="to"
              disabled={false} // or we can remove it
              supportedLanguages={supportedLanguages}
              selectedLang={selectedLang}
              onSelectChange={onSelectChange}
            />
          </>
        )}
      </div>
      <Output outputText={output.text} placeHolder={output.placeHolder} />
    </div>
  )
}

export default App;