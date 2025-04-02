import Api from './api'

export default {
    addToCart:(data)=>Api.post('orders/add_to_cart/',data),
    cartView:()=>Api.get('orders/cart_view/'),
    clearCart:()=>Api.post('orders/clear_cart/'),
    updateCartItem:(data)=>Api.post('orders/update_cart_item/',data),
    removeItem:(data)=>Api.post('orders/remove_item/',data),
    createOrder:(data)=>Api.post('orders/create_order/',data),
    orderList:()=>Api.get('orders/list/'),
    getAll:()=>Api.get('orders/get_all/'),
    orderDetail:(id)=>Api.get(`orders/detail/?id=${id}`),

}
