export const parseImageUrl = url => {
	if(url.includes('http'))
		return url;
	
	if(url.includes('assets'))
		return url;
	return `http://localhost:3000/${url}`;
	
}