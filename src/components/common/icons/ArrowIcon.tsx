import ArrowSVG from '../../../misc/images/Arrow.svg';

export enum Direction {
  Left = 0,
  Right,
}

interface ArrowIconProps {
  width?: number;
  height?: number;
  classes?: string;
  direction?: Direction;
}

const ArrowIcon = ({
  width = 12,
  height = 12,
  classes = '',
  direction = Direction.Left,
}: ArrowIconProps) => {
  const getRotation = () => {
    let rotation: number = 0;

    if (direction === Direction.Left) {
      rotation = 180;
    }

    return rotation;
  };

  return (
    <img
      style={{ transform: `rotate(${getRotation()}deg)` }}
      className={classes}
      src={ArrowSVG}
      alt='Arrow'
      width={`${width}px`}
      height={`${height}px`}
    />
  );
};

export default ArrowIcon;
