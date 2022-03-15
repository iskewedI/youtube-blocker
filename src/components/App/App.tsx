import NavbarController from '../Navbar/NavbarController';
import ProfileController from '../Screens/Profile/ProfileController';
import SettingsController from '../Screens/Settings/SettingsController';
import { Screens } from '../../types/enums';
import styles from './app.module.css';
import CriteriaPanelController from '../Screens/CriteriaPanel/CriteriaPanelController';

interface AppProps {
  currentScreen: Screens;
}

/***
 * Renders the Main App Container with a Navbar, and the current active screen component.
 * @param {Screens} currentScreen - The current screen value.
 */
function App({ currentScreen }: AppProps) {
  return (
    <div className={styles.appContainer}>
      <NavbarController />
      {currentScreen === Screens.Profiles && <ProfileController />}
      {currentScreen === Screens.Settings && <SettingsController />}
      {currentScreen === Screens.CriteriaPanel && <CriteriaPanelController />}
    </div>
  );
}

export default App;
