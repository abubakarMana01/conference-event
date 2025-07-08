// src/context/AuthContext.tsx
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { Alert } from 'react-native';
import { COLORS } from '@/constants/colors';

interface User {
	email: string;
	// Add other user properties as needed
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (email: string, passcode: string) => Promise<void>;
	logout: () => void;
	sendPasscode: (email: string) => Promise<void>;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadUser = async () => {
			try {
				// Check if user is already authenticated (e.g., from AsyncStorage)
				// const storedUser = await AsyncStorage.getItem('user');
				// if (storedUser) setUser(JSON.parse(storedUser));
			} catch (error) {
				console.error('Failed to load user', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadUser();
	}, []);

	const login = async (email: string, passcode: string) => {
		setIsLoading(true);
		try {
			// Mock verification
			if (passcode.length !== 6) {
				throw new Error('Passcode must be 6 digits');
			}

			const authenticatedUser = { email };
			setUser(authenticatedUser);

			// Store user session
			// await AsyncStorage.setItem('user', JSON.stringify(authenticatedUser));
		} catch (error) {
			console.error('Login error:', error);
			Alert.alert(
				'Login Failed',
				error instanceof Error ? error.message : 'Invalid email or passcode',
				[{ text: 'OK', style: 'cancel' }],
				{ cancelable: false }
			);
			throw error; // Re-throw to handle in the component
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setIsLoading(true);
		try {
			setUser(null);
			Alert.alert('Logged Out', 'You have been successfully logged out');
		} catch (error) {
			console.error('Logout error:', error);
			Alert.alert('Error', 'Failed to logout');
		} finally {
			setIsLoading(false);
		}
	};

	const sendPasscode = async (email: string) => {
		setIsLoading(true);
		try {
			// Mock implementation
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
		} finally {
			setIsLoading(false);
		}
	};

	const value = {
		user,
		isLoading,
		isAuthenticated: !!user,
		login,
		logout,
		sendPasscode,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
