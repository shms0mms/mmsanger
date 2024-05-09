"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { FC, PropsWithChildren } from "react"

const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
	children,
	..._props
}) => {
	return <NextThemeProvider {..._props}>{children}</NextThemeProvider>
}

export default ThemeProvider
