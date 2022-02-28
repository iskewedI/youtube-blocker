import { createRef } from 'react';
import Button from '../common/Button';
import SettingsIcon from '../common/icons/SettingsIcon';
import TimerIcon from '../common/icons/TimerIcon';
import Scrollable from '../common/Scrollable/Scrollable';
import styles from './navbar.module.css';
import { uuid } from '../../service/utils';
import { Screens } from '../../types/enums';

interface NavbarProps {
  items: Entity[];
  activeItem: string;
  onChangeScreen: (newScreen: Screens) => void;
  onItemClick: (id: string) => void;
}
/***
 * Renders a Scrollable row with buttons as items, and a container for screen-links buttons
 * @param {Entity[]} items - Array of items to be rendered
 * @param {string} activeItem - ID of the current active item
 * @param {(id: string) => void} onItemClick - Callback to be called in the item button onClick event
 * @param {(newScreen: Screens) => void} onChangeScreen - Callback to be called to fires the change screen event.
 */
const Navbar = ({ items, activeItem, onItemClick, onChangeScreen }: NavbarProps) => {
  const containerRef = createRef<HTMLDivElement>();

  return (
    <div className={styles.container} ref={containerRef}>
      <Scrollable
        containerClasses={styles.itemsContainer}
        containerRef={containerRef}
        itemsWidth={74}
        itemsPerPage={4}
      >
        {items.map(({ id, name }) => (
          <Button
            key={uuid()}
            classes={`${styles.item} ${(id === activeItem && styles.activeItem) || ''}`}
            onClick={() => onItemClick(id)}
            children={<div className={styles.itemTitle}>{name}</div>}
          />
        ))}
      </Scrollable>

      <div className={styles.buttonsContainer}>
        <Button
          classes={styles.navbarBtn}
          children={<TimerIcon width={20} />}
          onClick={() => onChangeScreen(Screens.Timer)}
        />
        <Button
          classes={styles.navbarBtn}
          children={<SettingsIcon width={20} />}
          onClick={() => onChangeScreen(Screens.Settings)}
        />
      </div>
    </div>
  );
};

export default Navbar;
