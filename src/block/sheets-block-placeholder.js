/**
 * WordPress dependencies.
 */
const { __, _x } = wp.i18n;
const { Button, Placeholder } = wp.components;
const { BlockIcon } = wp.editor;

const SheetsBlockPlaceholder = ( props ) => {
	const { icon, value, onSubmit, onChange, cannotEmbed } = props;
	const label = __( 'Google Sheets ID' );
	return (
		<Placeholder
			icon={ <BlockIcon icon={ icon } /> }
			label={ label }
		>
			<form onSubmit={ onSubmit }>
				<input
					type="text"
					value={ value }
					className="components-placeholder__input"
					aria-label={ label }
					placeholder={ __( 'Enter ID of the Google Sheet here…' ) }
					onChange={ onChange } />
				<Button
					isLarge
					type="submit">
					{ _x( 'Embed', 'button label' ) }
				</Button>
				{ cannotEmbed &&
				<p className="components-placeholder__error">
					{ __( 'Sorry, we could not embed that content.' ) }
				</p>
				}
			</form>
		</Placeholder>
	);
};

export default SheetsBlockPlaceholder;
