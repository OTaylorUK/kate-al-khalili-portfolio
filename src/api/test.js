import axios from "axios"

  
export default async function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  
	try {
		const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' + req.body.secretkey + '&response=' + req.body.token;
		
        const response = await axios.get(verificationUrl);

		res.status(200).json(response.data);


    } catch (err) {
		res.status(200).json({ message: 'error - failed recaptcha' });
	}
	
  }