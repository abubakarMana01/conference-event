import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { IAbstract } from '@/types';
import { COLORS } from '@/constants/colors';

interface Props {
	abstract: IAbstract;
}

const Abstract = ({ abstract }: Props) => {
	const handleOpenPdf = (url: string) => {
		if (url) {
			const fullUrl = url.startsWith('http')
				? url
				: `${process.env.EXPO_PUBLIC_API_URL}${url}`;
			Linking.openURL(fullUrl).catch((err) =>
				console.error('Failed to open PDF:', err)
			);
		}
	};

	return (
		<View style={styles.abstractCard}>
			<Image
				source={require('@/assets/theme-poster.png')}
				style={styles.abstractImage}
			/>
			<LinearGradient
				colors={['rgba(0,0,0,0.7)', 'transparent']}
				style={styles.imageGradient}
			/>
			<View style={styles.abstractContent}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: 12,
					}}
				>
					<View style={styles.categoryTag}>
						<AppText style={styles.categoryText}>
							{abstract.category || 'Uncategorized'}
						</AppText>
					</View>

					<AppText
						style={{ fontSize: 14, fontWeight: 'semibold', color: COLORS.grey }}
						numberOfLines={3}
					>
						{abstract.abstract_id}
					</AppText>
				</View>

				<AppText style={styles.abstractTitle} numberOfLines={3}>
					{abstract.title}
				</AppText>

				<AppText style={styles.authors}>
					Authors: {abstract.coAuthors.map((author) => author.name).join(', ')}
				</AppText>

				<View style={styles.abstractFooter}>
					{/* <AppText style={styles.abstractAuthors}>{abstract.name}</AppText> */}

					<Pressable
						style={styles.downloadButton}
						onPress={() => handleOpenPdf(abstract.abstract?.url)}
					>
						<AppText style={styles.downloadText}>View PDF</AppText>
						<Ionicons name="download" size={16} color={COLORS.white} />
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default Abstract;

const styles = StyleSheet.create({
	abstractCard: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		overflow: 'hidden',
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
		borderWidth: 0.5,
		borderColor: COLORS.greyLight,
		marginBottom: 16,
	},
	abstractImage: {
		width: '100%',
		height: 160,
	},
	imageGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: '30%',
	},
	abstractContent: {
		padding: 16,
		paddingBottom: 6,
	},
	categoryTag: {
		alignSelf: 'flex-start',
		backgroundColor: 'rgba(74, 144, 226, 0.1)',
		borderRadius: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	categoryText: {
		fontSize: 12,
		fontWeight: '500',
		color: COLORS.primary,
	},
	abstractTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.dark,
		marginBottom: 8,
		lineHeight: 24,
	},
	abstractAuthors: {
		fontSize: 14,
		color: COLORS.primary,
		// marginBottom: 12,
		fontStyle: 'italic',
	},
	abstractSummary: {
		fontSize: 14,
		color: COLORS.greyDark,
		lineHeight: 20,
		marginBottom: 16,
	},
	abstractFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 6,
	},
	abstractDate: {
		fontSize: 12,
		color: COLORS.grey,
	},
	downloadButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	downloadText: {
		fontSize: 14,
		color: COLORS.white,
		marginRight: 8,
		fontWeight: '500',
	},
	authors: {
		marginTop: 8,
		fontSize: 14,
		color: COLORS.grey,
		marginBottom: 12,
	},
});
