<?php
/**
 * Sheets Block Initializer.
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   0.0.1
 * @package Sheets_Block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 0.0.1
 */
function sheets_block_enqueue_block_assets() { // phpcs:ignore

	wp_enqueue_style(
		'sheets_block-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);
}

add_action( 'enqueue_block_assets', 'sheets_block_enqueue_block_assets' );

/**
 * Enqueue block editor assets.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 0.0.1
 */
function sheets_block_enqueue_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'sheets_block-cgb-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		true
	);

	// Styles.
	wp_enqueue_style(
		'sheets_block-cgb-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);
}

add_action( 'enqueue_block_editor_assets', 'sheets_block_enqueue_editor_assets' );
