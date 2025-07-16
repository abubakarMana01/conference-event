import Toast from 'react-native-simple-toast';

export const showToast = (message: string) => Toast.show(message, Toast.SHORT);

export const showToastWithGravity = ({
	message,
	duration,
	gravity,
}: {
	message: string;
	duration: number;
	gravity: number;
}) => Toast.showWithGravity(message, duration || Toast.SHORT, gravity || 10);
