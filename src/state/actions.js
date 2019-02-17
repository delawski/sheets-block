/**
 * Set sheet action.
 *
 * @param sheetId
 * @param data
 *
 * @return {{data: *, sheetId: *, type: string}}
 */
export function setSheet( sheetId, data ) {
	return {
		type: 'SET_SHEET',
		sheetId,
		data,
	};
}

/**
 * Fetch sheet action.
 *
 * @param sheetId
 *
 * @return {{sheetId: *, type: string}}
 */
export function fetchSheet( sheetId ) {
	return {
		type: 'FETCH_SHEET',
		sheetId,
	};
}

/**
 * Parse sheet action.
 *
 * @param rawData
 *
 * @return {{rawData: *, type: string}}
 */
export function parseSheet( rawData ) {
	return {
		type: 'PARSE_SHEET',
		rawData,
	};
}

/**
 * Set request error action.
 *
 * @return {{type: string}}
 */
export function setRequestError() {
	return {
		type: 'SET_REQUEST_ERROR',
	}
}
