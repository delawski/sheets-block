/**
 * WordPress dependencies.
 */
const { Component, Fragment } = wp.element;

/**
 * Internal dependencies.
 */
import SheetsBlockControls from './sheets-block-controls';
import SheetsBlockPlaceholder from './sheets-block-placeholder';
import SheetsBlockTable from './sheets-block-table';

class SheetsBlockEdit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			editingSource: false,
			inputValue: this.props.attributes.sheetId,
		};
	}

	componentDidUpdate( prevProps ) {
		const sheetChanged = prevProps.sheet !== this.props.sheet;
		if ( sheetChanged ) {
			this.props.setAttributes( { content: this.props.sheet } );
		}
	}

	render() {
		const { editingSource, inputValue } = this.state;
		const { cannotEmbed, className, setAttributes, sheet } = this.props;

		const onChange = ( event ) => {
			this.setState( { inputValue: event.target.value } );
		};

		const switchBackToPlaceholder = () => {
			this.setState( { editingSource: true } );
		};

		const onSubmit = ( event ) => {
			if ( event ) {
				event.preventDefault();
			}
			this.setState( { editingSource: false } );
			setAttributes( { sheetId: inputValue } );
		};

		if ( ! sheet || cannotEmbed || editingSource ) {
			return (
				<div className={ className }>
					<code>17bIpFB4VA4MvuZ5qfS4aK_O4YmNlako8p7hRJPehHfQ/od6</code>
					<SheetsBlockPlaceholder
						cannotEmbed={ cannotEmbed }
						icon="media-spreadsheet"
						onChange={ onChange }
						onSubmit={ onSubmit }
						value={ inputValue }
					/>
				</div>
			);
		}

		return (
			<Fragment>
				<SheetsBlockControls
					showBackToPlaceholderControl={ sheet && ! cannotEmbed }
					switchBackToPlaceholder={ switchBackToPlaceholder }
				/>
				<div className={ className }>
					<SheetsBlockTable
						rows={ sheet }
					/>
				</div>
			</Fragment>
		);
	}
}

export default SheetsBlockEdit;
