/**
 * Reducer name.
 * @type {string}
 */
export const REDUCER_KEY = 'sheets-block';

/**
 * Default state.
 * @type {{sheets: Array}}
 */
export const DEFAULT_STATE = {
	sheets: {},
	requestError: false,
};

/**
 * Reducer function.
 *
 * @param state
 * @param action
 *
 * @return {*}
 */
export const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'SET_SHEET':
			return {
				...state,
				requestError: false,
				sheets: {
					... state.sheets,
					[ action.sheetId ]: action.data,
				}
			};
		case 'SET_REQUEST_ERROR':
			return {
				...state,
				requestError: true,
			};
	}

	return state;
};
