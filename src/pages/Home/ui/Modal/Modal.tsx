import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface IModalProps {
	isOpen: boolean
	modalToggle: () => void
	children: React.ReactNode
}

export const Modal = ({ isOpen, modalToggle, children }: IModalProps) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
			return () => {
				document.body.style.overflow = 'unset'
			}
		}
	}, [isOpen])

	if (!isOpen) {
		return null
	}
	const wrapperClasses = `
    fixed inset-0 z-[999] 
    flex items-center justify-center 
    bg-black/40 backdrop-blur-sm 
    p-4 transition-all
  `
	const containerClasses = `
    relative w-full max-w-lg 
    bg-white rounded-2xl shadow-2xl 
    overflow-hidden animate-in fade-in zoom-in duration-200
  `
	return createPortal(
		<div
			className={wrapperClasses}
			onClick={modalToggle}
		>
			<div
				className={containerClasses}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.body
	)
}
