import { create } from 'zustand'

import { FilterChoose } from '@/shared/api/types/Filter'

const useFilterStore = create(set => ({
	filters: [],
	setFilters: (newFilters: FilterChoose[]) => {
		set({ filters: [...newFilters] })
	}
}))

export { useFilterStore }
