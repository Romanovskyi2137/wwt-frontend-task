import { useQuery } from '@tanstack/react-query'

import { FilterItem } from '@/shared/api/types/Filter'

// filterData.json moved from src to public/api for prod build purposes,
//  check more in README.md -> Notes for Reviewer

const BASE_URL = '/api/filterData.json'

const useFetchFilters = () => {
	return useQuery<FilterItem[]>({
		queryKey: ['filters'],
		queryFn: async () => {
			const res = await fetch(BASE_URL)

			if (!res.ok) {
				throw new Error('filters loading went wrong')
			}

			return res.json()
		}
	})
}

export { useFetchFilters }
