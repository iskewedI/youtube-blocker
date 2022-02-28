import { useState } from 'react';
import { Screens } from '../../types/enums';
import App from './App';

/***
 * Controller for the Main App component. Handles the events and most generic calls to the store.
 */
const AppController = () => {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: Screens.Profiles,
  });

  /***
   * Function passed to each screen to handle the Change Screen event.
   * Always the default screen will be the Profiles Screen.
   */
  const handleChangeScreen = (screen: Screens) => {
    let newScreen = screen;

    if (screen === appState.currentScreen) {
      newScreen = Screens.Profiles;
    }

    setAppState(state => ({ ...state, currentScreen: newScreen }));
  };

  return (
    <App currentScreen={appState.currentScreen} onChangeScreen={handleChangeScreen} />
  );
};

export default AppController;
