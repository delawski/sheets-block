/**
 * Internal dependencies.
 */
import { fetchSheet, parseSheet, setSheet, setRequestError } from './actions';

/**
 * Get sheet resolver.
 *
 * @param sheetId
 *
 * @return {IterableIterator<*>}
 */
export function * getSheet( sheetId ) {
	try {
		const rawData = yield fetchSheet( sheetId );
		const data = yield parseSheet( rawData );
		return setSheet( sheetId, data );
	} catch ( error ) {
		return setRequestError();
	}
}
