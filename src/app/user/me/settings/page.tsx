import BaseLayout from "@/components/layout/BaseLayout"
import Form from "./Form"
import styles from "./settings.module.scss"
export default function SettingsPage() {
	return (
		<BaseLayout>
			<div className={styles.wrapper}>
				<Form />
			</div>
		</BaseLayout>
	)
}
