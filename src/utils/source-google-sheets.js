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
