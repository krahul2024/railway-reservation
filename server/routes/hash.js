import crypt from 'crypto'

// calculating the hash

const get_hash = (text) => {
	const hash = crypt.createHash('sha512')
	hash.update(text) 
	return hash.digest('hex')
}


export default get_hash 