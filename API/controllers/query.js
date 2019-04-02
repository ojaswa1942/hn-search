
const handleQueryUpdate = (req,res,db)=>{
	const {query2, email} = req.body;
	const query = {
	  text: 'INSERT INTO history(email, query, date) VALUES($1, $2)',
	  values: [email, query2, new Date()]
	}
	db.query(query)
	.then(() =>{
		return res.status(200).json('Updated');
	})
	.catch(err => res.status(400).json(err));
}
const handleQuerySelect = (req,res,db)=>{
	const {email} = req.body;
	const query = {
	  text: 'SELECT * from history where email=$1 order by date desc',
	  values: [email, query, new Date()]
	}
	db.query(query)
	.then(() =>{
		return res.status(200).json('Updated');
	})
	.catch(err => res.status(400).json(err));
}

module.exports={
	handleQueryUpdate: handleQueryUpdate,
	handleQuerySelect: handleQuerySelect
};