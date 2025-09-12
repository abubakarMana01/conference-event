import Toast from 'react-native-toast-message';
import RootNav from './src/navs/RootNav';
import { LogBox, Platform, StatusBar, View } from 'react-native';
import { AuthProvider } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
	useEffect(() => {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<View style={{ flex: 1 }}>
					{Platform.OS === 'android' && (
						<StatusBar barStyle="dark-content" backgroundColor="#fff" />
					)}
					<RootNav />
					<Toast />
				</View>
			</AuthProvider>
		</QueryClientProvider>
	);
}
