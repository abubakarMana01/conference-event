import { showToast } from './showToast';

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const NUMBER_REGEX = /^[0-9]+$/;
export const MONEY_AMOUNT_REGEX = /^[0-9]+(?:,[0-9]{3})*(\.[0-9]{1,2})?/;

export { countryData } from './coutriesList';
export { showToast } from './showToast';
export type { Country } from './coutriesList';

export const toTitleCase = (str: string) => {
	// converting first letter to uppercase
	const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

	return capitalized;
};

export const formatNumber = (numString: string) => {
	// Convert to number in case input is a string
	let number = parseFloat(numString);

	// Format number to 2 decimal places with comma separators
	return number.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};
