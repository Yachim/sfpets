import { useCallback, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../App";
import { langList } from "../data/translation";
import { langs } from "../data/translation/langList";
import { isLoggedIn, patchAccount } from "../queries";
import { LangContext } from "./Context";
import styles from "../scss/LanguageSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { languageSelect } from "../data/translation";

export function LanguageSelect(props: { closeFunc: () => void }) {
	const langContext = useContext(LangContext);

	const handleKeyPress = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") {
			props.closeFunc()
		}
	}, [])

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);

		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [handleKeyPress]);

	const accountMutation = useMutation(patchAccount, {
		onSuccess: () => {
			queryClient.invalidateQueries("account");
		}
	})

	return (
		<div className={styles.container}>
			<p>
				{languageSelect.heading[langContext.value]}
				<button
					className={styles["close-button"]}
					onClick={props.closeFunc}
				>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</p>
			<div className={styles.grid}>
				{langList.map((lang, i) =>
					<button
						key={i}
						className={styles["lang-button"]}
						title={languageSelect.tooltips[lang]}
						onClick={() => {
							if (isLoggedIn()) {
								accountMutation.mutate({
									lang: lang
								});
							}
							else {
								langContext.setValue(lang);
							}
							props.closeFunc();
						}}
					>{langs[lang]}</button>
				)}
			</div>
		</div>
	)
}
