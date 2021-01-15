<template>
    <vs-card>
    <template #title>
        <h2 v-if="animal">
            {{animal.name}} 
            <img v-if="animal.gender === 'female'" height="24" class="sex-sign" src='../assets/female-sign.svg' />
            <img v-if="animal.gender === 'male'" height="24" class="sex-sign" src='../assets/male-sign.svg' />
        </h2>
    </template>
    <template v-if="animal" #img>
      <img v-if="animal.id <= 3" :src="'/img/animals/'+animal.id+'/1.jpg'" alt="">
      <img v-else src='/img/animals/stub.jpg' alt="">
    </template>
    <template #text>
      <p v-if="animal" class="primary" style="text-align: left; font-size: 1rem; color: primary; font-weight: bold; color: primary;">
        {{animal.animal}}, {{animal.age | ageFilter}}
      </p>
      <p v-if="animal" class="primary" style="text-align: left; font-size: 1rem; font-weight: bold;">{{animal.size}}</p>
    </template>
    <template #interactions>
      <vs-button primary icon>
        <i class='bx bx-heart'></i>
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from "moment"
export default {
    name: "Card",
    props: {
      id: Number
    },
    computed: {
      ...mapGetters([
          'ANIMAL'
      ]),
      animal() {
          return this.ANIMAL({id: parseInt(this.id)})
      }
    },
    filters: {
        ageFilter: function(value) {
            moment.locale('ru');
            var start = moment(0);
            var end   = moment(value);
            return end.from(start, true); 
        }
    },
}
</script>

<style>
.vs-card {
  margin-bottom: 50px;
}
.vs-card__img {
    max-height: 350px;
}
.vs-card__title h2 {
    font-size: 2.5rem;
    text-align: left;
    margin-top: .5rem;
}
.sex-sign path {
    fill: red;
}

</style>