import { useRef } from 'react';
import styles from './Output.module.css';

let timerId;

function Output({ outputText, placeHolder }) {
  const btnCopyRef = useRef();

  const handleClick = () => {
    navigator.clipboard.writeText(outputText);
    btnCopyRef.current.innerText = 'Copied ✓';
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      btnCopyRef.current.innerText = 'Copy';
    }, 3000);
  }

  return (
    <div className={styles['output-container']}>
      <span className={placeHolder ? styles.placeholder : ''}>
        {outputText}
      </span>
      {!placeHolder && (
        <small className={styles['btn-copy']} onClick={handleClick} ref={btnCopyRef}>Copy</small>
      )}
    </div>
  )
}

export default Output;