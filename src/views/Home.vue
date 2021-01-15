<template>
  <div class="container">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
        <div class="filters_wrapper">
          <div class="header">
            <h1 class="header-text">taME</h1>
            <h5 class="">Животные ищут <b>дом</b></h5>
          </div>
          <div class="filters">
            <vs-row align="center">
              <svg height="23" width="23" style="margin-right: 10px;">
                  <use xlink:href='img/sprite.svg#filter' style="fill: #FF8577;"></use>
              </svg>
              <a href="#" class="primary bold">
                фильтры
              </a>
            </vs-row>
            <vs-row style="margin-top: 20px;">
              <p class="secondary">
                Поиск по:
              </p>
              <vs-row>
                <a @click="filters.type === 'owner' ? filters.type = '' : filters.type = 'owner'" class="primary bold" href="#" style="margin-right: 20px;">Передержке</a>
                <a @click="filters.type === 'shelter' ? filters.type = '' : filters.type = 'shelter'" class="secondary" href="#">Приютам</a>
              </vs-row>
            </vs-row>
            <vs-row style="margin-top: 20px;" justify="space-between">
              <p class="secondary">
                Расстояние
              </p>
              <p class="secondary">
                {{filters.distance[0]}} - {{filters.distance[1]}} км
              </p>
              <vs-row>
                <vue-range-slider 
                ref="slider" 
                v-model="filters.distance" 
                :min="min" 
                :max="max" 
                :enable-cross="enableCross"
                width="100%"
                height="4"
                tooltip="hover"
                ></vue-range-slider>
              </vs-row>
            </vs-row>
            <vs-row style="margin-top: 20px;">
              <p class="secondary">
                Животное
              </p>
              <vs-row>
                <vs-button
                  icon
                  flat
                  border
                  color=""
                  active
                  style="margin: 0;"
                >
                  <svg height="25" width="25" style="padding: .5rem .4rem;">
                    <use xlink:href='img/sprite.svg#dog' style="fill: #000;"></use>
                  </svg>
                </vs-button>
                <vs-button
                  icon
                  flat
                  border
                  color="rgb(196, 196, 196)"
                  style="margin: 0; margin-left: 20px;"
                >
                  <svg height="25" width="25" style="padding: .5rem .4rem;">
                    <use xlink:href='img/sprite.svg#cat' style="fill: #000;"></use>
                  </svg>
                </vs-button><vs-button
                  icon
                  flat
                  border
                  color="rgb(196, 196, 196)"
                  style="margin: 0; margin-left: 20px;"
                >
                  <svg height="25" width="25" style="padding: .5rem .4rem;">
                    <use xlink:href='img/sprite.svg#other' style="fill: #000;"></use>
                  </svg>
                </vs-button>
              </vs-row>
            </vs-row>
            <vs-row style="margin-top: 20px;">
              <p class="secondary">
                Поиск по:
              </p>
              <vs-row>
                <a class="primary bold" href="#" style="margin-right: 20px;">Маленький</a>
                <a class="secondary" style="margin-right: 20px;" href="#">Средний</a>
                <a class="secondary" href="#">Крупный</a>
              </vs-row>
            </vs-row>
            <vs-row style="margin-top: 20px;">
              <p class="secondary">
                Порода
              </p>
              <vs-row>
                <vs-select
                  filter
                  multiple
                  placeholder="Любая"
                  v-model="filters.breed"
                >
                  <vs-option label="Без породы" value="1">
                    Без породы
                  </vs-option>
                  <vs-option label="Терьер" value="2">
                    Терьер
                  </vs-option>
                  <vs-option label="Бульдог" value="3">
                    Бульдог
                  </vs-option>
                  <vs-option label="Спаниель" value="4">
                    Спаниель
                  </vs-option>
                </vs-select>
              </vs-row>
            </vs-row>
            <vs-row style="margin-top: 20px;" justify="space-between">
              <p class="secondary">
                Возраст
              </p>
              <p class="secondary">
                {{filters.age[0]}} - {{filters.age[1]}}
              </p>
              <vs-row>
                <vue-range-slider 
                ref="slider" 
                v-model="filters.age" 
                :min="min" 
                :max="max" 
                :enable-cross="enableCross"
                width="100%"
                height="4"
                tooltip="hover"
                ></vue-range-slider>
              </vs-row>
            </vs-row>
          </div>
        </div>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="8">
        <cards-list class="cards_list" />
      </vs-col>
    </vs-row>
    
  </div>
</template>

<script>
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
import CardsList from '../components/CardsList.vue'

export default {
  name: 'Home',
  components: {
    CardsList,
    VueRangeSlider
  },
  data() {
    return {
      filters: {
        type: 'owner',
        distance: [0,3],
        animal: ['dog'],
        size: ['small'],
        age: [0,3],
        breed: ""
      },
      
      
    }
  },
  mounted() {
    this.$store.dispatch("GET_ANIMALS")
  },
  created() {
    this.min = 0
    this.max = 20
    this.enableCross = false
  }
}
</script>

<style>
.header {
  width: 100%;
}
.filters_wrapper {
  max-width: 600px;
}
.header-text {
  font-size: 48px;
  color: #FF8577;
  font-weight: bold;
  margin-left: 40px;
  text-align: left;
}
.header h5 {
  font-size: 36px;
  margin-bottom: 0;
  text-align: left;
  margin-top: 0px;
  margin-left: 40px;
  font-weight: 500;
  width: 200px;
}
.cards_list {
  width: auto;
}
.vs-sidebar__item:hover:after {
  left: 0;
}

.filters { 
  margin: 40px;
}

.vue-range-slider.slider-component .slider .slider-process {
  background-color:#FF8577;
}

.vue-range-slider.slider-component .slider-tooltip-wrap .slider-tooltip {
  background-color:#FF8577;
  border:#FF8577;
}
</style>