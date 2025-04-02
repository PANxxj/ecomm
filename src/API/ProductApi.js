import Api from './api'

export default {
    allProducts:()=>Api.get('products/list/'),
    createProduct:(data)=>Api.post('products/create/',data),
    deleteProduct:(id)=>Api.delete(`products/delete/?id=${id}`),
    updateProduct:(data)=>Api.put(`products/update/${Number(data.id)}/`,data),

}