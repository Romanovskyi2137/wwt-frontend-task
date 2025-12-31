import { StateCreator } from 'zustand'

export interface IModalSlice {
	isModalOpen: boolean
	toggleModal: () => void
}

export const createModalSlice: StateCreator<
	IModalSlice,
	[['zustand/devtools', never]],
	[]
> = set => ({
	isModalOpen: false,
	toggleModal: () =>
		set(
			state => ({ isModalOpen: !state.isModalOpen }),
			false,
			'modal/modalToggle'
		)
})
