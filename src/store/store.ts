import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { IFilterSlice, createFilterSlice } from './slices/filterSlice'
import { IModalSlice, createModalSlice } from './slices/modalSlice'

export interface IFullStore extends IFilterSlice, IModalSlice {}

export const useBoundStore = create<IFullStore>()(
	devtools((set, get, store) => ({
		...createModalSlice(set, get, store),
		...createFilterSlice(set, get, store)
	}))
)
