import Toast from 'react-native-toast-message';
import RootNav from './src/navs/RootNav';
import { LogBox, View } from 'react-native';
import { AuthProvider } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function App() {
	useEffect(() => {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}, []);

	return (
		<AuthProvider>
			<View style={{ flex: 1 }}>
				<RootNav />
				<Toast />
			</View>
		</AuthProvider>
	);
}
