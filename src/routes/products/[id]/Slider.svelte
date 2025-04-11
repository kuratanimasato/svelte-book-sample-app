<script>
    let  {images} = $props();
    let sliderCenterIndex = $state(0);
    let sliderLeftIndex = $state(images.length -1);
    let sliderRightIndex = $state(1);

    let centerIndex =$state(0);
    const leftIndex = $derived((centerIndex -1 + images.length) % images.length) ;
    const rightIndex = $derived((centerIndex +1) % images.length);
    function slideMoveLeft()
        {
            sliderCenterIndex =(sliderCenterIndex - 1 + images.length) % images.length;
        }
        function slideMoveRight()
    {
        sliderCenterIndex =(sliderCenterIndex + 1 + images.length) % images.length;
    }
</script>
<div class="slider">
    <img src={images[sliderLeftIndex]} alt="スライダー画像左" class="slider-item left">
    <img src={images[sliderCenterIndex]} alt="スライダー画像中" class="slider-item center">
    <img src={images[sliderRightIndex]} alt="スライダー画像右" class="slider-item right">
<button class="slider-left-button" onclick={slideMoveLeft}>前へ</button>
<button class="slider-right-button" onclick={slideMoveRight}>次へ</button>
</div>

<style>
        .slider{
    position: relative;
    width: 80%;
    margin: 0 10%;
    overflow: hidden;
    }
    .slider-item{
    width: 100%;
    }
    .slider-item.left{
    position: absolute;
    top: 0;
    right: 100%;
    }
    .slider-item.right{
    position: absolute;
    top: 0;
    left: 100%;
    }
</style>