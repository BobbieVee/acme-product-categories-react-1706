import React, {Component} from 'react';
import axios from 'axios';

export default class ProductForm extends Component{
	constructor(){
		super();
		this.state = {
		}
	}


	render(){
		const { product } = this.props;
		return (
			<div>
				<h3> {product.name}</h3>

			</div>
			

		)
	}
}
