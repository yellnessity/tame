<template>
<div class="center grid" style="margin-top: 40px;">
    <vs-row justify="center">
        <div class="center content-inputs">
            <vs-input border placeholder="Поиск">
            <template #icon>
            <i class='bx bx-search'></i>
            </template>
            </vs-input>
        </div>
    </vs-row>
    <vs-row v-if="animals" style="margin-top: 40px;">
      <vs-col v-for="animal in animals" :key="'animal_'+animal.id" vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <router-link :to="'/animal?id='+animal.id">
          <Card :id="animal.id" />
        </router-link>
      </vs-col>
    </vs-row>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Card'

export default {
    name: "CardsList",
    components: {
        Card
    },
    mounted() {
        this.$store.dispatch('GET_ANIMALS')
    },
    beforeMount() {
        this.$store.dispatch('GET_ANIMALS')
    },
    computed: {
        ...mapGetters([
            'ANIMAL'
        ]),
        animals() {
            return this.ANIMAL()
        }
    },
}
</script>

<style>

</style>