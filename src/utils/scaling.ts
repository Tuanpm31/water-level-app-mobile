import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375; // iphone 6
const guidelineBaseHeight = 680;

const scale = (size: number) => Math.floor((width / guidelineBaseWidth) * size);
const verticalScale = (size: number) => Math.floor((height / guidelineBaseHeight) * size);
const moderateScale = (size: number, factor = 0.5) => Math.floor(size + (scale(size) - size) * factor);
const getLetterSpacing = (value: any) => (Platform.OS === 'ios' ? value : 0);

export { scale, verticalScale, moderateScale, getLetterSpacing };
