import { useSelector } from 'react-redux';

export function useLoadingStatus() {
  const isLoading = useSelector(state => state.application.isLoading);
  return isLoading;
}