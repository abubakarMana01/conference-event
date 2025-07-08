import Toast from 'react-native-toast-message';

export const showToast = (message: string, toastType?: 'success' | 'error') =>
  Toast.show({
    type: toastType || 'success',
    text1: message,
    topOffset: 80,
  });
