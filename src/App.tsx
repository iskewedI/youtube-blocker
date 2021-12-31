import styles from './app.module.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar profiles={['Study', 'Work']} />
    </div>
  );
}

export default App;
