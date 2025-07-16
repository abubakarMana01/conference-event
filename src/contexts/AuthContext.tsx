// src/context/AuthContext.tsx
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { loginUser } from '@/services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '@/constants/colors';
import { showToast } from '@/utils';

interface User {
	email: string;
}

interface AuthContextType {
	user: User | null;
	login: (email: string, passcode: string) => Promise<void>;
	logout: () => void;
	sendPasscode: (email: string) => Promise<void>;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAppLoading, setIsAppLoading] = useState(true);

	useEffect(() => {
		const loadStoredUser = async () => {
			const stored = await AsyncStorage.getItem('auth');
			if (stored) {
				const parsed = JSON.parse(stored);
				setUser(parsed.user);
			}
			setIsAppLoading(false);
		};
		loadStoredUser();
	}, []);

	const login = async (email: string, passcode: string) => {
		try {
			if (passcode.length !== 6) {
				throw new Error('Passcode must be 6 digits');
			}

			console.log('Payload', email, passcode);
			const res = await loginUser(email, passcode);
			setUser(res.user);
			await AsyncStorage.setItem('auth', JSON.stringify(res));
		} catch (error) {
			console.error('Login error:', error);
			Alert.alert(
				'Login Failed',
				error instanceof Error ? error.message : 'Invalid email or passcode',
				[{ text: 'OK', style: 'cancel' }],
				{ cancelable: false }
			);
			throw error;
		} finally {
			setIsAppLoading(false);
		}
	};

	const logout = async () => {
		try {
			await AsyncStorage.removeItem('auth');
			setUser(null);
			// Alert.alert('Logged Out', 'You have been successfully logged out');
			showToast('You have been successfully logged out');
		} catch (error) {
			console.error('Logout error:', error);
			Alert.alert('Error', 'Failed to logout');
		}
	};

	const sendPasscode = async (email: string) => {
		try {
			Alert.alert(
				'Passcode Sent',
				`A 6-digit passcode has been sent to ${email}`,
				[{ text: 'OK', style: 'cancel' }],
				{ cancelable: false }
			);
		} catch (error) {
			console.error('Passcode sending error:', error);
			Alert.alert(
				'Error',
				'Failed to send passcode. Please try again.',
				[{ text: 'OK', style: 'cancel' }],
				{ cancelable: false }
			);
			throw error;
		}
	};

	const value = {
		user,
		isAuthenticated: !!user,
		login,
		logout,
		sendPasscode,
	};

	if (isAppLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color={COLORS.primary} />
			</View>
		);
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
