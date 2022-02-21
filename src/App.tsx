import { useState } from 'react';
import styles from './app.module.css';
import NavbarController from './components/Navbar/NavbarController';
import ProfileController from './components/Profile/ProfileController';
import SettingsController from './components/Settings/SettingsController';

export enum Screens {
  Profiles = 1,
  Timer,
  Settings,
}

interface AppState {
  currentScreen: Screens;
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: Screens.Profiles,
  });

  const handleChangeScreen = (screen: Screens) => {
    let newScreen = screen;

    if (screen === appState.currentScreen) {
      newScreen = Screens.Profiles;
    }

    setAppState(state => ({ ...state, currentScreen: newScreen }));
  };

  const { currentScreen } = appState;

  return (
    <div className={styles.appContainer}>
      <NavbarController
        onChangeScreen={handleChangeScreen}
        currentScreen={currentScreen}
      />
      {currentScreen === Screens.Profiles && <ProfileController />}
      {currentScreen === Screens.Settings && (
        <SettingsController onScreenReturn={() => handleChangeScreen(Screens.Profiles)} />
      )}
    </div>
  );
}

export default App;
