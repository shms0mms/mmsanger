import { FC } from "react"
import { IFile } from "./InputFile"
import { ICON_SIZE } from "@/constants/icon-size.constants"
import Image from "next/image"
import Cross from "../Cross"
import { ReactFunc } from "@/types/app"

export interface IInputFileImage extends IFile {
	isMultiple?: boolean
	updateFiles?: ReactFunc<IFile[]>
	updateCurrentFile?: ReactFunc<IFile | undefined>
	id?: number
	changeValue?:  (value: string) => void 
}

const InputFileImage: FC<IInputFileImage> = file => {
	const { name, url, isMultiple, updateFiles, updateCurrentFile, id, changeValue } = file
	const IMAGE_SIZE = 80
	return (
		<div className="relative w-20 h-20 rounded-sm overflow-hidden">
			<button
				type="button"
				className="z-10 text-destructive absolute top-1 right-1"
				onClick={() => {
					if (isMultiple && updateFiles)
						updateFiles(state => {
							const copy = state.slice()
							const index = id ?? -1

							copy.splice(index, 1)
							return [...copy]
						})
					else if (updateCurrentFile) {
						updateCurrentFile(undefined)
					changeValue && 	changeValue("")
					}
				}}
			>
				<Cross color="#007f00" size={ICON_SIZE.SM} />
			</button>
			<Image width={IMAGE_SIZE} height={IMAGE_SIZE} alt={name} src={url} />
		</div>
	)
}

export default InputFileImage
