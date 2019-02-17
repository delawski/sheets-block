/**
 * Get sheet.
 *
 * @param state
 * @param sheetId
 *
 * @return {*}
 */
export function getSheet( state, sheetId ) {
	return state.sheets[ sheetId ];
}

/**
 * Check if a request error occurred.
 *
 * @param state
 *
 * @return {boolean}
 */
export function hasRequestError( state ) {
	return state.requestError;
}
