/**
 * Sheets Block index.
 */

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { } = wp.components;
const { } = wp.editor;

/**
 * Internal dependencies.
 */
import SheetsBlockEditWithState from './sheets-block-edit-with-state';

/**
 * Stylesheets.
 */
import './style.scss';
import './editor.scss';

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
	},

	/**
	 * Block edit method.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: SheetsBlockEditWithState,

	/**
	 * Block save method.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div>
				<p>— Hello from the frontend.</p>
			</div>
		);
	},
} );
