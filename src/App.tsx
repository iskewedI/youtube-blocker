import styles from './app.module.css';
import NavbarController from './components/Navbar/NavbarController';
import ProfileController from './components/Profile/ProfileController';

function App() {
  return (
    <div className={styles.appContainer}>
      <NavbarController />
      <ProfileController />
    </div>
  );
}

export default App;
