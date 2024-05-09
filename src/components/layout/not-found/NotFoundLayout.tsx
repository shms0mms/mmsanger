import NotFoundButton from "./NotFoundButton"

export default function NotFoundLayout() {
	return (
		<div className="flex items-center justify-center h-full w-full flex-col">
			<div className="text-9xl opacity-40">404</div>
			<div className="opacity-40 mb-8">Страница не найдена</div>
			<NotFoundButton />
		</div>
	)
}
