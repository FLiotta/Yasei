import React from 'react';

export default (props) => (
	<div className={'spinner-border text-danger' + ' ' + props.classes}>
	  	<span className="sr-only">Loading...</span>
	</div>
);