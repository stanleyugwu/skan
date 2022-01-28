import { GestureResponderEvent } from 'react-native';
import React from 'react';
import RippleButton from './RippleButton';
import { View } from './Themed';
import tw from '../lib/tailwind';

export type RadioButtonType = {
    active?: boolean;
    onPress?: (event:GestureResponderEvent) => void;
}

/** Simple radio input button */
const RadioButton = ({active = false,onPress}:RadioButtonType) => {
  return (
    <RippleButton accessibilityLabel='radio button' onPress={onPress} borderless lightColor='transparent'>
        <View style={tw`rounded-full p-1`} lightColor='#f2e7fe' darkColor='#ddd'>
            <View style={[tw`rounded-full`,{width:10,height:10}]} lightColor={active ? tw.color('primary') : "transparent"} darkColor={active ? tw.color('secondary') : "transparent"}/>
        </View>
    </RippleButton>
  );
};

export default React.memo(RadioButton);
