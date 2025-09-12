import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Image,
	SafeAreaView,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { AppText } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import Toast from 'react-native-simple-toast';
import { showToastWithGravity } from '@/utils/showToast';

const Login = () => {
	const [email, setEmail] = useState('');
	const [passcode, setPasscode] = useState('');
	const [showPasscode, setShowPasscode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { login } = useAuth();

	const handleResendPasscode = () => {
		console.log('Resending passcode to:', email);
	};

	const handleLogin = async () => {
		setIsLoading(true);
		try {
			await login(email, passcode);
			showToastWithGravity({
				message: 'Login successful',
				duration: Toast.LONG,
				gravity: 10,
			});
		} catch (error: any) {
			console.log('Login failed:', error);
			if (error.response?.data?.error?.message) {
				console.log(error.response.data.error.message);
			} else {
				console.log('Login failed. Please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.wrapper}>
			<View style={styles.container}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.keyboardAvoidingView}
				>
					<View style={styles.logoContainer}>
						<Image
							source={require('@/assets/scibiz-logo.png')}
							style={styles.logo}
							resizeMode="contain"
						/>
						<AppText style={styles.title}>Event Access</AppText>
						<AppText style={styles.subtitle}>
							Please enter your email and passcode which was sent to your email
							address when you registered for the event.
						</AppText>
					</View>

					<View
						style={{
							flex: 1,
							marginTop: Dimensions.get('window').height > 600 ? 80 : 60,
						}}
					>
						<View style={styles.formContainer}>
							<View style={styles.inputWrapper}>
								<View style={styles.inputContainer}>
									<Ionicons
										name="mail-outline"
										size={20}
										color={COLORS.grey}
										style={styles.inputIcon}
									/>
									<TextInput
										style={styles.input}
										placeholder="Event registration email"
										placeholderTextColor={COLORS.grey}
										value={email}
										onChangeText={setEmail}
										keyboardType="email-address"
										autoCapitalize="none"
										autoCorrect={false}
										autoFocus
									/>
								</View>
							</View>

							<View style={styles.inputWrapper}>
								<View style={styles.inputContainer}>
									<Ionicons
										name="lock-closed-outline"
										size={20}
										color={COLORS.grey}
										style={styles.inputIcon}
									/>
									<TextInput
										style={styles.input}
										placeholder="Enter passcode here"
										placeholderTextColor={COLORS.grey}
										value={passcode}
										onChangeText={setPasscode}
										secureTextEntry={!showPasscode}
										maxLength={6}
									/>
									<TouchableOpacity
										onPress={() => setShowPasscode(!showPasscode)}
										style={styles.visibilityToggle}
									>
										<Ionicons
											name={showPasscode ? 'eye-off-outline' : 'eye-outline'}
											size={20}
											color={COLORS.grey}
										/>
									</TouchableOpacity>
								</View>
							</View>

							{/* Resend Passcode Link */}
							<TouchableOpacity onPress={handleResendPasscode}>
								<AppText style={styles.resendText}>
									Didn't receive passcode?{' '}
									<AppText style={styles.resendLink}>Resend</AppText>
								</AppText>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.loginButton,
									(isLoading || !email || passcode.length < 6) &&
										styles.disabledButton,
								]}
								onPress={handleLogin}
								disabled={isLoading || !email || passcode.length < 6}
							>
								{isLoading ? (
									<ActivityIndicator size="small" color={COLORS.white} />
								) : (
									<AppText style={styles.buttonText}>
										{isLoading ? 'VERIFYING...' : 'VERIFY & ENTER'}
									</AppText>
								)}
							</TouchableOpacity>
						</View>

						<View style={styles.footer}>
							<AppText style={styles.footerText}>
								Having trouble logging in?
							</AppText>
							<TouchableOpacity>
								<AppText style={styles.helpLink}>Get Help</AppText>
							</TouchableOpacity>
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	wrapper: { flex: 1 },
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingHorizontal: 24,
		paddingTop: 24,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	logoContainer: {
		paddingTop: Platform.select({
			ios: 0,
			android: 16,
		}),
	},
	logo: {
		width: 80,
		height: 80,
		borderRadius: 16,
		objectFit: 'contain',
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: COLORS.dark,
		marginBottom: 8,
	},
	subtitle: {
		color: COLORS.grey,
	},
	formContainer: {},
	inputWrapper: {
		marginBottom: 20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: COLORS.greyLight,
		borderRadius: 8,
		paddingHorizontal: 14,
		backgroundColor: COLORS.white,
		height: 50,
	},
	inputIcon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		color: COLORS.dark,
	},
	visibilityToggle: {
		padding: 8,
		paddingRight: 0,
	},
	resendText: {
		color: COLORS.grey,
		textAlign: 'center',
		marginBottom: 30,
	},
	resendLink: {
		color: COLORS.primary,
		fontWeight: 'bold',
	},
	loginButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 8,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	disabledButton: {
		backgroundColor: COLORS.greyLight,
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
	footer: {
		alignItems: 'center',
		marginTop: 'auto',
		marginBottom: Platform.select({
			android: 12,
			ios: 0,
			web: 12,
		}),
	},
	footerText: {
		color: COLORS.grey,
		marginBottom: 4,
	},
	helpLink: {
		color: COLORS.primary,
		fontWeight: 'bold',
	},
});
