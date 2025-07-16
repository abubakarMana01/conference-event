import {
	Dimensions,
	Image,
	StyleSheet,
	View,
	Animated,
	TouchableWithoutFeedback,
} from 'react-native';
import React, { useRef } from 'react';
import { COLORS } from '@/constants/colors';
import { AppText } from '@/components';
import { useNavigate } from '@/hooks/useNavigate';
import { ROUTES } from '@/navs/routes';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ISpeaker } from '@/types';

interface Props {
	speaker: ISpeaker;
}

const Speaker = ({ speaker }: Props) => {
	const navigation = useNavigate();
	const scaleValue = useRef(new Animated.Value(1)).current;
	const opacityValue = useRef(new Animated.Value(1)).current;

	const topics = ['AI & ML', 'Big Data'];

	const SPEAKER_TYPE_COLORS: Record<string, string> = {
		'Keynote Speaker': '#FF5722',
		'Plenary Speaker': '#3F51B5',
		Speaker: '#4CAF50',
	};

	const handlePressIn = () => {
		Animated.parallel([
			Animated.spring(scaleValue, {
				toValue: 0.96,
				useNativeDriver: true,
			}),
			Animated.spring(opacityValue, {
				toValue: 0.9,
				useNativeDriver: true,
			}),
		]).start();
	};

	const handlePressOut = () => {
		Animated.parallel([
			Animated.spring(scaleValue, {
				toValue: 1,
				friction: 3,
				tension: 40,
				useNativeDriver: true,
			}),
			Animated.spring(opacityValue, {
				toValue: 1,
				useNativeDriver: true,
			}),
		]).start();
	};

	const handlePress = () => {
		navigation.navigate(ROUTES.SPEAKER_DETAILS, { speaker });
	};

	return (
		<TouchableWithoutFeedback
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={handlePress}
		>
			<Animated.View
				style={[
					styles.container,
					styles.featuredContainer,
					{
						transform: [{ scale: scaleValue }],
						opacity: opacityValue,
					},
				]}
			>
				{speaker.speakerType && (
					<View
						style={[
							styles.speakerType,
							{
								backgroundColor:
									SPEAKER_TYPE_COLORS[speaker.speakerType] || COLORS.primary,
							},
						]}
					>
						<Ionicons name="star" size={14} color={COLORS.white} />
						<AppText style={styles.speakerTypeText}>
							{speaker.speakerType}
						</AppText>
					</View>
				)}

				{/* Speaker image with gradient border */}
				<View style={styles.imageWrapper}>
					<LinearGradient
						colors={['#FF7D7D', '#FF5252']}
						style={styles.gradientBorder}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
					>
						<View style={styles.imageContainer}>
							{speaker.image ? (
								<Image
									source={{
										uri:
											process.env.EXPO_PUBLIC_API_URL +
											speaker.image?.formats.small.url,
									}}
									style={styles.image}
									resizeMode="cover"
								/>
							) : (
								<Ionicons name="person-circle" size={96} color={COLORS.grey2} />
							)}
						</View>
					</LinearGradient>
				</View>

				{/* Speaker info */}
				<View style={styles.infoContainer}>
					<AppText style={styles.name} numberOfLines={1}>
						{speaker.fullname}
					</AppText>

					{/* {speaker?.organisation ? ( */}
					<AppText style={styles.organization} numberOfLines={1}>
						Organisation
					</AppText>
					{/* ) : null} */}

					<AppText style={styles.position} numberOfLines={2}>
						{speaker.title}
					</AppText>

					{topics.length > 0 && (
						<View style={styles.topicsContainer}>
							{topics.slice(0, 2).map((topic, index) => (
								<View key={index} style={styles.topicTag}>
									<AppText style={styles.topicText}>{topic}</AppText>
								</View>
							))}

							{topics.length > 2 && (
								<View style={styles.moreTopics}>
									<AppText style={styles.moreTopicsText}>
										+{topics.length - 2}
									</AppText>
								</View>
							)}
						</View>
					)}
				</View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default Speaker;

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

const styles = StyleSheet.create({
	container: {
		width: CARD_WIDTH,
		borderRadius: 16,
		padding: 16,
		alignItems: 'center',
		backgroundColor: COLORS.white,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
		marginBottom: 16,
		position: 'relative',
	},
	featuredContainer: {
		borderWidth: 1,
		borderColor: COLORS.primaryLight,
	},
	speakerType: {
		position: 'absolute',
		top: 12,
		right: 12,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		zIndex: 2,
	},
	speakerTypeText: {
		color: COLORS.white,
		fontSize: 12,
		fontWeight: '600',
		marginLeft: 4,
	},
	imageWrapper: {
		marginBottom: 12,
		borderRadius: 60,
	},
	gradientBorder: {
		borderRadius: 60,
		padding: 3,
	},
	imageContainer: {
		width: 96,
		height: 96,
		borderRadius: 48,
		overflow: 'hidden',
		backgroundColor: COLORS.greyLightPlus,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	infoContainer: {
		width: '100%',
		alignItems: 'center',
	},
	name: {
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
		color: COLORS.dark,
		marginBottom: 2,
	},
	organization: {
		fontSize: 13,
		color: COLORS.primary,
		textAlign: 'center',
		fontWeight: '500',
		marginBottom: 4,
	},
	position: {
		textAlign: 'center',
		color: COLORS.grey,
		fontSize: 13,
		lineHeight: 18,
		marginBottom: 8,
	},
	topicsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: 4,
	},
	topicTag: {
		backgroundColor: 'rgba(74, 144, 226, 0.1)',
		borderRadius: 4,
		paddingHorizontal: 6,
		paddingVertical: 2,
		margin: 2,
	},
	topicText: {
		fontSize: 11,
		color: COLORS.primary,
		fontWeight: '500',
	},
	moreTopics: {
		backgroundColor: 'rgba(74, 144, 226, 0.2)',
		borderRadius: 4,
		paddingHorizontal: 6,
		paddingVertical: 2,
		margin: 2,
	},
	moreTopicsText: {
		fontSize: 11,
		color: COLORS.primary,
		fontWeight: '500',
	},
});
