import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch } from './index';

export const useStoreDispatch = () => useDispatch<Dispatch>();
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
