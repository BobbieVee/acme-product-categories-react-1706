import React, {Component} from 'react';
import axios from 'axios';

export default class NewProductForm extends Component{
	constructor(props){
		super();
		this.state = {
			name:'',
			price: 0,
			inStock: false,
			categoryId: 0
		}
		this.categories = props.categories;
		this.handleChange =  this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log('props = ', props)

	}

	componentDidMount(){

	}

	handleChange(e){
		const { inStock } = this.state;
		const target = e.target;
		const name = target.name;
    const value =	name === "inStock" ? !inStock : target.value;
		this.setState({[name]: value});
	}

	handleSubmit(e){
		let {name, price, inStock, categoryId} = this.state;
		categoryId = categoryId === '0'? null: categoryId;
		axios.post('/api/products', {name, price, inStock, categoryId});
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

      </form>
			</div>
		)
	}
}
