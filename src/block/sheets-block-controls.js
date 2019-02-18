/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { IconButton, Toolbar } = wp.components;
const { BlockControls } = wp.editor;

const SheetsBlockControls = ( props ) => {
	const { showBackToPlaceholderControl, switchBackToPlaceholder } = props;

	return (
		<BlockControls>
			<Toolbar>
				{ showBackToPlaceholderControl && (
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Edit Sheet ID' ) }
						icon="edit"
						onClick={ switchBackToPlaceholder }
					/>
				) }
			</Toolbar>
		</BlockControls>
	);
};

export default SheetsBlockControls;
