/**
 * Sheets Block index.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

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

	/**
	 * Block edit method.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		// Creates a <p class='wp-block-cgb-block-sheets-block'></p>.
		return (
			<div className={ props.className }>
				<p>— Hello from the backend.</p>
			</div>
		);
	},

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
