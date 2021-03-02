import i18n from "i18next";
import {
	CHANGE_LANGUAGE,
	ADD_LANGUAGE,
	LanguageActionTypes,
} from "./languageActions";

const defaultState: LanguageState = {
	language: "zh",
	languageList: [
		{
			name: "中文",
			code: "zh",
		},
		{
			name: "English",
			code: "en",
		},
	],
};

export interface LanguageState {
	language: "en" | "zh";
	languageList: { name: string; code: string }[];
}

export default function languageReduer(
	state: LanguageState = defaultState,
	action: LanguageActionTypes
) {
	switch (action.type) {
		case CHANGE_LANGUAGE:
			i18n.changeLanguage(action.payload);
			return {
				...state,
				language: action.payload,
			};
		case ADD_LANGUAGE:
			return {
				...state,
				languageList: [...state.languageList, action.payload],
			};
		default:
			return state;
	}
};
