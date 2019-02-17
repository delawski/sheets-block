/**
 * WordPress dependencies.
 */
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

/**
 * Internal dependencies.
 */
import SheetsBlockEdit from './sheets-block-edit';
import { REDUCER_KEY } from '../state/reducer';

const SheetsBlockEditWithState = compose(
	withSelect( ( select, ownProps ) => {
		const { getSheet, hasRequestError } = select( REDUCER_KEY );
		const { sheetId } = ownProps.attributes;
		const sheet = undefined !== sheetId && '' !== sheetId && getSheet( sheetId );
		const cannotEmbed = hasRequestError();
		return {
			cannotEmbed,
			sheet,
		}
	} ),
	withDispatch( () => {
		return {}
	} )
)( SheetsBlockEdit );

export default SheetsBlockEditWithState;
