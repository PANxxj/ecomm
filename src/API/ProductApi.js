import Api from './api'

export default {
    allProducts:(search,category)=>Api.get(`products/list/?search=${search}&category=${category}`),
    createProduct:(data)=>Api.post('products/create/',data),
    deleteProduct:(id)=>Api.delete(`products/delete/?id=${id}`),
    getProduct:(id)=>Api.get(`products/get/?id=${id}`),
    updateProduct:(data)=>Api.put(`products/update/${Number(data.id)}/`,data),

}