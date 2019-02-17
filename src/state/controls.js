/**
 * Internal dependencies.
 */
import { parseRawData, requestSheet } from '../utils/source-google-sheets';

/**
 * Fetch sheet control.
 *
 * @param action
 *
 * @return {Promise<*>}
 */
export function FETCH_SHEET( action ) {
	return requestSheet( action.sheetId );
}

/**
 * Parse sheet control.
 *
 * @param action
 *
 * @return {Array}
 */
export function PARSE_SHEET( action ) {
	return parseRawData( action.rawData );
}
