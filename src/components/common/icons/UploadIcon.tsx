import UploadSVG from '../../../misc/images/Upload.svg';

const UploadIcon = ({ width = 12, height = 12 }) => {
  return <img src={UploadSVG} alt='Upload' width={`${width}px`} height={`${height}px`} />;
};

export default UploadIcon;
