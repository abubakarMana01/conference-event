import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppText, Screen } from '@/components';

const ComingSoon = () => {
	return (
		<Screen style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<AppText>Coming Soon</AppText>
		</Screen>
	);
};

export default ComingSoon;

const styles = StyleSheet.create({});
