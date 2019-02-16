/**
 * WordPress dependencies.
 */
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

/**
 * Internal dependencies.
 */
import SheetsBlockEdit from './sheets-block-edit';
import { REDUCER_KEY } from '../state/store';

const SheetsBlockEditWithState = compose(
	withSelect( ( select, ownProps ) => {
		const { getSheet, hasRequestError } = select( REDUCER_KEY );
		const { sheetId } = ownProps.attributes;
		const sheet = undefined !== sheetId && '' !== sheetId && getSheet( sheetId );
		const requestFailed = hasRequestError();
		return {
			sheet,
			requestFailed,
		}
	} ),
	withDispatch( () => {
		return {}
	} )
)( SheetsBlockEdit );

export default SheetsBlockEditWithState;
