import React from 'react';

export const ResultCard = ({title, id, points, author, comments, url, date, comment,commentTitle,commentNum, storyText, type}) => {
	let hrefPoint = `https://news.ycombinator.com/item?id=${id}`;
	let hrefUser = `https://news.ycombinator.com/user?id=${author}`;
	let profileTitle= `See ${author} profile`;
	let calcDate = (date1,date2) => {
	    var diff = Math.floor(date1.getTime() - date2.getTime());
	    var day = 1000 * 60 * 60 * 24;
	    var hour = 1000 * 60 * 60;
	    var minute = 1000 * 60 * 60;
	    var second = 1000 * 60;

	    var seconds = Math.floor(diff/second);
	    var minutes = Math.floor(diff/minute);
	    var hours = Math.floor(diff/hour);
	    var days = Math.floor(diff/day);
	    var months = Math.floor(days/31);
	    var years = Math.floor(months/12);
	    var message = '';
	    if(years>0)
	    	message= `${years} years ago`;
	    else if(months>0)
	    	message= `${months} months ago`;
	    else if(days>0)
	    	message= `${days} days ago`;
	    else if(hours>0)
	    	message= `${hours} hours ago`;
	    else if(minutes>0)
	    	message= `${minutes} minutes ago`;
	    else
	    	message= `${seconds} seconds ago`;

	    return message
    }
	let diff = calcDate(new Date(), new Date(date*1000))
	if(comment === null)
		return(
			<div className='resultCard'>
				<div className="resultCard-main">
					<div className="resultCard-content-wrapper">
						<div className='resultCard-title-and-infos'>
							<h2>
								<a target="_blank" rel="noopener noreferrer" href={url}>{title}</a>
							</h2>
							<ul className='item-infos'>
								<li>
									<a href={hrefPoint} target="_blank" rel="noopener noreferrer" title="See original post on HN" >{points} points</a>
								</li>
								<li>
									<a href={hrefUser} target="_blank" rel="noopener noreferrer" title={profileTitle} >{author}</a>
								</li>
								<li>
									<a href={hrefPoint} target="_blank" rel="noopener noreferrer" title={new Date(date*1000)} >{diff}</a>
								</li>
								<li>
									<a href={hrefPoint} target="_blank" rel="noopener noreferrer" title="See original post on HN" >{commentNum} comments</a>
								</li>
								<li>
									<a href={hrefPoint} target="_blank" rel="noopener noreferrer" >{url}</a>
								</li>
							</ul>
						</div>
						<br />
						{(type==='all')?
							<div className='comment ma2' dangerouslySetInnerHTML={{__html: storyText}} />
							:
							null
						}
					</div>
				</div>
			</div>
		);
	else
		return(
			<div className='resultCard'>
				<div className="resultCard-main">
					<div className="resultCard-content-wrapper">
						<div className='resultCard-title-and-infos'>
							<h2>
								<a target="_blank" rel="noopener noreferrer" href={hrefPoint}>{commentTitle}</a>
							</h2>
							<ul className='item-infos'>
								<li>
									<a href={hrefPoint} target="_blank" rel="noopener noreferrer" title="See original post on HN" >{points} points</a>
								</li>
								<li>
									<a href={hrefUser} target="_blank" rel="noopener noreferrer" title={profileTitle} >{author}</a>
								</li>
								<li>
									<a href={hrefPoint} target="_blank" rel="noopener noreferrer" title={new Date(date*1000)} >{diff}</a>
								</li>
								<li>
									<a href={hrefPoint} target="_blank" rel="noopener noreferrer" title="See original post on HN" >{commentNum} comments</a>
								</li>
							</ul>
						</div>
						<br />
						<div className='comment ma2' dangerouslySetInnerHTML={{__html: comment}} />
					</div>
				</div>
			</div>
		);
}