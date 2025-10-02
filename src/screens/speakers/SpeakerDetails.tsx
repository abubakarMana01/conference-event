import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	Linking,
	TouchableOpacity,
	Platform,
	StatusBar,
} from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@/hooks/useNavigate';

const SpeakerDetails = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const speaker = route.params?.speaker;

	const handleSocialPress = (type: 'twitter' | 'linkedin' | 'website') => {
		let url = '';
		switch (type) {
			case 'twitter':
				url = `https://twitter.com/${speaker?.social?.twitter}`;
				break;
			case 'linkedin':
				url = `https://linkedin.com/${speaker?.social?.linkedin}`;
				break;
			case 'website':
				url = `http://${speaker?.social?.website}`;
				break;
		}
		Linking.openURL(url).catch((err) =>
			console.error("Couldn't load page", err)
		);
	};

	return (
		<View style={styles.container}>
			{Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

			<TouchableOpacity
				style={styles.backButton}
				onPress={() => navigation.goBack()}
			>
				<Ionicons name="arrow-back" size={24} color={COLORS.white} />
			</TouchableOpacity>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{/* Header with back button */}
				<LinearGradient
					colors={['rgba(0,0,0,0.8)', 'transparent']}
					style={styles.gradient}
				>
					{speaker.image?.formats?.small?.url ? (
						<Image
							source={{
								uri:
									process.env.EXPO_PUBLIC_API_URL +
									speaker.image.formats?.small?.url,
							}}
							style={styles.speakerImage}
							resizeMode="cover"
						/>
					) : (
						<Ionicons
							name="person-circle"
							size={195}
							color={COLORS.grey2}
							style={[
								{
									backgroundColor: COLORS.greyLight,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 100,
								},
							]}
						/>
					)}
				</LinearGradient>
				{/* Speaker Info */}
				<View style={styles.infoContainer}>
					<Text style={styles.name}>
						{speaker.title} {speaker.fullname}
					</Text>
					{/* <Text style={styles.position}>{speaker.position}</Text> */}
					{/* <Text style={styles.institution}>{speaker.institution}</Text> */}

					{/* Divider */}
					<View style={styles.divider} />

					{/* Bio Section */}
					<Text style={styles.sectionTitle}>About</Text>
					<Text style={styles.bio}>{speaker.profile}</Text>

					{/* Social Links */}
					<Text style={styles.sectionTitle}>Connect</Text>
					<View style={styles.socialContainer}>
						<TouchableOpacity
							style={styles.socialButton}
							onPress={() => handleSocialPress('twitter')}
						>
							<Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
							<Text style={styles.socialText}>Twitter</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.socialButton}
							onPress={() => handleSocialPress('linkedin')}
						>
							<Ionicons name="logo-linkedin" size={24} color="#0077B5" />
							<Text style={styles.socialText}>LinkedIn</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.socialButton}
							onPress={() => handleSocialPress('website')}
						>
							<Ionicons name="globe-outline" size={24} color={COLORS.primary} />
							<Text style={styles.socialText}>Website</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default SpeakerDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	scrollContainer: {
		paddingBottom: 40,
	},
	gradient: {
		height: 350,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: -50,
		paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
	},
	backButton: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 0 + 10,
		left: 20,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: COLORS.grey,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
	},
	speakerImage: {
		width: 200,
		height: 200,
		borderRadius: 100,
		borderWidth: 4,
		borderColor: COLORS.white,
	},
	infoContainer: {
		backgroundColor: COLORS.white,
		borderRadius: 20,
		padding: 25,
		marginHorizontal: 20,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
		marginTop: 50,
	},
	name: {
		fontSize: 28,
		fontWeight: 'bold',
		color: COLORS.dark,
		textAlign: 'center',
		marginBottom: 5,
	},
	position: {
		fontSize: 18,
		color: COLORS.primary,
		textAlign: 'center',
		fontWeight: '600',
		marginBottom: 5,
	},
	institution: {
		fontSize: 16,
		color: COLORS.grey,
		textAlign: 'center',
		marginBottom: 20,
	},
	divider: {
		height: 1,
		backgroundColor: COLORS.greyLight,
		marginVertical: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: COLORS.dark,
		marginBottom: 15,
	},
	bio: {
		fontSize: 16,
		lineHeight: 24,
		color: COLORS.greyDark,
		marginBottom: 25,
	},
	socialContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	socialButton: {
		alignItems: 'center',
		padding: 10,
		borderRadius: 10,
		backgroundColor: COLORS.greyLightPlus,
		width: '30%',
	},
	socialText: {
		marginTop: 5,
		fontSize: 12,
		color: COLORS.greyDark,
	},
});
