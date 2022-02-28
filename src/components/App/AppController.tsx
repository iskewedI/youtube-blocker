import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfilesLoaded, requestProfiles } from "../../store/profileReducer";
import { Screens } from "../../types/enums";
import App from "./App";

/***
 * Controller for the Main App component. Handles the events and most generic calls to the store.
 */
const AppController = () => {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: Screens.Profiles,
  });

  const dispatch = useDispatch();

  const profilesLoaded = useSelector(getUserProfilesLoaded);

  useEffect(() => {
    if(!profilesLoaded){
      dispatch(requestProfiles);
    }
  }, [profilesLoaded, dispatch]);
  
  /***
   * Function passed to each screen to handle the Change Screen event.
   * Always the default screen will be the Profiles Screen.
   */
  const handleChangeScreen = (screen: Screens) => {
    let newScreen = screen;

    if (screen === appState.currentScreen) {
      newScreen = Screens.Profiles;
    }

    setAppState((state) => ({ ...state, currentScreen: newScreen }));
  };

  return (
    <App
      currentScreen={appState.currentScreen}
      onChangeScreen={handleChangeScreen}
    />
  );
};

export default AppController;
