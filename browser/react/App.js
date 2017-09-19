import React, {Component} from 'react';
import ProductList from './ProductList';

export default class App extends Component{

	render(){
		return (
			<div className='container'> 
				<div className='row'>
					<div className='col-sm-6'>
						<ProductList />
					</div>	
				</div>
			</div>
		)
	}
}