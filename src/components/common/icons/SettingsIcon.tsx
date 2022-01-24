import SettingsSVG from '../../../misc/images/Settings.svg';

const SettingsIcon = ({ width = 12 }) => {
  return <img src={SettingsSVG} alt='Settings' width={`${width}px`} />;
};

export default SettingsIcon;
