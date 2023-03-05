import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Langs } from "../data/translation";
import { getLang } from "../utils/utils";
import { PetProps } from "./PetCard";

export const LangContext = createContext<{
	value: Langs,
	setValue: (val: Langs) => void
}>({
	value: getLang(),
	setValue: (_) => { }
});

export const DarkThemeContext = createContext<{
	value: boolean,
	setValue: Dispatch<SetStateAction<boolean>>
}>({
	value: true,
	setValue: (_) => { }
});

export type PetInfoCardContextValueType = {
	value: PetProps | null,
	setValue: (val: PetProps | null) => void
};

export const PetCardContext = createContext<PetInfoCardContextValueType>({
	value: null,
	setValue: (_) => { }
});

export type SelectedCharacterContextType = {
	value: number;
	setValue: (val: number) => void;
}
export const SelectedCharacterContext = createContext<SelectedCharacterContextType>({
	value: -1,
	setValue: (_) => { }
});

export const UserSettingsShownContext = createContext<{
	value: boolean,
	setValue: Dispatch<SetStateAction<boolean>>
}>({
	value: false,
	setValue: (_) => { }
});

export const LoginShownContext = createContext<{
	value: boolean,
	setValue: Dispatch<SetStateAction<boolean>>
}>({
	value: false,
	setValue: (_) => { }
});

export function Context(props: {
	children: JSX.Element
}) {
	const [lang, setLang] = useState<Langs>(getLang());
	const [darkTheme, setDarkTheme] = useState(true);
	const [loginShown, setLoginShown] = useState(false);
	const [userSettingsShown, setUserSettingsShown] = useState(false);
	const [selectedCharacter, setSelectedCharacter] = useState(-1);
	const [petCard, setPetCard] = useState<PetProps | null>(null);

	return (
		<LangContext.Provider value={{
			value: lang,
			setValue: setLang
		}}>
			<DarkThemeContext.Provider value={{
				value: darkTheme,
				setValue: setDarkTheme
			}}>
				<LoginShownContext.Provider value={{
					value: loginShown,
					setValue: setLoginShown
				}}>
					<UserSettingsShownContext.Provider value={{
						value: userSettingsShown,
						setValue: setUserSettingsShown
					}}>
						<SelectedCharacterContext.Provider value={{
							value: selectedCharacter,
							setValue: setSelectedCharacter
						}}>
							<PetCardContext.Provider value={{
								value: petCard,
								setValue: setPetCard
							}}>
								{props.children}
							</PetCardContext.Provider >
						</SelectedCharacterContext.Provider >
					</UserSettingsShownContext.Provider >
				</LoginShownContext.Provider >
			</DarkThemeContext.Provider >
		</LangContext.Provider >
	);
}
