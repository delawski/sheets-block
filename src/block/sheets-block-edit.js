/**
 * WordPress dependencies.
 */
const { Component } = wp.element;

/**
 * Internal dependencies.
 */
import SheetsBlockPlaceholder from './sheets-block-placeholder';

class SheetsBlockEdit extends Component {
	constructor () {
		super( ...arguments );
		this.state = {
			inputValue: '',
		}
	}

	render() {
		const { inputValue } = this.state;
		const { className, sheet, requestFailed, setAttributes } = this.props;

		const onChange = ( event ) => {
			this.setState( {
				inputValue: event.target.value,
			} );
		};

		const onSubmit = ( event ) => {
			event.preventDefault();
			setAttributes( {
				sheetId: inputValue,
			})
		};

		if ( ! sheet || requestFailed ) {
			return (
				<div className={ className }>
					<code>17bIpFB4VA4MvuZ5qfS4aK_O4YmNlako8p7hRJPehHfQ</code>
					<SheetsBlockPlaceholder
						icon="media-spreadsheet"
						value={ inputValue }
						onChange={ onChange }
						onSubmit={ onSubmit }
						requestFailed={ requestFailed }
					/>
				</div>
			);
		}

		return (
			<div className={ className }>
				<table className="wp-block-table">
					<tbody>
						{ sheet.map( item => (
							<tr key={ item.id.$t }>
								<td>
									<div className="wp-block-table__cell-content">
										{ item.id.$t }
									</div>
								</td>
							</tr>
						) ) }
					</tbody>
				</table>
			</div>
		);
	}
}

export default SheetsBlockEdit;
