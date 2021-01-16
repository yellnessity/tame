<template>
<router-link :to="'/animal?id='+animal.id">
    <vs-card type="4">
        <template #title>
            <h3 style="text-align: left;">{{animal.name}}</h3>
        </template>
        <template #img>
            <img :src="animal.pics[0]" alt="">
        </template>
        <template #text>
            <vs-col w="6">
                <p style="text-align: left;">
                    {{animal.animal}}, {{animal.age | ageFilter}}, {{animal.size}}
                </p>
            </vs-col>
        </template>
        <template #interactions>
        <vs-button icon color="#FF8577">
            <i class='bx bx-heart' style="margin-right: 5px;"></i>
            <span class="span">
            {{animal.likes}}
            </span>
        </vs-button>
        <vs-button class="btn-chat" shadow primary>
            <svg height="20" width="20" style="margin-right: 5px;">
                <use xlink:href='img/sprite.svg#view' style="fill: #000;"></use>
            </svg>
            <span class="span">
            {{animal.views}}
            </span>
        </vs-button>
        </template>
    </vs-card>
</router-link>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from "moment"
export default {
    name: "PostCard",
    props: {
        post: String
    },
    computed: {
        ...mapGetters([
            'ANIMAL', 'USER'
        ]),
        animal() {
            return this.ANIMAL({id: parseInt(this.post)})
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
}
</script>

<style>
.vs-card-content.type-4 .vs-card__img {
    max-height: 300px;
}
.vs-card-content.type-4 .vs-card__text {
    width: 100%;
}
</style>