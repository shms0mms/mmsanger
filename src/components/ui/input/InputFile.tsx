'use client'
import { FC, useEffect, useRef, useState } from 'react'
import styles from './input.module.scss'
import { Button } from '../button'
import { generateFileURL } from '@/utils/file.utils'
import InputFileImage from './InputFileImage'
import Error from '../Error'
import { FieldsValues, Register, RegisterParams } from 'react-mms-form'
export interface IInputFile<FD extends FieldsValues = object> {
	changeValue: (value: string) => void
	value?: string
	isMultiple?: boolean
	error?: string
	register: Register<FD>
	params?: RegisterParams
	name: keyof FD
}
export interface IFile extends File{url: string}
const InputFile = <FD extends FieldsValues = object>({  changeValue, isMultiple, error, name, params, register }: IInputFile<FD>) => {
	const [files, updateFiles] = useState<IFile[]>([])
	const [currentFile, updateCurrentFile] = useState<IFile | undefined>()
	const ref = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (ref.current) {
			const current = ref.current
			if(currentFile === undefined) current.value = '';
		}
	}, [currentFile === undefined])
	return <div className={styles.wrapper}>
		<input 
		ref={ref}
		className={styles.file}
		multiple={isMultiple}
		type="file" 
				onChange={(e) => 
					{
						const files = e.currentTarget.files;
						
						if (isMultiple && files?.length) {
							for(let i = 0; i< files.length; i++) {
								
								const f = files[i];
								
								
								const url = generateFileURL(f)
       						 const file = {
       						     name: f.name,
       						     size: f.size,
       						     type: f.type,
       						     lastModified: f.lastModified,
       						     url: url
       						 };
								
								updateFiles(state => [...state, file as IFile])
								updateCurrentFile({
								...file as IFile,
								})
								changeValue(url)
							}
						}
						else if (!isMultiple && files?.length) {
							const file = files[0]
							const url = generateFileURL(file)
							
							updateCurrentFile({
								...file,
								url
							})
							changeValue(url)
						}
					}
		} 
		/>
		<input className='hidden' type="text" {...register(name, params)} />
 		<Button className='w-full' type='button'>
			Добавить картинку
		</Button>
		{isMultiple ? !!files.length && <div className={styles.line}>
			{files.map((f, pk) => <InputFileImage isMultiple id={pk} updateFiles={updateFiles} {...f} key={pk} />)}
		</div> : currentFile && <InputFileImage updateCurrentFile={updateCurrentFile} {...currentFile} />}

		<Error>{error}</Error>
	</div>
}

export default InputFile