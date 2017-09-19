import React, {Component} from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

export default class AddProduct extends Component{
	constructor(){
		super();
		this.state = {
		}
	}


	render(){

		return (
			<div className='well'>
				<h3> Add a Product</h3>
					<ProductForm categories={categories} />			
			</div>
			

		)
	}
}