// LinkResolver.js file

exports.linkResolver = (doc) => {

	if (doc.uid !== 'home') {
	  return `/${doc.uid}`
	}
  
	return '/'
}