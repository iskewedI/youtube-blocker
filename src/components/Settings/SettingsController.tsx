import Settings from './Settings';

interface SettingsControllerProps {
  onScreenReturn: () => void;
}

const SettingsController = ({ onScreenReturn }: SettingsControllerProps) => {
  const handleCancel = () => {
    onScreenReturn();
  };

  const handleDone = () => {
    onScreenReturn();
  };

  return <Settings onCancel={handleCancel} onDone={handleDone} />;
};

export default SettingsController;
