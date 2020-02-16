import React, {Component}  from 'react';
import Axios from 'axios'
// import API from './Api'
import Home from "./Home"
// import Axios from 'axios';
import {Link} from 'react-router-dom'
// import {ADD_TO_CART} from './CartAction'
// import {connect} from 'react-redux'
// import {addToCart} from './action/cartAction'




const URL = "http://localhost:8080/api/v1/"


class ListProduct extends Component {
    state = { 
        product:[],
        search: ''
     }


     getProduct=()=>{
        Axios.get(URL+"product",{header:{'x-access-token': localStorage.getItem('token')}})
        .then(res => {
            const product = res.data.result
            this.setState({product})
        })
     }

     componentDidMount = () => {
         this.getProduct();
     }

     updateSearch(event){
         this.setState({search: event.target.value.substr(0,20)})
     }

    render() { 
        let filterProduct = this.state.product.filter((product) => {
            return product.name.indexOf(this.state.search) !== -1
        }
         ) ;
        const renderData = filterProduct.map(product=> {
            return(
            
                        <Home product={product} key={product.id} refresh={this.getProduct}/>
                    
            )
            
            
        })

        return ( 
            <div style={{marginTop: 70}} className="container">
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{marginBottom:50}}>
                        <b className="navbar-brand">Toko IC</b>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto ">
                            <li className="nav-item justify-content-end">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item justify-content-end"><Link to="/add" className="nav-link">Add</Link></li>
                            <li className="nav-item justify-content-end"><Link to="/Login" className="nav-link">Login</Link></li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input type="search" className="form-control mr-sm-2"  placeholder="search" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                        </form>
                        </div>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md">
                        {renderData}
                        </div>
                </div>
            </div>
         );
    }
}


export default ListProduct;