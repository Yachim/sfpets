import { faBan, faCheck, faMagnifyingGlass, faMagnifyingGlassMinus, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../scss/Filters.module.scss";
import { Filter } from "./pages/Pets";

export function Filters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter: Filter[] = JSON.parse(
        searchParams.get("filter") ||
            '["available", "unknown", "unavailable", "found", "notFound"]'
    );

	function toggleFilter(kw: Filter) {
		if (filter.includes(kw)) {
			const i = filter.indexOf(kw);
			filter.splice(i, 1);
		}
		else {
			filter.push(kw);
		}
			
		searchParams.set("filter", JSON.stringify(filter));
		setSearchParams(searchParams);
	}

	return (
		<div className={styles["filters-wrapper"]}>
			<button
				className={`
					${styles.filter}
					${!filter.includes("available") ? styles["--not-selected"] : ""}
				`}
				style={{
					"--h": "120deg",
					"--s": "100%",
					"--l": "39%"
				} as CSSProperties}
				onClick={() => toggleFilter("available")}
			>
				<FontAwesomeIcon icon={faCheck}/> Available
			</button>
			<button
				className={`
					${styles.filter}
					${!filter.includes("unknown") ? styles["--not-selected"] : ""}
				`}
				style={{
					"--h": "0deg",
					"--s": "0%",
					"--l": "78%"
				} as CSSProperties}
				onClick={() => toggleFilter("unknown")}
			>
				<FontAwesomeIcon icon={faCircleQuestion}/> Unknown
			</button>
			<button
				className={`
					${styles.filter}
					${!filter.includes("unavailable") ? styles["--not-selected"] : ""}
				`}
				style={{
					"--h": "0deg",
					"--s": "100%",
					"--l": "39%"
				} as CSSProperties}
				onClick={() => toggleFilter("unavailable")}
			>
				<FontAwesomeIcon icon={faBan}/> Unavailable
			</button>

			<button
				className={`
					${styles.filter}
					${!filter.includes("found") ? styles["--not-selected"] : ""}
				`}
				style={{
					"--h": "var(--accent-h)",
					"--s": "var(--accent-s)",
					"--l": "var(--accent-l)"
				} as CSSProperties}
				onClick={() => toggleFilter("found")}
			>
				<FontAwesomeIcon icon={faMagnifyingGlass}/> Found
			</button>
			<button
				className={`
					${styles.filter}
					${!filter.includes("notFound") ? styles["--not-selected"] : ""}
				`}
				style={{
					"--h": "var(--accent-h)",
					"--s": "var(--accent-s)",
					"--l": "calc(var(--accent-l) * 0.4)"
				} as CSSProperties}
				onClick={() => toggleFilter("notFound")}
			>
				<FontAwesomeIcon icon={faMagnifyingGlassMinus}/> Not found
			</button>
		</div>
	);
}
