import CriteriaPanel from './CriteriaPanel';

interface ICriteriaPanelControllerProps {
  onDone: () => void;
}

const CriteriaPanelController = ({ onDone }: ICriteriaPanelControllerProps) => {
  return <CriteriaPanel onDone={onDone} />;
};

export default CriteriaPanelController;
