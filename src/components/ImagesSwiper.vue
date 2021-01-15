<template>
  <div class="swiper-container">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
          <!-- Slides -->
          <div v-for="photo in photos" :key="photo" class="swiper-slide">
              <img :src="photo" height="500" alt="">
          </div>
      </div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'

Swiper.use([ Navigation, Pagination ])

export default {
  props: {
    photos: Array
  },
  mounted() {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      loop: true,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })
  }
}
</script>

<style scoped>
.swiper-container {
    width: 100%;
    height: 500px;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    width: auto;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.swiper-button-prev, .swiper-button-next {
    color: white;
    opacity: .5;
}

</style>