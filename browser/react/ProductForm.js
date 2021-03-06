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
		this.deleteProd = props.deleteProd;
		this.newProductForm = props.newProductForm;
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
		this.setState({[name]: value});
	}

	handleSubmit(e){
		const id = this.product.id;
		let {name, price, inStock, categoryId} = this.state;
		categoryId = categoryId === '0'? null: categoryId;
		if (this.props.newProductForm){
			axios.post('/api/products', {name, price, inStock, categoryId} )
		} else {
			axios.put(`/api/products/${id}`, {name, price, inStock, categoryId})
			.then(product =>{
				console.log('success')
			})
		}


		e.preventDefault();
	}



	render(){
		const {name, price, inStock, categoryId} = this.state;
		const {handleChange, handleSubmit, product, categories, deleteProd} =  this;

		console.log('categories:', categories)

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
	          <select className="form-control" name='categoryId' value={categoryId} onChange={handleChange}>
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
    			<button className='btn btn-danger btn-sm' onClick={() => deleteProd(product.id)}>delete</button>

      	</form>
			</div>
		)
	}
}
