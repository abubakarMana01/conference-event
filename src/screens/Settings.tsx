import {
	StyleSheet,
	View,
	TouchableOpacity,
	Switch,
	ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Screen } from '@/components';
import { AppText } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

type SettingsOption = {
	title: string;
	icon: string;
	action?: () => void;
	rightComponent?: React.ReactNode;
};

type SettingsSection = {
	title: string;
	icon: string;
	options: SettingsOption[];
};

const Settings = () => {
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [darkModeEnabled, setDarkModeEnabled] = useState(false);
	const { logout } = useAuth();

	const settingsOptions: SettingsSection[] = [
		{
			title: 'Account',
			icon: 'person-outline',
			options: [
				{
					title: 'Edit Profile',
					icon: 'create-outline',
					action: () => console.log('Edit Profile'),
				},
				{
					title: 'Change Password',
					icon: 'lock-closed-outline',
					action: () => console.log('Change Password'),
				},
			],
		},
		{
			title: 'Preferences',
			icon: 'settings-outline',
			options: [
				{
					title: 'Notifications',
					icon: 'notifications-outline',
					rightComponent: (
						<Switch
							value={notificationsEnabled}
							onValueChange={setNotificationsEnabled}
							thumbColor={COLORS.white}
							trackColor={{ false: COLORS.greyLight, true: COLORS.primary }}
						/>
					),
				},
				{
					title: 'Dark Mode',
					icon: 'moon-outline',
					rightComponent: (
						<Switch
							value={darkModeEnabled}
							onValueChange={setDarkModeEnabled}
							thumbColor={COLORS.white}
							trackColor={{ false: COLORS.greyLight, true: COLORS.primary }}
						/>
					),
				},
			],
		},
		{
			title: 'Support',
			icon: 'help-circle-outline',
			options: [
				{
					title: 'Help Center',
					icon: 'help-buoy-outline',
					action: () => console.log('Help Center'),
				},
				{
					title: 'Contact Us',
					icon: 'mail-outline',
					action: () => console.log('Contact Us'),
				},
				{
					title: 'About',
					icon: 'information-circle-outline',
					action: () => console.log('About'),
				},
			],
		},
	];

	return (
		<ScrollView>
			<Screen style={styles.container}>
				<View style={styles.content}>
					{settingsOptions.map((section, sectionIndex) => (
						<View key={sectionIndex} style={styles.section}>
							<View style={styles.sectionHeader}>
								<AppText style={styles.sectionTitle}>{section.title}</AppText>
							</View>

							<View style={styles.sectionContent}>
								{section.options.map((option, optionIndex) => (
									<TouchableOpacity
										key={optionIndex}
										style={styles.option}
										onPress={option.action}
										activeOpacity={0.7}
									>
										<View style={styles.optionLeft}>
											<Ionicons
												name={option.icon as any}
												size={20}
												color={COLORS.grey}
											/>
											<AppText style={styles.optionText}>
												{option.title}
											</AppText>
										</View>
										{option.rightComponent || (
											<Ionicons
												name="chevron-forward"
												size={20}
												color={COLORS.greyLight}
											/>
										)}
									</TouchableOpacity>
								))}
							</View>
						</View>
					))}
				</View>

				<TouchableOpacity
					style={styles.logoutButton}
					onPress={logout}
					activeOpacity={0.7}
				>
					<Ionicons name="log-out-outline" size={24} color={COLORS.white} />
					<AppText style={styles.logoutText}>Logout</AppText>
				</TouchableOpacity>
			</Screen>
		</ScrollView>
	);
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: 20,
		paddingBottom: 10,
	},
	headerText: {
		fontSize: 28,
		fontWeight: 'bold',
		color: COLORS.dark,
	},
	content: {
		flex: 1,
		paddingHorizontal: 12,
		paddingTop: 24,
	},
	section: {
		marginBottom: 24,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: COLORS.dark,
		marginLeft: 12,
	},
	sectionContent: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		overflow: 'hidden',
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	option: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 16,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.greyLightPlus,
	},
	optionLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	optionText: {
		fontSize: 16,
		color: COLORS.dark,
		marginLeft: 16,
	},
	logoutButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.danger,
		padding: 16,
		margin: 16,
		borderRadius: 12,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	logoutText: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.white,
		marginLeft: 12,
	},
});
