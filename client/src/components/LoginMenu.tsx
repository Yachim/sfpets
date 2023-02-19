import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../App";
import { postLogin, postRegister } from "../queries";
import styles from "../scss/LoginMenu.module.scss";

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

	const registerMutation = useMutation(postRegister, {
		onSuccess: () => {
			setMenuType("login");
			setLoginEmail(regEmail);
			setLoginPass(regPass1);
		}
	});
	const loginMutation = useMutation(postLogin, {
		onSuccess: async (data) => {
			if (data.status === "success") {
				await queryClient.invalidateQueries("account");
				props.closeFunc();
			}
		}
	});

	function handleSubmit(e: FormEvent) {
		if (menuType === "register") {
			if (regPass1 !== regPass2) return;

			registerMutation.mutate({ email: regEmail, password: regPass1 });
		}
		else {
			loginMutation.mutate({ email: loginEmail, password: loginPass });
		}

		e.preventDefault();
	}

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPass, setLoginPass] = useState("");
	const [regEmail, setRegEmail] = useState("");
	const [regPass1, setRegPass1] = useState("");
	const [regPass2, setRegPass2] = useState("");

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
					>Log in</button>
					<button
						className={styles["sign-up"]}
						data-selected={menuType === "register"}
						onClick={() => setMenuType("register")}
					>Register</button>
				</div>
				<button
					className={styles["close-icon"]}
					onClick={props.closeFunc}
				>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>
			<form onSubmit={handleSubmit}>
				{menuType === "login" ?
					<>
						{loginMutation.data?.status === "error" && <p className={styles.error}>{loginMutation.data.message}</p>}
						<label>Email:
							<input
								value={loginEmail}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setLoginEmail(e.currentTarget.value)
								}
								type={"email"}
							/>
						</label>
						<label>Password:
							<input
								value={loginPass}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setLoginPass(e.currentTarget.value)
								}
								type={"password"}
							/>
						</label>
						<input type="submit" value="Log in" />
					</> :
					<>
						{(regPass1 !== regPass2) && <p className={styles.error}>Passwords do not match</p>}
						{registerMutation.data?.status === "error" && <p className={styles.error}>{registerMutation.data.message}</p>}
						<label>Email:
							<input
								value={regEmail}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setRegEmail(e.currentTarget.value)
								}
								type={"email"}
							/>
						</label>
						<label>Password:
							<input
								value={regPass1}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setRegPass1(e.currentTarget.value)
								}
								type={"password"}
							/>
						</label>
						<label>Repeat password:
							<input
								value={regPass2}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setRegPass2(e.currentTarget.value)
								}
								type={"password"}
							/>
						</label>
						<input type="submit" disabled={regPass1 !== regPass2} value="Register" />
					</>}
			</form>
		</div>
	);
}
