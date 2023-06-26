import { forwardRef, useEffect } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(function Input(props, ref) {
  const counterValue = (props.textLimit) - (props.inputValue.length);

  // handling textarea autosize base on its text content
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "150px"; // 150px is a CSS min-height value
      const textAreaHeight = ref.current.scrollHeight;
      ref.current.style.height = textAreaHeight + "px";
    }
  }, [ref, props.inputValue])

  return (
    <>
      <div className={styles['input-container']}>
        <textarea
          onChange={props.onInputChange}
          value={props.inputValue}
          ref={ref}
          placeholder="Input Text"
          autoFocus
        />
        {props.textLimit && (
          <small className={`${styles.counter} ${counterValue < 0 && styles.danger}`}>{counterValue}</small>
        )}
      </div>
    </>
  )
})

export default Input;