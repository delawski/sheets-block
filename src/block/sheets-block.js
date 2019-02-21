/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;

/**
 * Internal dependencies.
 */
import { REDUCER_KEY } from '../state/reducer';
import SheetsBlockEdit from './sheets-block-edit';
import SheetsBlockTable from './sheets-block-table';

/**
 * Register Sheets Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'sheets-block/google-sheets-embed', {
	title: __( 'Google Sheets Embed' ),
	icon: 'media-spreadsheet',
	category: 'embed',
	keywords: [
		__( 'Sheets Block' ),
		__( 'Google Sheets' ),
		__( 'Embed' ),
	],
	attributes: {
		sheetId: {
			type: 'string',
			default: '',
		},
		content: {
			type: 'string',
			default: '',
		},
	},

	/**
	 * Block edit method.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @return {*} Edit element
	 */
	edit: withSelect( ( select, ownProps ) => {
		const { getSheet, hasRequestError } = select( REDUCER_KEY );
		const { attributes } = ownProps;
		const { sheetId } = attributes;
		const sheet = undefined !== sheetId && '' !== sheetId && getSheet( sheetId );
		const cannotEmbed = hasRequestError();
		return {
			cannotEmbed,
			sheet,
		};
	} )( SheetsBlockEdit ),

	/**
	 * Block save method.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @return {*} Save element
	 */
	save: ( { attributes } ) => (
		attributes.content ?
			<SheetsBlockTable rows={ attributes.content } /> :
			<p>{ __( 'No content exists.' ) }</p>
	),
} );
