<?php
/**
 * Sheets Block
 *
 * @package Sheets_Block
 * @copyright Copyright 2019, Piotr Delawski
 * @license http://opensource.org/licenses/GPL-2.0 GNU General Public License, version 2 (GPL-2.0)
 *
 * Plugin Name: Sheets Block
 * Plugin URI: https://github.com/delawski/sheets-block
 * Description: Use Google Sheets inside WordPress blocks editor.
 * Author: Piotr Delawski
 * Author URI: https://github.com/delawski/
 * Version: 0.0.1
 * License: GPL2
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: sheets-block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Print admin notice if the PHP version is too low.
 */
function sheets_block_php_version_error_notice() {
	printf( '<div class="error"><p>%s</p></div>', esc_html( sheets_block_php_version_error_message() ) );
}

/**
 * String describing the minimum PHP version.
 *
 * Since we're using the namespaces the PHP 5.3 is required.
 *
 * @return string
 */
function sheets_block_php_version_error_message() {
	return __( 'Sheets Block plugin error: Your version of PHP is too old to run this plugin. You must be running PHP 5.3 or higher.', 'sheets-block' );
}

// If the PHP version is too low, show warning and return.
if ( version_compare( phpversion(), '5.3', '<' ) ) {
	if ( defined( 'WP_CLI' ) ) {
		WP_CLI::warning( sheets_block_php_version_error_message() );
	} else {
		add_action( 'admin_notices', 'sheets_block_php_version_error_notice' );
	}
	return;
}

/**
 * Print admin notice if the WordPress version is too low.
 */
function sheets_block_wp_version_error_notice() {
	printf( '<div class="error"><p>%s</p></div>', esc_html( sheets_block_wp_version_error_message() ) );
}

/**
 * String describing the minimum WP version or Gutenberg Plugin requirement.
 *
 * "Blocks" are a feature of WordPress 5.0+ or require the Gutenberg plugin.
 *
 * @return string
 */
function sheets_block_wp_version_error_message() {
	return __( 'Sheets Block plugin error: Your version of WordPress is too old. You must be running WordPress 5.0 or have Gutenberg Plugin enabled to use Sheets Block.', 'sheets-block' );
}

// Check if blocks can be registered to determine if the WordPress version is sufficient.
if ( ! function_exists( 'register_block_type' ) ) {
	if ( defined( 'WP_CLI' ) ) {
		WP_CLI::warning( sheets_block_wp_version_error_message() );
	} else {
		add_action( 'admin_notices', 'sheets_block_wp_version_error_notice' );
	}
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'lib/init.php';
