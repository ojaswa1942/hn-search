
const handleQueryUpdate = (req,res,db)=>{
	const {query, email} = req.body;
	const queryInsert = {
	  text: 'INSERT INTO history(email, query, date) VALUES($1, $2, $3)',
	  values: [email, query, new Date()]
	}
	db.query(queryInsert)
	.then(() =>{
		return res.status(200).json('Updated');
	})
	.catch(err => res.status(400).json(err));
}
const handleQuerySelect = (req,res,db)=>{
	const {email} = req.body;
	const query = {
	  text: 'SELECT * from history where email=$1 order by date DESC',
	  values: [email]
	}
	db.query(query)
	.then((data) =>{
		return res.status(200).json(data.rows);
	})
	.catch(err => res.status(400).json(err));
}

module.exports={
	handleQueryUpdate: handleQueryUpdate,
	handleQuerySelect: handleQuerySelect
};