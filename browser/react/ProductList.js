import React, {Component} from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import NewProductForm from './NewProductForm';

export default class ProductList extends Component{
	constructor(){
		super();
		this.state = {
			products: [],
			categories: []
		}
		this.deleteProd = this.deleteProd.bind(this);
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

	deleteProd(id){
		console.log('deleteProd#: ', id);
		axios.delete(`/api/products/${id}`)
			.then(() => {
				console.log('successful delete')
				return axios.get('/api/products')
				.then(products => this.setState({products: products.data}));
			} 
		)
	}


	render(){
		const {products, categories} = this.state;
		const { deleteProd } = this;
		const divStyle = {margin: '5px'};
		return (
			<div className='col-sm-10'>
				<div className='well col-sm-9'>
					<h2> Product List</h2>
					<div className='row'>
					{products.map(product => {
						return (
							<div className='col-sm-3 well' key={product.id} style={divStyle}>
								<ProductForm product={product} categories={categories} deleteProd={deleteProd} />						
							</div>
						)
					})}
					</div>
				</div>

				<div className='col-sm-3'>
					<div className='well'>
						<h3> Add a Product</h3>
							<NewProductForm categories={categories}/>			
					</div>			
				</div>				
			</div>


			

		)
	}
}
