import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from './routes';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppBottomTabBarIcons, AppText } from '@/components';
import { Abstracts, Event, Announcements, Speakers, Sponsors } from '@/screens';
import { useNavigate } from '@/hooks/useNavigate';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

const Tab = createBottomTabNavigator();

const AppBottomTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShadowVisible: false,
				headerTitleAlign: 'left',
				headerTitleStyle: {
					fontSize: 20,
				},
				tabBarIcon: AppBottomTabBarIcons,
				headerRight: HeaderRight,
			}}
		>
			<Tab.Screen
				name={ROUTES.EVENT}
				component={Event}
				options={{
					headerTitle: '',
					headerLeft: EventHeaderLeft,
				}}
			/>
			<Tab.Screen name={ROUTES.SPEAKERS} component={Speakers} />
			<Tab.Screen
				name={ROUTES.SPONSERS}
				component={Sponsors}
				options={{ headerTitle: 'Our Sponsors' }}
			/>
			<Tab.Screen
				name={ROUTES.ABSTRACTS}
				component={Abstracts}
				options={{ title: 'Abstracts' }}
			/>
			<Tab.Screen
				name={ROUTES.ANNOUNCEMENTS}
				component={Announcements}
				options={{
					headerTitle: 'Announcements',
					title: 'Updates',
					tabBarBadge: 3,
					tabBarBadgeStyle: styles.tabBarBadgeStyle,
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppBottomTabs;

const HeaderRight = () => {
	const navigation = useNavigate();
	const { user } = useAuth();

	return (
		<View style={styles.headerRightContainer}>
			<View
				style={[
					styles.checkInStatus,
					user?.checkedIn ? styles.checkedIn : styles.notCheckedIn,
				]}
			>
				<Ionicons
					name={user?.checkedIn ? 'checkmark-circle' : 'time'}
					size={16}
					color={COLORS.white}
				/>
				<AppText style={styles.checkInText}>
					{user?.checkedIn ? 'Checked In' : 'Check In Available'}
				</AppText>
			</View>
			<Pressable onPress={() => navigation.navigate(ROUTES.SETTINGS)}>
				<Ionicons name="settings-outline" size={24} />
			</Pressable>
		</View>
	);
};

const EventHeaderLeft = () => {
	const { user } = useAuth();
	return (
		<View
			style={{
				marginLeft: 16,
				flexDirection: 'row',
				alignItems: 'center',
				gap: 8,
			}}
		>
			<Image
				source={require('@/assets/event-poster.png')}
				style={styles.userAvatar}
			/>
			<View>
				<AppText style={styles.userName}>{user?.username}</AppText>
				<View style={styles.badge}>
					<AppText style={styles.badgeText}>{user?.category}</AppText>
				</View>
			</View>
		</View>
	);
};

const DUMMY_USER = {
	name: 'Alex Johnson',
	country: 'United States',
	category: 'Premium Attendee',
	avatar: require('@/assets/event-poster.png'),
	checkedIn: true,
};

const styles = StyleSheet.create({
	userAvatar: {
		width: 36,
		height: 36,
		borderRadius: 20,
	},
	userName: { fontSize: 16, fontWeight: '600' },
	badge: {
		backgroundColor: 'rgba(74, 144, 226, 0.1)',
		borderRadius: 4,
		paddingHorizontal: 6,
		marginTop: 2,
		paddingVertical: 2,
		alignSelf: 'flex-start',
	},
	badgeText: {
		fontSize: 10,
		color: COLORS.primary,
		fontWeight: '500',
	},

	// Header Right
	headerRightContainer: {
		gap: 12,
		flexDirection: 'row',
		marginRight: 16,
	},
	checkInStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		paddingVertical: 6,
		paddingHorizontal: 8,
		borderRadius: 20,
	},
	checkedIn: {
		backgroundColor: COLORS.success,
	},
	notCheckedIn: {
		backgroundColor: COLORS.warning,
	},
	checkInText: {
		color: COLORS.white,
		marginLeft: 6,
		fontWeight: '500',
		fontSize: 12,
	},
	tabBarBadgeStyle: {
		backgroundColor: COLORS.danger,
		fontSize: 12,
	},
});
