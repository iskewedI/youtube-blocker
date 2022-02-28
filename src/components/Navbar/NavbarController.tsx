import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { uuid } from "../../service/utils";
import { Screens } from "../../types/enums";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedProfile, getUserProfiles } from "../../store/profileReducer";

// const profiles: Profile[] = [
//   { name: "Study", id: uuid() },
//   { name: "Work", id: uuid() },
//   { name: "Kids", id: uuid() },
//   { name: "Games", id: uuid() },
// ];

interface NavbarControllerProps {
  onChangeScreen: (newScreen: Screens) => void;
  currentScreen: Screens;
}

/***
 * Controller for the Navbar view. Handles the state functions and click events, and all the store calls/operations.
 */
const NavbarController = ({
  onChangeScreen,
  currentScreen,
}: NavbarControllerProps) => {
  const [active, setActive] = useState<string>("");

  const dispatch = useDispatch();

  const profiles = useSelector(getUserProfiles);

  useEffect(() => {
    if (!active && profiles.length > 0) {
      setActive(profiles[0].id);
    }
  }, [active, setActive, profiles]);

  /***
   * Sets the new active profile by its id.
   * @param {string} id - Id of the clicked profile-
   */
  const handleProfileClick = (id: string) => {
    setActive(id);

    dispatch(changeSelectedProfile(id));
    
    if (currentScreen !== Screens.Profiles) {
      onChangeScreen(Screens.Profiles);
    }
  };

  return (
    <Navbar
      items={profiles}
      onItemClick={handleProfileClick}
      onChangeScreen={onChangeScreen}
      activeItem={active}
    />
  );
};

export default NavbarController;
