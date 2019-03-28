import React from 'react';

export const ResultCard = ({title, id, points, username, comments, url}) => {
	return(
		<div className='resultCard'>
			<div className="resultCard-main">
				<div className="resultCard-content-wrapper">
					<div className='resultCard-title-and-infos'>
						<h2>
							<a>A guide to difficult conversations</a>
						</h2>
						<ul className='item-infos'>
							<li>
								<a>1778 points</a>
							</li>
							<li>
								<a>ojaswa1942</a>
							</li>
							<li>
								<a>n days ago</a>
							</li>
							<li>
								<a>447 comments</a>
							</li>
							<li>
								<a>https://ojaswa.me</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}