import React from 'react';

const ButtonCard = ({value, isActive, isDisabled, onClick}) => {
	return(
		<li className={(isActive)?"active":""}>
			{(isDisabled)?
				<button disabled dangerouslySetInnerHTML={{__html: value}} ></button>
				:
				<button onClick={onClick} value={value} dangerouslySetInnerHTML={{__html: value}} ></button>
			}
		</li>
	);
}

export default ButtonCard;