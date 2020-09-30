import { PixelRatio } from 'react-native';

export const PROTOTYPE_DIMENSIONS = {
  width: 375,
  height: 667,
};

type sizeProps = {
  origin_size: number;
  destination_size: number;
  size: number;
};

export const scale = ({ origin_size, destination_size, size }: sizeProps) => {
  return PixelRatio.roundToNearestPixel(
    (size / origin_size) * destination_size
  );
};