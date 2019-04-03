const jwt = require('jsonwebtoken');
const secret = 'iAmVeryBadAtThis';

const handleSignin = (req,res,db,bcrypt,xss)=>{
	const xssOptions = {
		whiteList: [],
		stripIgnoreTag: [],
		stripIgnoreTagBody: ['script']
	};
	const {password} = req.body;
	const email = xss(req.body.username, xssOptions);
	// const email = req.body.username;
		if(!email || !password)
	{
		return res.status(400).json('Incorrect form submission');
	}

	const query = {
		text: "SELECT * FROM users WHERE email=$1",
		values: [email],
	}
	db.query(query)
		.then(data => {
			if(data.rows.length === 1){
				bcrypt.compare(password, data.rows[0].password, function(err, result) {
					if(result) {
						let userData = {
							name: data.rows[0].name,
							email: email
						};
						const payload = {email};
				        const token = jwt.sign(payload, secret, {
						expiresIn: '30d'
				        });
				        res.status(200).cookie('token', token, { maxAge: 2419200000, httpOnly: true }).json(userData)
					} else {
						return res.status(400).json("Invalid Credentials");
					}
				})
			} else {
				return res.status(400).json('Invalid User');
			}
		})
		.catch(err=> {console.log(err); res.status(400).json('Some error occurred')})
}

module.exports={
	handleSignin: handleSignin
};