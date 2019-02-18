import { uniqueId } from 'lodash';

const SheetsBlockTable = ( props ) => {
	const { rows } = props;

	return (
		<table className="wp-block-table">
			<tbody>
				{ rows.map( row => (
					<tr key={ row.id }>
						{ row.values.map( col => (
							<td key={ uniqueId( 'col_' ) }>
								<div className="wp-block-table__cell-content">
									{ col }
								</div>
							</td>
						) ) }
					</tr>
				) ) }
			</tbody>
		</table>
	);
};

export default SheetsBlockTable;
