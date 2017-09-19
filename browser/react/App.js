import React, {Component} from 'react';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import Summary from './Summary';


export default class App extends Component{

	render(){
		return (
			<div className='container'> 
				<div className='row'>
					<div className='col-sm-8'>
						<ProductList />
					</div>
					<div className='col-sm-2'>
						<AddProduct />
					</div>						
					<div className='col-sm-2'>	
						<Summary />
					</div>	
				</div>
			</div>
		)
	}
}