import DownloadSVG from '../../../misc/images/Download.svg';

const DownloadIcon = ({ width = 12 }) => {
  return <img src={DownloadSVG} alt='Download' width={`${width}px`} />;
};

export default DownloadIcon;
