import Form from "./Form"
import Wrapper from "@/components/ui/Wrapper"
import styles from "../form.module.scss"
export default function LoginPage() {
	return (
		<Wrapper className={styles.wrapper}>
			<Form />
		</Wrapper>
	)
}
