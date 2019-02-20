/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

/**
 * Fetch from external API.
 *
 * The core `@wordpress/api-fetch` package is meant to be used only with WordPress REST API.
 * Still we would like to have a nice utility function for requesting data and parsing
 * JSON responses that would check the incoming data throw errors.
 * As soon as the `api-fetch` allows fetching from external sources, this can be removed.
 *
 * @see https://github.com/WordPress/gutenberg/issues/13491
 *
 * @param {Object} options
 * @param {string} options.url
 * @param {Object} [options.data]
 * @param {boolean} [options.parse=true]
 * @param {Object} [options.body]
 * @param {string} [options.headers[]]
 *
 * @return {Promise|Error}
 */
function externalApiFetch( options ) {
	const { url, data, parse = true, ...remainingOptions } = options;
	let { body, headers } = options;

	// The `data` property is a shorthand for sending a JSON body.
	if ( data ) {
		body = JSON.stringify( data );
		headers[ 'Content-Type' ] = 'application/json';
	}

	const responsePromise = window.fetch(
		url,
		{
			...remainingOptions,
			body,
			headers,
		}
	);

	const checkStatus = ( response ) => {
		if ( response.status >= 200 && response.status < 300 ) {
			return response;
		}

		throw response;
	};

	const parseResponse = ( response ) => {
		if ( parse ) {

			// Status 204 - no content.
			if ( response.status === 204 ) {
				return null;
			}

			return response.json ? response.json() : Promise.reject( response );
		}

		return response;
	};

	return responsePromise
		.then( checkStatus )
		.then( parseResponse )
		.catch( ( response ) => {
			if ( ! parse ) {
				throw response;
			}

			const invalidJsonError = {
				code: 'invalid_json',
				message: __( 'The response is not a valid JSON response.' ),
			};

			if ( ! response || ! response.json ) {
				throw invalidJsonError;
			}

			return response.json()
				.catch( () => {
					throw invalidJsonError;
				} )
				.then( ( error ) => {
					const unknownError = {
						code: 'unknown_error',
						message: __( 'An unknown error occurred.' ),
					};

					throw error || unknownError;
				} );
		} );
}

export default externalApiFetch;
