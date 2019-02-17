/**
 * WordPress dependencies.
 */

const { registerStore } = wp.data;

/**
 * Internal dependencies.
 */
import { reducer, REDUCER_KEY } from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';
import * as resolvers from './resolvers';
import * as controls from './controls';


/**
 * Block core/data store
 */
export const STORE = {
	reducer,
	actions: { ... actions },
	selectors: { ... selectors },
	resolvers: { ... resolvers },
	controls: { ... controls },
};

registerStore( REDUCER_KEY, STORE );
