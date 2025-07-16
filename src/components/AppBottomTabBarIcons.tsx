import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES } from '@/navs/routes';
import { useRoute } from '@react-navigation/native';

interface Props {
	focused: boolean;
	color: string;
	size: number;
}

const AppBottomTabBarIcons = ({ focused, color, size }: Props) => {
	const route = useRoute();

	let iconName: keyof typeof Ionicons.glyphMap = 'add'; // Default icon

	if (route.name === ROUTES.EVENT) {
		iconName = focused ? 'calendar' : 'calendar-outline';
	} else if (route.name === ROUTES.SPEAKERS) {
		iconName = focused ? 'people-circle' : 'people-circle-outline';
	} else if (route.name === ROUTES.SPONSERS) {
		iconName = focused ? 'ribbon' : 'ribbon-outline';
	} else if (route.name === ROUTES.ANNOUNCEMENTS) {
		iconName = focused ? 'notifications' : 'notifications-outline';
	} else if (route.name === ROUTES.ABSTRACTS) {
		iconName = focused ? 'document-text' : 'document-text-outline';
	}

	return <Ionicons name={iconName} size={size} color={color} />;
};

export default AppBottomTabBarIcons;
