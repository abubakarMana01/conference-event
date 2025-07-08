import {
	CommonActions,
	NavigationProp,
	ParamListBase,
	useNavigation,
	useNavigationState,
	useRoute as useRoute_,
} from '@react-navigation/native';
import { useEffect } from 'react';

type IRoutePayload = {
	[key: string]: any;
};

type IuseRoute = {
	key: string;
	name: string;
	params: IRoutePayload;
	path: string | undefined;
};

export const useNavigate = () => {
	const { canGoBack, goBack, navigate, setOptions } =
		useNavigation<NavigationProp<ParamListBase>>();

	const navigateTo = (screen: string, params?: IRoutePayload) =>
		navigate(screen, params);

	return { canGoBack, goBack, navigate: navigateTo, setOptions };
};

export const useRoute = (): IuseRoute => useRoute_();

// Reset the Route stack to go back home
// Expecially important when you have finished a journry
// and you want the user to go back home
export const useResetRoute = (
	resetCondition: boolean,
	params: IRoutePayload
) => {
	const { dispatch } = useNavigation();
	const state = useNavigationState((state) => state);
	const { name } = useRoute_();

	useEffect(() => {
		if (resetCondition) {
			dispatch(
				CommonActions.reset({
					index: 1,
					key: state.key,
					routes: [
						{ name: 'Main', path: undefined },
						{ name, params, path: undefined },
					],
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
