import {loadProducts} from '$lib/server/product';
import { error } from '@sveltejs/kit';
import{addToCart,loadCart} from '$lib/server/cart'


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
export  async function load({params}){
    const products= await loadProducts();
    const product =products.find((product)=>product.id === params.id);
    const relatedProducts = products.filter((product)=>product.id !==params.id);
    const cart = await loadCart();
    return{
        product,
        relatedProducts,
        cart
    }
}
export const actions ={
    default:async({request})=>{
        const data =await request.formData();
        await addToCart(data.get('productId'));
    }
}
