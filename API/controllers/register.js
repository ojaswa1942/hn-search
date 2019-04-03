const jwt = require('jsonwebtoken');
const secret = 'iAmVeryBadAtThis';

const handleRegister = (req,res,db,bcrypt,xss)=>{
	const xssOptions = {
		whiteList: [],
		stripIgnoreTag: [],
		stripIgnoreTagBody: ['script']
	};
	const {password} = req.body;
	const email = xss(req.body.username, xssOptions);
	const name = xss(req.body.name, xssOptions);
	// const email = req.body.username;
	console.log(email, name, password);
		if(!email || !password || !name)
	{
		return res.status(400).json('Incorrect form submission');
	}

	const query = {
		text: "SELECT * FROM users WHERE email=$1",
		values: [email],
	}

	db.query(query)
		.then(data => {
			if (data.rows.length === 0) {
				bcrypt.hash(password, null, null, function(err, hash) {
					if(err) console.log(err);
					const reg_query = {
						text: "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
						values: [name, email, hash],
					}
					db.query(reg_query)
						.then(result => {
							let userData = {
								name: name,
								email: email
							};
							const payload = {email};
					        const token = jwt.sign(payload, secret, {
							expiresIn: '30d'
					        });
					        res.status(200).cookie('token', token, { maxAge: 2419200000, httpOnly: true }).json(userData)
						})
						.catch(err=> {console.log(err); res.status(400).json('Some error occurred')})
				})
			}
			else{
				return res.status(400).json("User already registered.");
			}
		})
		.catch(err=> {console.log(err); res.status(400).json('Some error occurred')})
}

module.exports={
	handleRegister: handleRegister
};