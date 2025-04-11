import {loadProducts} from '$lib/server/product';
import { error } from '@sveltejs/kit';
import{addToCart,loadCartItems} from '$lib/server/cart'


async function getProducts(){
    return[
        {
            id:'svelte-book',
            name:'Svelte Book',
            price:3500,
            images:[
                'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-1.png',
                'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-2.png',
                'https://github.com/svelte-book/sample-app/raw/main/static/svelte-book-3.png',
            ],
        },
        {
            id:'react-book',
            name:'React book',
            price:3500,
            images:[
                'https://github.com/svelte-book/sample-app/raw/main/static/react-book-1.png',
                'https://github.com/svelte-bbok/sampke-app/raw/main/static/react-book-2.png',
                'https://github.com/svelte-bbok/sampke-app/raw/main/static/react-book-3.png',
            ],
        },
        {
            id:'vue-book',
            name:'Vue book',
            price:3500,
            images:[
                'https://github.com/svelte-book/sample-app/raw/main/static/vue-book-1.png',
                'https://github.com/svelte-bbok/sampke-app/raw/main/static/vue-book-2.png',
                'https://github.com/svelte-bbok/sampke-app/raw/main/static/vue-book-3.png',
            ]
        },
        {
            id:'angular-book',
            name:'Angular book',
            price:3500,
            images:[
                'https://github.com/svelte-book/sample-app/raw/main/static/angular-book-1.png',
                'https://github.com/svelte-bbok/sampke-app/raw/main/static/angular-book-2.png',
                'https://github.com/svelte-bbok/sampke-app/raw/main/static/angular-book-3.png',
            ]
        }
    ]
}
async function getProductFromDatabase(productId){
    const products = await loadProducts();
    return products.find(product => product.id === productId);
}
async function getRelatedProductsFromDatabase(productId){
    const products = await loadProducts();
    return products.filter(product => product.id !== productId);
}
export  async function load({locals,params}){
    const products= await loadProducts();
    const product =products.find((product)=>product.id === params.id);
    const relatedProducts = products.filter((product)=>product.id !==params.id);
    let cart =[];
    if(locals.currentUser){
       cart = await loadCartItems(localStorage.currentUser.userId);
    }
    return{
        product,
        relatedProducts,
        cart
    }
}
export const actions ={
    default:async({locals,request})=>{
       if(locals.currentUser){
        const data=await request.formData();
        await addToCart(locals.currentUser.userId, data.get('productId'));
       }
    }
}
