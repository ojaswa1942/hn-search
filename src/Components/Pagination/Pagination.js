import React, { Component } from 'react';
import ButtonCard from './ButtonCard';
import './Pagination.css';

class Pagination extends Component {
	constructor(props){
		super(props);
	}
	onClickHandle= (event) =>{
		let {searchSettings} = this.props;
  		window.history.pushState(null, null, `/query=${searchSettings.query}/sort=${searchSettings.sort}/page=${event.target.value-1}/dateRange=${searchSettings.dateRange}/type=${searchSettings.type}`);
		this.props.updateSearchPage(event.target.value-1);
		console.log(event.target.value);
	}
	onClickForward = () => {
		let {searchSettings} = this.props;
		let present = parseInt(searchSettings.page);
  		window.history.pushState(null, null, `/query=${searchSettings.query}/sort=${searchSettings.sort}/page=${present+1}/dateRange=${searchSettings.dateRange}/type=${searchSettings.type}`);
		this.props.updateSearchPage(present+1);
	}
	onClickBackward = () => {
		let {searchSettings} = this.props;
		let present = parseInt(searchSettings.page);
  		window.history.pushState(null, null, `/query=${searchSettings.query}/sort=${searchSettings.sort}/page=${present-1}/dateRange=${searchSettings.dateRange}/type=${searchSettings.type}`);
		this.props.updateSearchPage(present-1);
	}
	render() {
		const createPagination = () => {
			let currentIndex = parseInt(this.props.initialPage)+1;
			let lastIndex = parseInt(this.props.totalPages);
			let buttons = [];
			if ( currentIndex !== 1) {
				buttons.push({
					value: '<<',					
					isActive: false,
					isDisabled: false,
					onClick: this.onClickBackward
				});
			}

			const low = (currentIndex - 4 > 0) ? 4 : currentIndex - 1;
			const high = (currentIndex + 4 <= lastIndex) ? 4 : lastIndex - currentIndex;
			if (currentIndex-low >= 2){
				buttons.push({
					value: 1,					
					isActive: false,
					isDisabled: false,
					onClick: this.onClickHandle
				});
				if (currentIndex-low > 2){
					buttons.push({
						value: '<b>...</b>',					
						isActive: false,
						isDisabled: true
					});
				}
			}
			for (var i = low; i > 0; i--) {
				buttons.push({
					value: currentIndex-i,					
					isActive: false,
					isDisabled: false,
					onClick: this.onClickHandle
				});
			}
			buttons.push({
				value: currentIndex,				
				isActive: true,
				isDisabled: false,
				onClick: this.onClickHandle
			});
			for (i = 0; i < high; i++) {
				buttons.push({
					value: currentIndex+i+1,				
					isActive: false,
					isDisabled: false,
					onClick: this.onClickHandle
				});
			}
			if (lastIndex - currentIndex >= 5) {
				if (lastIndex - currentIndex > 5) {
					buttons.push({
						value: '<b>...</b>',					
						isActive: false,
						isDisabled: true
					});
				}
				
				buttons.push({
					value: lastIndex,					
					isActive: false,
					isDisabled: false,
					onClick: this.onClickHandle
				});
			}
			if ( lastIndex !== currentIndex){
				buttons.push({
					value: '>>',					
					isActive: false,
					isDisabled: false,
					onClick: this.onClickForward
				});
			}
			return buttons;
		}


		const PagiN = ({buttons}) => {
		    const pageComponent = buttons.map((button, i) =>
		        <ButtonCard 
		            key={i}
		            value={button.value}
		            isActive={button.isActive}
		            isDisabled={button.isDisabled}
		            onClick= {button.onClick}
		        />
		    );
		    return (
		        <ul className="search-pagination">
		        	{pageComponent}
		        </ul>
		    );
		}
		return (
			<PagiN buttons={createPagination()} />
		);
	}
}

export default Pagination;