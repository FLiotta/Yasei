import React from 'react';

export default (props) => (
	<div className={'spinner-grow spinner-grow-sm text-danger' + ' ' + props.classes}>
	  	<span className="sr-only">Loading...</span>
	</div>
);