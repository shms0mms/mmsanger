"use client"
import { ERRORS } from "@/constants/errors.constants"
import { Input } from "./input"
import { FieldsValues, Register, RegisterParams } from "react-mms-form"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { ICON_SIZE } from "@/constants/icon-size.constants"

export interface InputProps<FD extends FieldsValues = object>
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
	register: Register<FD>
	params?: RegisterParams
	error?: string
}
const InputPassword = <FD extends FieldsValues = {}>({
	error,
	register,
	..._props
}: InputProps<FD>) => {
	const [isHidden, updateHidden] = useState(true)
	return (
		<div className="relative">
			<Input
				error={error}
				register={register}
				type={isHidden ? "password" : "text"}
				params={{
					required: { value: true, message: ERRORS.required },
					minLength: { value: 8, message: ERRORS.minLengthMustBe8 },
				}}
				placeholder="Пароль (не менее 8 символов)"
				name={"password"}
				{..._props}
			/>
			<button
				type="button"
				className="bg-background absolute top-1/2 -translate-y-1/2 right-3 z-10"
				onClick={() => updateHidden(!isHidden)}
			>
				{isHidden ? (
					<EyeOff width={ICON_SIZE.DEFAULT} height={ICON_SIZE.DEFAULT} />
				) : (
					<Eye width={ICON_SIZE.DEFAULT} height={ICON_SIZE.DEFAULT} />
				)}
			</button>
		</div>
	)
}

export default InputPassword
