import styles from './app.module.css';
import Navbar from './components/Navbar/Navbar';
import ProfileController from './components/Profile/ProfileController';

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar profiles={['Study', 'Work', 'Kids', 'Games']} />
      <ProfileController />
    </div>
  );
}

export default App;
