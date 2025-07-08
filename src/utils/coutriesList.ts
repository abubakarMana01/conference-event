export interface Country {
  flag: string;
  dialCode: string;
  name: string;
  currency: {
    symbol: string;
    name: string;
    shortName: string;
  };
}

export const countryData: Country[] = [
  {
    flag: '🇳🇬',
    dialCode: '+234',
    name: 'Nigeria',
    currency: {
      symbol: '₦',
      name: 'Naira',
      shortName: 'NGN',
    },
  },
  {
    flag: '🇬🇧',
    dialCode: '+44',
    name: 'United Kingdom',
    currency: {
      symbol: '£',
      name: 'Pounds',
      shortName: 'GBP',
    },
  },
  // {
  //   flag: '🇺🇸',
  //   dialCode: '+1',
  //   name: 'United States',
  //   currency: {
  //     symbol: '$',
  //     name: 'Dollars',
  //     shortName: 'USD',
  //   },
  // },
];
