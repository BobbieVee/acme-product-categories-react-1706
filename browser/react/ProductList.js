import React, {Component} from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

export default class ProductList extends Component{
	constructor(){
		super();
		this.state = {
			products: [],
			categories: []
		}
	}

componentDidMount(){
	Promise.all([
		axios.get('/api/products'),
		axios.get('/api/categories')		
	])

	.then(([products, categories]) => {
		console.log('products.data:', products.data);
		this.setState({products: products.data, categories: categories.data});
	} )
}

	render(){
		const {products, categories} = this.state;
		const divStyle = {margin: '5px'};
		return (
			<div className='well'>
				<h2> Product List</h2>
				<div className='row'>
				{products.map(product => {
					return (
						<div className='col-sm-3 well' key={product.id} style={divStyle}>
							<ProductForm product={product} categories={categories}/>						
						</div>
					)
				})}
				</div>
			</div>
			

		)
	}
}
