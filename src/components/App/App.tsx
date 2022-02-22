import NavbarController from '../Navbar/NavbarController';
import ProfileController from '../Screens/Profile/ProfileController';
import SettingsController from '../Screens/Settings/SettingsController';
import { Screens } from '../../types/enums';
import styles from './app.module.css';

interface AppProps {
  currentScreen: Screens;
  onChangeScreen: (newScreen: Screens) => void;
}

/***
 * Renders the Main App Container with a Navbar, and the current active screen component.
 */
function App({ currentScreen, onChangeScreen }: AppProps) {
  return (
    <div className={styles.appContainer}>
      <NavbarController onChangeScreen={onChangeScreen} currentScreen={currentScreen} />
      {currentScreen === Screens.Profiles && <ProfileController />}
      {currentScreen === Screens.Settings && (
        <SettingsController onScreenReturn={() => onChangeScreen(Screens.Profiles)} />
      )}
    </div>
  );
}

export default App;
