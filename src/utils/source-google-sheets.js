import { pickBy, values } from 'lodash';

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
	if ( ! rawData.feed || ! rawData.feed.entry ) {
		return [];
	}

	return rawData.feed.entry.map( ( singleEntry ) => {
		const filteredEntries = pickBy( singleEntry, ( value, key ) => key.startsWith( 'gsx$' ) );
		return {
			id: singleEntry.id.$t,
			values: values( filteredEntries ).map( ( item ) => item.$t ),
		};
	} );
}
