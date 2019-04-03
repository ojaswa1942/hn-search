 const handleProfile=(req,res,db)=>{
	const email = req.email;
	const query = {
		text: "SELECT * FROM users WHERE email=$1",
		values: [email],
	}
	db.query(query)
	.then(data => {
		if (data.rows.length !== 0) {
			let userData = {
				name: data.rows[0].name,
				email: data.rows[0].email
			};
			return res.status(200).json(userData);
	    }
		else
			res.status(404).json('No such user');
	})
	.catch(err => {
		console.log('Profilex', err); 
		res.status(400).json('Something is wrong');
	});
}

module.exports={
	handleProfile: handleProfile
}