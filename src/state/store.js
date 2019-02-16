/**
 * WordPress dependencies.
 */
const { registerStore } = wp.data;

/**
 * Reducer name.
 * @type {string}
 */
export const REDUCER_KEY = 'sheets-block';

/**
 * Request a sheet from Google Sheets.
 *
 * @param {String} sheetId
 * @returns {Promise<*>}
 */
export async function requestSheet( sheetId ) {
	const response = await fetch(
		`https://spreadsheets.google.com/feeds/list/${ sheetId }/od6/public/values?alt=json`
	);
	return await response.json();
}

/**
 * Parse raw sheets data.
 *
 * @param {Object} rawData
 * @returns {Array}
 */
export function parseRawData( rawData ) {
	if ( rawData.feed && rawData.feed.entry ) {
		return rawData.feed.entry;
	}
	return [];
}

/**
 * Default state.
 * @type {{sheets: Array}}
 */
export const DEFAULT_STATE = {
	sheets: {},
	requestError: false,
};

/**
 * Action names.
 * @type {string}
 */
export const SET_SHEET = 'SET_SHEET';
export const FETCH_SHEET = 'FETCH_SHEET';
export const PARSE_SHEET = 'PARSE_SHEET';
export const SET_REQUEST_ERROR = 'SET_REQUEST_ERROR';

const actions = {
	setSheet( sheetId, data ) {
		return {
			type: SET_SHEET,
			sheetId,
			data,
		};
	},
	fetchSheet( sheetId ) {
		return {
			type: FETCH_SHEET,
			sheetId,
		};
	},
	parseSheet( rawData ) {
		return {
			type: PARSE_SHEET,
			rawData,
		};
	},
	setRequestError() {
		return {
			type: SET_REQUEST_ERROR,
		}
	}
};

const selectors = {
	getSheet( state, sheetId ) {
		return state.sheets[ sheetId ];
	},
	hasRequestError( state ) {
		return state.requestError;
	}
};

const resolvers = {
	* getSheet( sheetId ) {
		try {
			const rawData = yield actions.fetchSheet( sheetId );
			const data = yield actions.parseSheet( rawData );
			return actions.setSheet( sheetId, data );
		} catch ( error ) {
			return actions.setRequestError();
		}
	},
};

const controls = {
	FETCH_SHEET( action ) {
		return requestSheet( action.sheetId );
	},
	PARSE_SHEET( action ) {
		return parseRawData( action.rawData );
	},
};

const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case SET_SHEET:
			return {
				...state,
				requestError: false,
				sheets: {
					... state.sheets,
					[ action.sheetId ]: action.data,
				}
			};
		case SET_REQUEST_ERROR:
			return {
				...state,
				requestError: true,
			};
	}

	return state;
};

/**
 * Block core/data store
 *
 * @type {{reducer: (function(*=, *)), actions: {setForm: (function(*=)), setForms: (function(*=)), addFormPreview: (function(*=, *=))}, selectors: {getForm: (function(*=, *=)), getForms: (function(*)), getFormPreview: (function(*, *=)), getFormPreviews: (function(*))}, resolvers: {getForm: (function(*, *): Promise)}}}
 */
export const STORE = {
	reducer,
	actions,
	selectors,
	resolvers,
	controls,
};

registerStore( REDUCER_KEY, STORE );
