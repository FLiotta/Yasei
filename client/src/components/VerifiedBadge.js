import React from 'react';
import ReactTooltip from 'react-tooltip'


export default props => (
	<>
		<i className="far fa-check-circle mt-1 mx-1 text-danger" data-tip="Verified"></i>
		<ReactTooltip 
			place="top"
			effect="solid"
		/>
	</>
)