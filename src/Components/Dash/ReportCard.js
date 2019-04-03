import React from 'react';
const ReportCard = ({serial, query, link, date}) => {
	return(
		<tr className='hover-bg-black-10'>
	        <td className="pv2 pl2 tc pr2 pr3 bb b--black-20">{serial+1}.</td>
	        <td className="pv2 pr3 tc bb b--black-20">{query}</td>
	        <td className="pv2 pr3 tc bb b--black-20"><a href={link}>{query}</a></td>
	        <td className="pv2 pr3 tc bb b--black-20">{date}</td>
	    </tr>
	);
}

export default ReportCard;