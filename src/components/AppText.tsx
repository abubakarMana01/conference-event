import {
	StyleSheet,
	Text as RNText,
	TextStyle,
	StyleProp,
	TextProps,
} from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';

interface Props extends TextProps {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
}

const AppText: React.FC<Props> = ({ children, style, ...rest }) => {
	return (
		<RNText style={[styles.text, style]} {...rest}>
			{children}
		</RNText>
	);
};

export default AppText;

const styles = StyleSheet.create({
	text: {
		color: COLORS.black,
	},
});
