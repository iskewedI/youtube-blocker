import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Screens } from '../../types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectedProfile, getUserProfiles } from '../../store/profileReducer';
import { changeScreen, getCurrentScreen } from '../../store/screenReducer';

/***
 * Controller for the Navbar view. Handles the state functions and click events, and all the store calls/operations.
 */
const NavbarController = () => {
  const [active, setActive] = useState<string>('');

  const dispatch = useDispatch();

  const currentScreen = useSelector(getCurrentScreen);
  const profiles = useSelector(getUserProfiles);

  useEffect(() => {
    if (!active && profiles.length > 0) {
      setActive(profiles[0].id);
    }
  }, [active, setActive, profiles]);

  const handleChangeScreen = (screen: Screens) => {
    let newScreen: Screens = screen;

    if (currentScreen !== Screens.Profiles) {
      newScreen = Screens.Profiles;
    }

    dispatch(changeScreen(newScreen));
  };

  /***
   * Sets the new active profile by its id.
   * @param {string} id - Id of the clicked profile-
   */
  const handleProfileClick = (id: string) => {
    setActive(id);

    dispatch(changeSelectedProfile(id));

    handleChangeScreen(Screens.Profiles);
  };

  return (
    <Navbar
      items={profiles}
      onItemClick={handleProfileClick}
      onChangeScreen={handleChangeScreen}
      activeItem={active}
    />
  );
};

export default NavbarController;
