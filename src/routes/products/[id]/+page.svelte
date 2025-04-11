

<script>
    import {afterNavigate} from '$app/navigation';
    import Slider from './Slider.svelte';
    import {page} from '$app/stores';
      let {data}=$props();

      let product =$derived(data?.product);
      let relatedProducts =$derived(data?.relatedProducts);
      let cart =$derived(data?.cart);

      let recommendRequest =$state(new Promise(()=>{}));
      let userRequest =$state(new Promise(()=>{}));
      
      afterNavigate(()=>{
          recommendRequest =fetch(`/api/recommend?id=${product.id}`).then(res=>res.json());
          userRequest =fetch(`/api/self`).then(res=>res.json());
      
      });

  </script>
  <svelte:head>
    <meta name="twitter:card" content="summary" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={$page.url} />
    <meta property="og:title" content={product.name} />
    <meta property="og:description" content={`${product.name} - ${product.price}円`} />
	</svelte:head>
  <header class="header">
    <a href="/" class="header-title">SvelteEC</a>
    <nav>
        <ul class="header-links">
            <li>ようこそ
            {#await userRequest then user}
              {#if user}
                {user.email}さん <a href="/logout">ログアウト</a>
              {:else}
                ゲストさん <a href="/login">ログイン</a>
              {/if}
            {/await}
            </li>
            <li>
                <a href="/cart">カート(0)</a>
            </li>
        </ul>
    </nav>
  </header>
  <article class="product">
    <div class="product-main">
        <div class="image-container">
          <Slider images={data.product.images}/>
        </div>
    <div>
        <h2>{data.product.name}</h2>
        <dl>
            <dt>価格</dt>
            <dd>{product.price}円</dd>
        </dl>
        <div>
          {#if !cart.includes(product.id)}
            <form method="POST">
              <input type="hidden" name="productId" value={product.id}>
              {#await userRequest}
              <button type="submit">カートに入れる</button>
              {:then user}
              {#if !user}
              <p>カートを使うには<a href="/login">ログイン</a>してください</p>
              {/if}
              {/await}
            </form>
            {:else}
            <button disabled>カート追加済み</button>
            {/if}
        </div>
      </div>
    </div>
    <footer>
      <h3>おすすめ商品</h3>
      {#await recommendRequest}
      <div>ロード中...</div>
    {:then products}
      <ul>
        {#each products as product}
          <li>
            <a href="/products/{product.id}">{product.name}</a>
            -{product.price}円
          </li>
          {/each}
        </ul>
    {:catch error}
      <p>読み込みエラー: {error.message}</p>
    {/await}
        <h3>関連商品</h3>
        <ul>
            {#each relatedProducts as product}
            <li><a href="/products/{product.id}">{product.name}</a>
            -{product.price}円
            </li>
            {/each}
        </ul>
    </footer>
  </article>
  
  <style>
  :global(body){
    margin: 0;
    background-color: #eee;
    padding: 0;
    list-style: none;
  }
  
  
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    background-color: #fff;
    padding: 0 15px;
    width: 100%;
    max-width: 800px;
    height: 50px;
  }
  .header-title{
    font-weight: bold;
    text-decoration: none;
    color: #000;
  }
  .header-links{
    display: flex;
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
    color: #000;
  }
  .product{
    margin: 0 auto;
    background-color: #fff;
    padding: 15px;
    width: 100%;
    max-width: 800px;
    color: #000;
  }
  .product-main{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .image-container{
    width: 100%;
    max-width: 400px;
    overflow: hidden;
  }

  footer{
    text-align:left;
  }
  footer ul{
    list-style: none;
  }
  </style>