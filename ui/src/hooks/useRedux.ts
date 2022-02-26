/* Products router
 * Originally written by Prawira Genestonlia
 * Created on 26 Feb 2022
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState as RState, AppDispatch } from '../redux/store';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RState> = useSelector;
export type RootState = RState;
