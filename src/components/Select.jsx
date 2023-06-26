import styles from './Select.module.css';

function Select({ label, disabled, supportedLanguages, detectedLang, selectedLang, onSelectChange }) {
  const autodetectSymbol = "-";
  const unknownLangSymbol = "";
  
  // displaying detectedLang name works only if langCode exists in options
  let supportedLangCodes = supportedLanguages.map(lang => lang.langCode);
  supportedLangCodes = [autodetectSymbol, ...supportedLangCodes];

  const selectOptions = supportedLanguages.map((lang, i) => {
    return <option key={i} value={lang.langCode}>{lang.langName}</option>
  });
  
  const selectValue = disabled ?
    selectedLang === "R" ? "en" : detectedLang ? detectedLang : autodetectSymbol // runs only if disabled=true, if 'R' is a target lang, then only 'en' can be source lang
    : selectedLang; // runs only if disabled=false

  return (
    <div className={styles['select-container']}>
      <label>{label}:</label>
      <select
        disabled={disabled}
        value={supportedLangCodes.includes(selectValue) ? selectValue : unknownLangSymbol}
        onChange={onSelectChange}
      >
        {disabled ? (
          [
            <option key={-2} value={unknownLangSymbol}>Unknown</option>,
            <option key={-1} value={autodetectSymbol}>Autodetect</option>,
            ...selectOptions
          ]
        ) : selectOptions}
      </select>
    </div>
  )
}

export default Select;