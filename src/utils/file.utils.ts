export const generateFileURL = (file: File) =>
	URL.createObjectURL(file).toString()
