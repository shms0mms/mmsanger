import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldsValues, Register, RegisterParams } from "react-mms-form"
import Star from "../Star"
import Error from "../Error"

export interface TextareaProps<FD extends FieldsValues = object>
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
	register: Register<FD>
	params?: RegisterParams
	error?: string 
	name: keyof FD
}

const Textarea = <FD extends FieldsValues = object>({
	className,
	name,
	error,
	params,
	register,
	...props
}: TextareaProps<FD>) => {
	return (
	<div className="w-full h-full relative">
			<textarea
				{...register(name, params)}
				className={cn(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}
			/>
			{params?.required?.value && <Star className="absolute text-lg top-1 right-1" /> }
			 <Error className={`absolute top-[95%] left-0 transition-all duration-300 ease-in-out ${!!error ? 'opacity-100' : 'opacity-0'}`}>{error}</Error>
		</div>
	)
}
Textarea.displayName = "Textarea"

export { Textarea }
