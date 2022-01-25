import tw from "../lib/tailwind";

const tintColorLight = tw.color('primary');
const tintColorDark = tw.color('secondary');

export default {
  light: {
    text: tw.color('on-secondary'),
    background: tw.color('background'),
    tint: tintColorLight,
    tabIconDefault: '#999',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ffffff',
    background: tw.color('on-background'),
    tint: '#00C4B4',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
