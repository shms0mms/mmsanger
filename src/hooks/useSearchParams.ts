import {
	useSearchParams as useNextSearchParams,
	usePathname,
	useRouter,
} from "next/navigation"
const useSearchParams = () => {
	const { push } = useRouter()
	const searchParams = useNextSearchParams()
	const pathname = usePathname()
	const set = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams)
		params.set(key, value)
		push(`${pathname}?${params.toString()}`)
	}

	const get = (key: string): string => {
		return searchParams.get(key) as string
	}

	const removeAll = () => {
		return push(pathname)
	}

	return { set, get, removeAll }
}

export default useSearchParams
