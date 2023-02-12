import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "../scss/LoginMenu.module.scss";

export function LoginMenu(props: {
	closeFunc: () => void;
}) {
	const [menuType, setMenuType] = useState<"login" | "register">("login");

	// FIXME: hover still working on pet cards
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
					>Sign in</button>
					<button
						className={styles["sign-up"]}
						data-selected={menuType === "register"}
						onClick={() => setMenuType("register")}
					>Sign up</button>
				</div>
				<button
					className={styles["close-icon"]}
					onClick={props.closeFunc}
				>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>
			<form>
				{menuType === "login" ?
					<>
						<label>Email:
							<input type={"email"} />
						</label>
						<label>Password:
							<input type={"password"} />
						</label>
						<button>Sign in</button>
					</> :
					<>
						<label>Email:
							<input type={"email"} />
						</label>
						<label>Password:
							<input type={"password"} />
						</label>
						<label>Repeat password:
							<input type={"password"} />
						</label>
						<button>Sign up</button>
					</>}
			</form>
		</div>
	);
}
