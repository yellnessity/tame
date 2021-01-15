<template>
    
        <vs-card type="3" style="opacity: 1;">
            <template #img>
            <img :src="animal.pics[0]" alt="">
            </template>
            <template #text>
                <vs-row class="mh" align="center" justify="space-between" direction="column" style="height: 100%;">
                    <vs-col>
                        <h3 style="text-align: left; margin-top: 0; margin-bottom: 0; padding-top:0;">{{animal.name}}</h3>
                        <p style="text-align: left;">{{animal.animal}}, {{animal.age | ageFilter}}</p>
                        <p style="text-align: left; margin-top: 10px; margin-bottom: 5px;">
                            <svg height="15" width="15" style="vertical-align: bottom;">
                                <use xlink:href='img/sprite.svg#time' style="fill: #000; opacity: .7;"></use>
                            </svg>
                            {{meeting.datetime | dateFilter}}
                        </p>
                        <p style="text-align: left;">
                            <svg height="15" width="15" style="vertical-align: bottom;">
                                <use xlink:href='img/sprite.svg#user' style="fill: #000; opacity: .7;"></use>
                            </svg>
                            {{owner.name}}
                        </p>
                    </vs-col>
                    <vs-col>
                        <vs-row>
                            <vs-button
                                icon
                                primary
                                style="margin-left: 0; color: black;"
                            >
                                <svg height="15" width="15">
                                    <use xlink:href='img/sprite.svg#chat' style="fill: #000;"></use>
                                </svg>
                                Написать
                            </vs-button>
                            <vs-button
                                icon
                                flat
                                border
                                style="margin-right: 0;"
                            >
                                <svg height="15" width="15">
                                    <use xlink:href='img/sprite.svg#edit' style="fill: #000;"></use>
                                </svg>
                            </vs-button>
                        </vs-row>
                    </vs-col>
                </vs-row>
            </template>
        </vs-card>
  
</template>

<script>
import { mapGetters } from 'vuex'
import moment from "moment"

export default {
    name: "MeetingCard",
    props: {
        meeting: Object
    },
    data() {
        return {
            owner: {}
        }
    },
    mounted() {
        this.$store.dispatch('GET_USERS')
    },
    computed: {
        ...mapGetters([
            'ANIMAL', 'USER'
        ]),
        animal() {
            return this.ANIMAL({id: this.meeting.animal_id})
        }
    },
    filters: {
        ageFilter: function(value) {
            moment.locale('ru');
            var start = moment(0);
            var end   = moment(value);
            return end.from(start, true); 
        },
        dateFilter: function(value) {
            moment.locale('ru');
            return moment(value).format("DD.MM, kk:mm")
        }
    },
    watch: {
        animal() {
            if (this.animal.owner_id) {
                this.owner = this.USER({id: parseInt(this.animal.owner_id)})
            }
        }
    }
}
</script>

<style>
.vs-card-content.type-3 .vs-card__img {
    max-height: 200px;
    max-width: 200px;
}
</style>