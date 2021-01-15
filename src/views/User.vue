<template>
  <div class="center grid">
    <vs-row justify="start" style="padding-left: 40px; margin-top: 1.5rem;" class="info" >
        <vs-col w="4" justify="start">
            <div v-if="user" class="user_info">
                <vs-row justify="space-between" align="center">
                    <vs-avatar circle size="110">
                        <img :src="user.photo" alt="">
                    </vs-avatar>
                    <vs-col w="6" style="text-align: left; line-height: 150%;">
                        <h3 style="margin-bottom: 0;">{{user.name}}</h3>
                        <p class="secondary" style="margin-top: .5rem;">{{user.age | ageFilter}}, {{user.location}}</p>
                    </vs-col>
                    <vs-button
                        icon
                        flat
                        border
                        style="margin: 0;"
                    >
                        <img src="/img/edit.svg" style="padding: .5rem .4rem;" width="15" alt="">
                    </vs-button>
                </vs-row>
                <p class="secondary" style="line-height: 150%; text-align: left; margin-top: 40px;">
                    {{user.description}}
                </p>
                <vs-row align="center">
                    <svg height="25px" width="25px">
                        <use xlink:href='img/sprite.svg#pin' style="fill: #FF8577;"></use>
                    </svg>
                    <p style="margin: 0 10px; margin-left: 10px; font-weight: bold;">{{user.address}}</p>
                </vs-row>
                <vs-row align="center" style="margin-top: 10px;">
                    <svg height="25px" width="25px">
                        <use xlink:href='img/sprite.svg#suitcase' style="fill: #FF8577;"></use>
                    </svg>
                    <p style="margin: 0 10px; margin-left: 10px; font-weight: bold;">{{user.job}}</p>
                </vs-row>
                <vs-row align="center" style="margin-top: 10px;">
                    <svg height="25px" width="25px">
                        <use xlink:href='img/sprite.svg#paw' style="fill: #FF8577;"></use>
                    </svg>
                    <p style="margin: 0 10px; margin-left: 10px; font-weight: bold;">{{user.experience}}</p>
                </vs-row>
                <vs-row style="margin-top: 40px;">
                    <div v-for="(value, contact) in user.contacts" :key="contact" class="contacts-card">
                        <svg height="20" width="20">
                            <use :xlink:href="'img/sprite.svg#'+contact" style="fill: #000;"></use>
                        </svg>
                        <p class="bold" style="margin-bottom:0">{{value}}</p>
                    </div>
                </vs-row>
            </div>
        </vs-col>
        <vs-col w="8" style="padding-left: 50px;">
            <vs-row v-if="user">
                <h3 style="text-align: left;">Ближайшие встречи</h3>
                <vs-card-group>
                    <meeting-card v-for="meeting in user.meetings" :key="meeting.id" :meeting="meeting" />
                </vs-card-group>
            </vs-row>
            <vs-row align="center">
                <h3 style="text-align: left;">Ваши объявления</h3>
                <vs-button
                    style="margin-left: 10px;"
                    border
                    @click="addAnimalOpened=!addAnimalOpened"
                >
                    <i class='bx bx-plus'></i>
                </vs-button>
                <add-animal :active="addAnimalOpened" @onClose="addAnimalOpened = false" @onAnimalAdd="openConfirmation" />
                <confirm-dialog :active="confirmationOpened" />
            </vs-row>
            <vs-row v-if="user">
                <post-card v-for="post in user.posts" :key="post" :post="post" />
            </vs-row>
        </vs-col>
    </vs-row>
</div>
</template>

<script>
import MeetingCard from '../components/MeetingCard.vue'
import PostCard from '../components/PostCard'
import AddAnimal from '../components/AddAnimal'
import ConfirmDialog from '../components/ConfirmDialog'
import { mapGetters } from 'vuex'
import moment from "moment"

export default {
    components: { MeetingCard, PostCard, AddAnimal, ConfirmDialog },
    name: "User",
    data() {
        return {
            addAnimalOpened: false,
            confirmationOpened: false
        }
    },
    computed: {
        ...mapGetters([
            'ANIMAL', 'USER'
        ]),
        user() {
            return this.USER({id: 2})
        }
    },
    beforeMount() {
        this.$store.dispatch('GET_ANIMALS')
        this.$store.dispatch('GET_USERS')
    },
    methods: {
        addAnimal() {
            this.$store.dispatch("ADD_ANIMAL", {
                name: "Kotik",
                gender: "male"
            })
        },
        openConfirmation() {
            this.addAnimalOpened = false
            this.confirmationOpened = true
        }
    },
    watch: {
        // animal() {
        //     if (this.animal) {
        //         this.owner = this.USER({id: parseInt(this.animal.owner_id)})
        //     }
        // }
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
            // var tempTime = moment(value)
            return moment(value).fromNow(true);
        }
    },
}
</script>

<style>
.contacts-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 20px; 
    width: auto;
    border: 1px solid #FF8577;
    border-radius: 15px;
    padding: 15px;
    margin-right: 15px;
}
</style>