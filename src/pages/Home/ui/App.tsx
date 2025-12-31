import { useTranslation } from 'react-i18next'

import { useBoundStore } from '@store'

import { Modal } from './Modal/Modal'

export const App = () => {
	const { t } = useTranslation()

	const isModalOpen = useBoundStore(state => state.isModalOpen)
	const toggleModal = useBoundStore(state => state.toggleModal)

	return (
		<section className="w-full h-dvh flex items-center justify-center flex-col">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>
			<button
				className="uppercase tracking-wide bg-gray-100 hover:bg-gray-300 transition ease-in-out duration-300 px-10 py-5 border-solid rounded border-1 border-gray-600 text-gray-600"
				onClick={toggleModal}
			>
				{t('button-text.clickme')}
			</button>
			<Modal
				isOpen={isModalOpen}
				modalToggle={toggleModal}
			>
				<h2></h2>
			</Modal>
		</section>
	)
}
