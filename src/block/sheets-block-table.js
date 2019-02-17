const SheetsBlockTable = ( props ) => {
	const { entries } = props;

	return (
		<table className="wp-block-table">
			<tbody>
				{ entries.map( item => (
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
	);
};

export default SheetsBlockTable;
