import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBottomTabs from './AppBottomTabs';
import { ROUTES } from './routes';
import { Settings, SpeakerDetails, ComingSoon } from '@/screens';
import { useNavigate } from '@/hooks/useNavigate';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import EventDetails from '@/screens/home/EventDetails';

const Stack = createNativeStackNavigator();

const AppStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				headerLeft: () => <HeaderLeft />,
				headerTitleAlign: 'center',
			}}
		>
			<Stack.Screen name="Root" component={AppBottomTabs} />
			<Stack.Screen
				name={ROUTES.EVENT_DETAILS}
				component={EventDetails}
				options={{ headerShown: true }}
			/>
			<Stack.Screen name={ROUTES.SPEAKER_DETAILS} component={SpeakerDetails} />
			<Stack.Screen
				name={ROUTES.SETTINGS}
				component={Settings}
				options={{ headerShown: true }}
			/>
			<Stack.Screen
				name={ROUTES.COMING_SOON}
				component={ComingSoon}
				options={{ headerShown: true }}
			/>
		</Stack.Navigator>
	);
};

export default AppStack;

const HeaderLeft = () => {
	const { goBack } = useNavigate();

	return (
		<TouchableOpacity style={styles.backButton} onPress={goBack}>
			<Ionicons name="arrow-back" size={24} color={COLORS.dark} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		left: Platform.select({ web: 8, ios: -8, android: -8 }),
	},
});
