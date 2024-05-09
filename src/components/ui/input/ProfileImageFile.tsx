"use client"
import { useEffect, useRef, useState } from "react"
import styles from "./input.module.scss"
import Error from "../Error"
import { FieldsValues } from "react-mms-form"
import { IInputFile } from "./InputFile"
import UserAvatar from "@/app/user/all/UserAvatar"
import { EnumStatus } from "@/types/auth"
import { useMutation } from "@apollo/client"
import UploadImage from "@/schemas/user/UploadImage.graphql"
import GetCurrentUser from "@/schemas/auth/GetCurrentUser.graphql"
import { client } from "@/config/apollo.config"
import { Paperclip } from "lucide-react"
import { ICON_SIZE } from "@/constants/icon-size.constants"
export interface IProfileImageFile<FD extends FieldsValues = object>
	extends IInputFile<FD> {
	value?: string
}
export interface IFile extends File {
	url: string
}
const generateBoundary = () => {
	return (
		"----WebKitFormBoundary" +
		Math.random()
			.toString(36)
			.substring(2)
	)
}
const ProfileImageFile = <FD extends FieldsValues = object>({
	value,
	changeValue,
	isMultiple,
	error,
	name,
	params,
	register,
}: IProfileImageFile<FD>) => {
	const [currentFile, updateCurrentFile] = useState<File | undefined>()
	const ref = useRef<HTMLInputElement>(null)
	const [mutate] = useMutation(UploadImage, {
		async onCompleted() {
			await client.refetchQueries({
				include: [GetCurrentUser],
			})
		},
	})
	useEffect(() => {
		if (ref.current) {
			const current = ref.current
			if (currentFile === undefined) current.value = ""
		}
	}, [currentFile === undefined])
	return (
		<div className={styles.wrapper}>
			<input
				ref={ref}
				className={styles.file}
				multiple={isMultiple}
				type="file"
				onChange={e => {
					const files = e.target.files
					if (files && files.length > 0) {
						const file = files[0]
						updateCurrentFile(file)

						const reader = new FileReader()

						reader.onload = function(event: any) {
							const imageURL = event.target.result

							mutate({
								variables: { imageURL },
							})
						}

						reader.readAsDataURL(file)
					}
				}}
			/>
			<input className="hidden" type="text" {...register(name, params)} />
			<UserAvatar
				className="w-28 h-28"
				imageURL={value as string}
				status={"offline" as EnumStatus}
			/>
			<div className="absolute flex items-center justify-center top-0 right-0 w-8 h-8 rounded-[50%] bg-background">
				<Paperclip width={ICON_SIZE.XL} height={ICON_SIZE.XL} className="" />
			</div>

			<Error>{error}</Error>
		</div>
	)
}

export default ProfileImageFile
