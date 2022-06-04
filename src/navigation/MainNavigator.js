import { createNavigationContainerRef } from '@react-navigation/native';

export const mainNavigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (mainNavigationRef.isReady()) {
    mainNavigationRef.navigate(name, params);
  }
}