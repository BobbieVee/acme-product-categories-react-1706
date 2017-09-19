import React, {Component} from 'react';
import axios from 'axios';

export default class ProductForm extends Component{
	constructor(props){
		super();
		this.state = {
			name:'',
			price: 0,
			inStock: false,
			categoryId: 0
		}
		this.product = props.product;
		this.categories = props.categories;
		this.handleChange =  this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		let { name, price, inStock, categoryId } = this.product;
		categoryId = !categoryId? 0 : categoryId;
		this.setState({name, price, inStock, categoryId})
	}

	handleChange(e){
		const { inStock } = this.state;
		const target = e.target;
		const name = target.name;
    const value =	name === "inStock" ? !inStock : target.value;
    console.log('name:', name)
    console.log('value:', value)
		this.setState({[name]: value});
	}

	handleSubmit(e){
		const id = this.product.id;
		let {name, price, inStock, categoryId} = this.state;
		categoryId = categoryId === '0'? null: categoryId;
		axios.put(`/api/products/${id}`, {name, price, inStock, categoryId})
		.then(product =>{
			console.log('success')
		})
		e.preventDefault();
	}

	render(){
		const categories = this.categories;
		const {name, price, inStock, categoryId} = this.state;
		const {handleChange, handleSubmit} =  this;

		console.log('categoryId = ', categoryId)

		return (
			<div>
			  <form className='form-group' onSubmit={handleSubmit}>
	        <label>
	          Name:
	          <input className='form-control' name='name' type="text" value={name} onChange={handleChange} />
	        </label>
	        <label>
	          Price:
	          <input className='form-control' name='price' type="number" value={price} onChange={handleChange} />
	        </label>
	        <label>
	          Instock:
	          <input
	            name="inStock"
	            type="checkbox"
	            checked={inStock}
	            onChange={handleChange} />
	        </label>
	        <label>
	          Category
	          <select name='categoryId' value={categoryId} onChange={handleChange}>
	          	<option value="0">-- None --</option>
		          {categories.map(category => {
		          	return (
		          		<option key={category.id} value={category.id}>{category.name}</option>
	          		)
		          })}
	          </select>
	        </label>
	        <br />

        		<input className='btn btn-primary' type="submit" value="Save" />


      </form>

			</div>
			

		)
	}
}
