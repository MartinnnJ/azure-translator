import styles from './Header.module.css';
import logo from "../logo.png";

function Header() {
  return (
    <>
      <div className={styles['logo-container']}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.desc}>
        <small>Powered by <strong>Microsoft Translator API</strong>, which is part of <strong>Azure Cognitive Services</strong></small>
      </div>
    </>
  )
}

export default Header;