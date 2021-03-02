import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = "fetch_recommend_products_start";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
	"fetch_recommend_products_success";
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "fetch_recommend_products_fail";

interface FetchRecommendProductsStartAction {
	type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductsSuccessAction {
	type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
	payload: any[];
}

interface FetchRecommendProductsFailAction {
	type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
	payload: any;
}

export type RecommendProductsAction =
	| FetchRecommendProductsStartAction
	| FetchRecommendProductsSuccessAction
	| FetchRecommendProductsFailAction;

export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStartAction => {
	return {
		type: FETCH_RECOMMEND_PRODUCTS_START,
	};
};

export const fetchRecommendProductsSuccessActionCreator = (
	data: any
): FetchRecommendProductsSuccessAction => {
	return {
		type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
		payload: data,
	};
};

export const fetchRecommendProductsFailActionCreator = (
	error: any
): FetchRecommendProductsFailAction => {
	return {
		type: FETCH_RECOMMEND_PRODUCTS_FAIL,
		payload: error,
	};
};

export const giveMeDataActionCreator = (): ThunkAction<
	void, // 当前函数的返回类型
	RootState, // store的state的类型
	unknown, // 额外参数类型
	RecommendProductsAction // 描述该action的类型
> => async (dispatch, getState) => {
	dispatch(fetchRecommendProductsStartActionCreator());
	try {
		const { data } = await axios.get(
			"http://localhost:9999/productCollections"
		);
		dispatch(fetchRecommendProductsSuccessActionCreator(data));
	} catch (error) {
		dispatch(fetchRecommendProductsFailActionCreator(error.message));
	}
};
