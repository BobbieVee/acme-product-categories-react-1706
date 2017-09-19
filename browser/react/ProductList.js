import React, {Component} from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

export default class ProductList extends Component{
	constructor(){
		super();
		this.state = {
			products: []
		}
	}

componentDidMount(){
	axios.get('/api/products')
	.then(products => {
		console.log('products.data:', products.data)
		this.setState({products: products.data})
	} )
}

	render(){
		const {products} = this.state;
		return (
			<div>
				<h2> Product List</h2>
				<div className='row'>
				{products.map(product => {
					return (
						<div className='col-sm-3' key={product.id}>
							<ProductForm product={product}/>							
						</div>
					)
				})}
				</div>
			</div>
			

		)
	}
}
