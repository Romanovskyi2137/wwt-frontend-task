import { StateCreator } from 'zustand'

import { FilterChoose, FilterType } from '@/shared/api/types/Filter'
import { SearchRequestOptions } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

export interface IFilterSlice {
	allFilters: FilterChoose[] | null
	activeFilters: SearchRequestOptions[]
	tempFilters: SearchRequestOptions[]

	addFilters: (filters: FilterChoose[]) => void
	setTempFilters: (filterID: string, optionID: string) => void
	applyFilters: () => void
	syncTempWithActive: () => void
	resetFilters: () => void
}

export const createFilterSlice: StateCreator<
	IFilterSlice,
	[['zustand/devtools', never]],
	[]
> = set => ({
	allFilters: null,
	activeFilters: [],
	tempFilters: [],

	addFilters: filters =>
		set({ allFilters: filters }, false, 'filters/addFilters'),

	// bassicaly its chebox click handler
	setTempFilters: (filterID, optionID) =>
		set(
			state => {
				const currentTemp = state.tempFilters
				const existingFilter = currentTemp.find(
					filter => filter.id === filterID
				)

				let nextTemp: SearchRequestOptions[]

				if (existingFilter) {
					const isSelected = existingFilter.optionsIds.includes(optionID)

					const nextOptionsIds = isSelected
						? existingFilter.optionsIds.filter(id => id !== optionID)
						: [...existingFilter.optionsIds, optionID]

					// if there is no more options in category - remove it entirely
					if (nextOptionsIds.length === 0) {
						nextTemp = currentTemp.filter(filter => filter.id !== filterID)
					} else {
						nextTemp = currentTemp.map(filter =>
							filter.id === filterID
								? { ...filter, optionsIds: nextOptionsIds }
								: filter
						)
					}
				} else {
					// if there is no match category - add it
					nextTemp = [
						...currentTemp,
						{ id: filterID, type: FilterType.OPTION, optionsIds: [optionID] }
					]
				}

				return { tempFilters: nextTemp }
			},
			false,
			'filters/setTempFilters'
		),

	applyFilters: () =>
		set(
			state => ({
				activeFilters: state.tempFilters.map(filter => ({
					...filter,
					optionsIds: [...filter.optionsIds]
				}))
			}),
			false,
			'filters/applyFilters'
		),

	syncTempWithActive: () =>
		set(
			state => ({
				tempFilters: state.activeFilters.map(filter => ({
					...filter,
					optionsIds: [...filter.optionsIds]
				}))
			}),
			false,
			'filters/syncTempWithActive'
		),

	resetFilters: () =>
		set(
			{
				activeFilters: [],
				tempFilters: []
			},
			false,
			'filters/resetFilters'
		)
})
