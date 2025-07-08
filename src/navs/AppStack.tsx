import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBottomTabs from './AppBottomTabs';
import { ROUTES } from './routes';
import { NewsDetail, Settings, SpeakerDetails } from '@/screens';
import { useNavigate } from '@/hooks/useNavigate';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

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
			<Stack.Screen name={ROUTES.SPEAKER_DETAILS} component={SpeakerDetails} />
			<Stack.Screen
				name={ROUTES.NEWS_DETAILS}
				component={NewsDetail}
			/>
			<Stack.Screen
				name={ROUTES.SETTINGS}
				component={Settings}
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
