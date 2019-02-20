/**
 * External dependencies.
 */
import { pickBy, values } from 'lodash';

/**
 * Internal dependencies.
 */
import externalApiFetch from '../utils/external-api-fetch';

/**
 * Build Google Sheets feed URL based on provided options.
 *
 * @param options
 * @return {string|null}
 */
function buildGoogleSheetsUrl( options ) {
	const {
		sheetId,
		type = 'list',
		visibility = 'public',
		projection = 'full',
	} = options;

	if ( ! sheetId ) {
		return null;
	}

	return `https://spreadsheets.google.com/feeds/${ type }/${ sheetId }/${ visibility }/${ projection }?alt=json`;
}

/**
 * Request a sheet from Google Sheets.
 *
 * @param {String} sheetId
 * @returns {Promise<*>}
 */
export async function requestSheet( sheetId ) {
	const url = buildGoogleSheetsUrl( { sheetId } );
	return await externalApiFetch( { url } );
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
