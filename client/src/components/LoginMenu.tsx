import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import { loginMenu } from "../data/translation";
import { getCharacters, isLoggedIn, postLogin, postRegister } from "../queries";
import styles from "../scss/LoginMenu.module.scss";
import { LangContext, SelectedCharacterContext } from "./Context";

const withBackend = !!+import.meta.env.VITE_WITH_SERVER;

export function LoginMenu(props: {
	closeFunc: () => void;
}) {
	const handleKeyPress = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") {
			props.closeFunc()
		}
	}, [])

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);

		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [handleKeyPress]);

	const [menuType, setMenuType] = useState<"login" | "register">("login");

	const characterContext = useContext(SelectedCharacterContext);

	const registerMutation = useMutation(postRegister, {
		onSuccess: () => {
			setMenuType("login");
			setLoginEmail(regEmail);
			setLoginPass(regPass1);
		}
	});
	const loginMutation = useMutation(postLogin, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("account");
			await queryClient.invalidateQueries("characters");

			const characters = await getCharacters();

			if (characters.length > 0) {
				characterContext.setValue(characters[0].id)
			}

			props.closeFunc();
		}
	});

	function handleSubmit(e: FormEvent) {
		if (menuType === "register") {
			if (regPass1 !== regPass2) return;
			if (
				regEmail === "" ||
				regPass1 === "" ||
				regPass2 === ""
			) return;

			registerMutation.mutate({ email: regEmail, password: regPass1 });
		}
		else {
			if (
				loginEmail === "" ||
				loginPass === ""
			) return;

			loginMutation.mutate({ email: loginEmail, password: loginPass });
		}

		e.preventDefault();
	}

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPass, setLoginPass] = useState("");
	const [regEmail, setRegEmail] = useState("");
	const [regPass1, setRegPass1] = useState("");
	const [regPass2, setRegPass2] = useState("");

	const langContext = useContext(LangContext);

	return (
		<div className={styles["login-menu"]}>
			<div
				className={styles["controls"]}
			>
				<div className={styles["toggle-sign-in-up"]}>
					<button
						className={styles["sign-in"]}
						data-selected={menuType === "login"}
						onClick={() => setMenuType("login")}
					>{loginMenu.switchLogInButton[langContext.value]}</button>
					<button
						className={styles["sign-up"]}
						data-selected={menuType === "register"}
						onClick={() => setMenuType("register")}
					>{loginMenu.switchRegisterButton[langContext.value]}</button>
				</div>
				<button
					className={styles["close-icon"]}
					onClick={props.closeFunc}
				>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>

			{!withBackend && <p className={styles["no-backend-notice"]}>
				{loginMenu.noBackendNotice[langContext.value]}
			</p>}

			<form onSubmit={handleSubmit}>
				{menuType === "login" ?
					<>
						{loginMutation.isError && <p className={styles.error}>{loginMutation.error as string}</p>}
						<label>{loginMenu.email[langContext.value]}:
							<input
								value={loginEmail}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setLoginEmail(e.currentTarget.value)
								}
								type={"email"}
							/>
						</label>
						<label>{loginMenu.password[langContext.value]}:
							<input
								value={loginPass}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setLoginPass(e.currentTarget.value)
								}
								type={"password"}
							/>
						</label>
						<input
							disabled={
								!withBackend ||
								loginEmail === "" ||
								loginPass === ""
							}
							type="submit"
							value={loginMenu.logInButton[langContext.value]}
						/>
					</> :
					<>
						{(regPass1 !== regPass2) &&
							<p className={styles.error}>
								{loginMenu.passwordsNotMatching[langContext.value]}
							</p>
						}
						{registerMutation.isError && <p className={styles.error}>{registerMutation.error as string}</p>}
						<label>{loginMenu.email[langContext.value]}:
							<input
								value={regEmail}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setRegEmail(e.currentTarget.value)
								}
								type={"email"}
							/>
						</label>
						<label>{loginMenu.password[langContext.value]}:
							<input
								value={regPass1}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setRegPass1(e.currentTarget.value)
								}
								type={"password"}
							/>
						</label>
						<label>{loginMenu.repeatPassword[langContext.value]}:
							<input
								value={regPass2}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setRegPass2(e.currentTarget.value)
								}
								type={"password"}
							/>
						</label>
						<input
							type="submit"
							disabled={
								!withBackend ||
								regPass1 !== regPass2 ||
								regPass1 === "" ||
								regPass2 === "" ||
								regEmail === ""
							}
							value={loginMenu.registerButton[langContext.value]}
						/>
					</>}
			</form>
		</div>
	);
}
