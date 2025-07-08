import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
import React, { PropsWithChildren } from 'react';

interface Props {
	noPadding?: boolean;
	style?: ViewStyle;
}

const Screen: React.FC<PropsWithChildren<Props>> = ({
	children,
	noPadding,
	style,
}) => {
	return (
		<SafeAreaView
			style={[
				styles.container,
				{
					paddingTop: noPadding ? 0 : 16,
					paddingBottom: noPadding ? 0 : 16,
					paddingHorizontal: noPadding ? 0 : 16,
				},
				style,
			]}
		>
			{children}
		</SafeAreaView>
	);
};

export default Screen;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
});
