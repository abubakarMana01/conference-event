import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

const RootNav = () => {
	const { isAuthenticated } = useAuth();

	return (
		<NavigationContainer theme={navigationTheme}>
			{true ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default RootNav;

const navigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: COLORS.white,
		primary: COLORS.primary,
	},
};
