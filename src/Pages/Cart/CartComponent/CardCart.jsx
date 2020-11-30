import {faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, {useState} from 'react'
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline'
import { connect } from 'react-redux'
import { ApiUrl } from '../../../Constant/ApiUrl'
import { updateQty } from '../../../Redux/Actions/Products/CartActions'

const CardCart = ({stateUpdateQty, updateQty, productName, brand, price, discount, size, image, qty, stock, est, cityGudang, id, variant_product_id}) => {

    const [updateQtyLocal, setUpdateQtyLocal] = useState(qty && qty)
    const [errorMessage, setErrorMessage] = useState('')

    const onUpdateQty = () => {
        let data = {
            id : id,
            variant_product_id : variant_product_id,
            token : localStorage.getItem('token'),
            qty : updateQtyLocal
        }

        if(data.id && data.variant_product_id && data.token && data.qty !== qty){
            updateQty(data)
        }
    }

    const onDeleteCart = () => {
        
    }
    
    return (
        <div className='row border mb-3'>
            <div className='col-md-2 p-2'>
                <img 
                src={ApiUrl + 'public/product/' + image} 
                className='aa-image-thumb'
                alt='image-product'
                />
            </div>
            <div className='col-md-6 p-2 container-product-info-cart'>
                <div>
                    <p className='aa-title-text'>{productName}</p>
                    <p className='aa-brands-name-cart'>{brand}</p>
                </div>

                <div className='aa-container-option-cart'>
                    <p className='aa-option-cart'>Size : {size}</p>
                    <p className='aa-option-cart'>Estimated Delivery Date : {est && moment(new Date()).add(est, 'days').format('L')}</p>
                    <p className='aa-option-cart shipping-cart'>*Shipping from <span style={{textDecoration : 'underline'}}>{cityGudang && cityGudang}</span> warehouse to your shipping address</p>
                    <p className='aa-option-cart-smaller'>Change shipping Address ?</p>
                </div>

            </div>
            <div className='col-md-4 p-2 pr-4' style={{display : 'flex', flexDirection : 'column', alignItems : 'flex-end', justifyContent : 'space-around'}}>
                <span style={{display :'flex'}}>
                    <p>Rp. {price && (price * qty).toLocaleString('id-ID')}</p>
                </span>
                <span >
                    <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
                        <input 
                            min={0} 
                            max={stock} 
                            type='number' 
                            style={{width : 50, fontSize : 14, textAlign : 'center'}} 
                            value={updateQtyLocal} 
                            onChange={(e) => setUpdateQtyLocal(e.target.value)}
                        />
                        <FontAwesomeIcon onClick={onUpdateQty} icon={faSyncAlt} style={{fontSize : 14, marginLeft : 10, marginRight : 5, cursor : 'pointer', display : updateQtyLocal === qty ? 'none' : 'inline-block'}} />
                        <IosCloseCircleOutline onClick={() => {setUpdateQtyLocal(qty);setErrorMessage('')}} style={{cursor : 'pointer',width : 20, height : 20, display : updateQtyLocal === qty ? 'none' : 'inline-block'}}  fontSize="60px" color='black' />
                    </div>
                    {
                        stateUpdateQty.error ?
                        <p  
                            style={{fontSize : 11, marginTop : 5, color : 'red'}}>
                            {stateUpdateQty.error}
                        </p>
                        :
                        null

                    }
                </span>
                <div style={{display : 'flex'}}>
                    <p style={{fontSize : 12, textDecoration : 'underline', cursor : 'pointer'}}>SAVE FOR LATER</p>
                    <p onClick={onDeleteCart} style={{fontSize : 12, textDecoration : 'underline', marginLeft : 10, cursor : 'pointer'}}>REMOVE</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        stateUpdateQty : state.updateQty
    }
}

const mapDispatchToProps = {
    updateQty
}


export default connect(mapStateToProps, mapDispatchToProps) (CardCart)
