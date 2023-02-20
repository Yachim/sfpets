import { useMutation } from "react-query";
import { queryClient } from "../App";
import { postLogout } from "../queries";
import styles from "../scss/UserSettings.module.scss";

export function UserSettings() {
	const logoutMutation = useMutation(postLogout, {
		onSuccess: () => queryClient.invalidateQueries("account")
	})

	return (
		<div className={styles.menu}>
			<button onClick={() => logoutMutation.mutate()}>Log out</button>
		</div>
	)
}
