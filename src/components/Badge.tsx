import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';

const Badge = () => {
	return (
		<View
			style={{
				width: 8,
				height: 8,
				borderRadius: 5,
				position: 'absolute',
				top: 0,
				right: 2,
				backgroundColor: COLORS.danger,
			}}
		/>
	);
};

export default Badge;

const styles = StyleSheet.create({});
