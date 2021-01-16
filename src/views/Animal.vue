<template>
<div class="center grid">
    <vs-row justify="start" style="padding-left: 50px; margin-top: 1.5rem;" class="info" >
        <vs-col w="3" justify="start">
            <vs-row align="baseline" justify="space-between">
                <h1 style="margin-top: 0;">
                    {{animal ? animal.name : ''}}
                    <img v-if="animal.gender === 'female'" height="24" class="sex-sign" src="../assets/female-sign.svg" />
                    <img v-if="animal.gender === 'male'" height="24" class="sex-sign" src="../assets/male-sign.svg" />
                </h1>
                <img src="../assets/star.svg" alt="">
            </vs-row>
            <p v-if="animal" class="animal_info">
                {{animal ? animal.animal : ''}}, {{animal ? animal.size : ''}}<br>
                {{animal.age | ageFilter}}
            </p>
            <vs-button
                size="large"
            >
                <img src="../assets/paw.svg" style="padding-right: .5rem;" width="20" alt=""> Встреча 
            </vs-button>
            <div class="owner_info">
                <vs-row justify="space-between">
                    <vs-col w="9" >
                        <vs-row align="center">
                            <vs-avatar circle style="margin-right: 20px;">
                                <img :src="'/img/users/'+owner.id+'.png'" alt="">
                            </vs-avatar>
                            <b>{{owner ? owner.name : ''}}</b>
                        </vs-row>
                        <p>{{owner ? owner.address : ''}} <nobr> <span class="secondary">(6 км от Вас)</span> </nobr></p>
                        <p>{{owner ? owner.phone : '' }}</p>
                    </vs-col>
                    <vs-button
                        icon
                        flat
                        border
                        style="margin: 0;"
                    >
                        <img src="../assets/chat.svg" style="padding: .7rem .5rem;" width="20" alt="">
                    </vs-button>
                </vs-row>
            </div>
            <div class="animal_info">
                <p>Информация</p>
                <vs-row justify="space-between">
                    <span class="secondary">Адаптация</span>
                    <span class="primary bold">{{animal && animal.info.adaptation ? "Адаптирован" : "Не адаптирован"}}</span>
                </vs-row>
                <vs-row justify="space-between" style="margin: 1rem 0;">
                    <span class="secondary">Шерсть</span>
                    <span class="primary bold">{{animal ? animal.info.fur : ""}}</span>
                </vs-row>
                <vs-row justify="space-between" style="margin: 1rem 0;">
                    <span class="secondary">Размер</span>
                    <span class="primary bold">{{animal ? animal.info.size : ""}}</span>
                </vs-row>
            </div>
            <div class="animal_traits">
                <p>Характер</p>
                <div v-if="animal">
                    <vs-alert v-for="(value, trait) in animal.traits" :key="trait" solid color="secondary" style="color: black; margin-bottom: 20px;">
                        <vs-row justify="space-between">
                            <span>{{trait | translator}}</span>
                            <traits-meter :value="value" :trait="trait" />
                        </vs-row>
                    </vs-alert>
                </div>
            </div>
            <div class="animal_health">
                <p>Здоровье</p>
                <div v-if="animal">
                    <vs-alert v-if="animal.health.vaccine" solid color="secondary" style="color: black; margin-bottom: 20px;">
                            <p class="secondary"> <img src="../assets/syringe.svg" style="padding-right: .5rem;" width="15" alt=""> Вакцинация</p>
                            <p class="primary bold">{{animal.health.vaccine ? "Вакцинирован" : "Не вакцинирован"}}</p>
                    </vs-alert>
                    <vs-alert v-if="animal.health.sterile" solid color="secondary" style="color: black; margin-bottom: 20px;">
                            <p class="secondary"> <img src="../assets/gender.svg" style="padding-right: .5rem;" width="15" alt=""> Стерилизация</p>
                            <p class="primary bold">{{animal.health.sterile ? "Стерилизован" : "Не стерилизован"}}</p>
                    </vs-alert>
                </div>
            </div>
            <div class="animal_reason">
                <p>Почему я ищу дом?</p>
                <div v-if="animal">
                    <p class="primary">Меня нашли на улице и временно приютили в питомнике.</p>
                </div>
            </div>
        </vs-col>
        <vs-col v-if="animal" style="padding-left: 50px;" w="9">
                <images-swiper :photos="animal.pics" style="width: 100%;" />
                <vs-row>
                    <vs-col w="10">
                        <p class="secondary"> 
                            Дата создания: {{animal.creation_datetime | creationDatetimeFilter}}
                        </p>
                        <p style="line-height: 150%;">
                            {{animal.description}}
                        </p>
                    </vs-col>
                </vs-row>
        </vs-col>
    </vs-row>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from "moment"
import TraitsMeter from '../components/TraitsMeter.vue'
import ImagesSwiper from '../components/ImagesSwiper.vue'
export default {
  components: { TraitsMeter, ImagesSwiper },
    props: {
        animalId: String
    },
    name: "Animal",
    data() {
        return {
            owner: {}
        }
    },
    computed: {
        ...mapGetters([
            'ANIMAL', 'USER'
        ]),
        animal() {
            return this.ANIMAL({id: parseInt(this.animalId)})
        }
    },
    mounted() {
        this.$store.dispatch('GET_ANIMALS')
        this.$store.dispatch('GET_USERS')
    },
    beforeMount() {
        this.$store.dispatch('GET_ANIMALS')
        this.$store.dispatch('GET_USERS')
    },
    watch: {
        animal() {
            if (this.animal) {
                this.owner = this.USER({id: parseInt(this.animal.owner_id)})
            }
        }
    },
    filters: {
        // formatDate: function(date) {
        //     return moment(date).format("DD.MM.YYYY, kk:mm")
        // },
        translator: function(value) {
            switch (value) {
                case "active":
                    return "Активность"
                case "friendly":
                    return "Дружелюбность"
                case "sociable":
                    return "Социальность"
                default:
                    break;
            }
        },
        creationDatetimeFilter: function(value) {
            moment.locale('ru');
            return moment(value).format("DD.MM.YYYY")
        },
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
.info {
    text-align: left;
}
h1 {
    text-align: left;
    margin-bottom: 0px;
}
p.animal_info {
    font-weight: bold;
    color: #FF8577;
    margin: 15px 0;
}
.vs-button--size-large .vs-button__content {
    padding: 1rem 2rem;
    color: black;
    font-weight: bold;
}
.owner_info, .animal_info, .animal_traits, .animal_health, .animal_reason {
    margin-top: 40px;
}
.vs-alert {
    border-radius: 12px;
}

.animal_health .vs-alert, .animal_traits .vs-alert {
    padding: 10px;
}

.animal_health .vs-alert .vs-alert__content__text {
    padding: 0 15px;
}
</style>