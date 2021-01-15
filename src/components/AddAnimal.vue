<template>
  <vs-dialog v-model="active" @close="$emit('onClose')">
        <template #header>
          <h4 class="not-margin">
            Добавление карточки животного
          </h4>
        </template>
        <div class="grid center">
            <vs-row justify="center">
                <vs-col w="4">
                    <vs-input v-model="animal.name" label-placeholder="Имя" style="margin-bottom: 2rem;" />
                </vs-col>
                <vs-col w="4"  style="padding: 0 10px;">
                    <vs-select label-placeholder="Пол" v-model="animal.gender" style="margin-bottom: 2rem;">
                        <vs-option label="Мальчик" value="male">
                            Мальчик
                        </vs-option>
                        <vs-option label="Девочка" value="female">
                            Девочка
                        </vs-option>
                    </vs-select>
                </vs-col>
                <vs-col w="4">
                    <vs-select label-placeholder="Размер" v-model="animal.size" style="margin-bottom: 2rem;">
                        <vs-option label="Маленький" value="маленький">
                            Маленький
                        </vs-option>
                        <vs-option label="Средний" value="средний">
                            Средний
                        </vs-option>
                        <vs-option label="Крупный" value="крупный">
                            Крупный
                        </vs-option>
                    </vs-select>
                </vs-col>
                <vs-col w="11">    
                    <vs-input class="textarea" v-model="animal.description" label-placeholder="Ошипите своего питомца" type="text" style="margin-bottom: 2rem;" />
                </vs-col>
            </vs-row>
            <vs-row>
                <vs-col w="11">
                <h4 style="text-align: left;">Информация</h4>
                <vs-row justify="start">
                    <vs-col w=4>
                        <vs-select label-placeholder="Животное" v-model="animal.animal" style="margin-bottom: 2rem;">
                            <vs-option label="Кот" value="кот">
                                Кот
                            </vs-option>
                            <vs-option label="Собака" value="собака">
                                Собака
                            </vs-option>
                        </vs-select>
                    </vs-col>
                    <vs-col style="padding: 0 10px;" w="4" justify="center">
                        <vs-checkbox v-model="animal.info.adaptation" style="margin-bottom: 2rem;">
                            Адаптирован(-а)
                        </vs-checkbox>
                    </vs-col>
                    <vs-col w=4>
                        <vs-select label-placeholder="Шерсть" v-model="animal.info.fur" style="margin-bottom: 2rem;">
                            <vs-option label="Короткая" value="Короткая">
                                Короткая
                            </vs-option>
                            <vs-option label="Длинная" value="Длинная">
                                Длинная
                            </vs-option>
                        </vs-select>
                    </vs-col>
                </vs-row>
            </vs-col>
            </vs-row>
            
            <h4 style="text-align: left; margin-bottom: 0px;">Характер</h4>
            <p style="text-align: left; margin-bottom: 2rem;">Оцените по 100-балльной шкале черты характера Вашего питомца.</p>
            <vs-row justify="center">
                <vs-col w="4">
                    <vs-input v-model="animal.traits.active" label-placeholder="Активность" type="number" max="100" style="margin-bottom: 2rem;" />
                </vs-col>
                <vs-col w="4"  style="padding: 0 10px;">
                    <vs-input v-model="animal.traits.sociable" label-placeholder="Социальность" type="number" max="100" style="margin-bottom: 2rem;" />
                </vs-col>
                <vs-col w="4">
                    <vs-input v-model="animal.traits.friendly" label-placeholder="Дружелюбность" type="number" max="100" style="margin-bottom: 2rem;" />
                </vs-col>
            </vs-row>

            <h4 style="text-align: left; margin-bottom: 0px;">Здоровье</h4>
            <vs-row justify="center">
                <vs-col>
                <div style="margin: 15px 0;">
                    <vs-row>
                        <span>Вакцинация</span>
                        <vs-switch v-model="animal.health.vaccine" style="margin-left: 10px;">
                            <svg height="10px" width="10px">
                                <use xlink:href='img/sprite.svg#vaccine'></use>
                            </svg>
                        </vs-switch>
                    </vs-row>
                </div>
                <div style="margin: 15px 0;">
                    <vs-row>
                        <span>Стерилизация</span>
                        <vs-switch v-model="animal.health.sterile" style="margin-left: 10px;">
                            <svg height="10px" width="10px">
                                <use xlink:href='img/sprite.svg#sex'></use>
                            </svg>
                        </vs-switch>
                    </vs-row>
                </div>
                </vs-col>
            </vs-row>


        </div>

        <template #footer>
          <div style="display: flex; width: 100%; justify-content: center;">
            <vs-button @click="confirmAdd" style="width: 250px;" size="large">
              Добавить
            </vs-button>
          </div>
        </template>
      </vs-dialog>
</template>

<script>
import moment from "moment"
export default {
    name: "AddAnimal",
    props: {
        active: Boolean
    },
    data() {
        return {
            close: false,
            animal: {
                name: "",
                gender: "",
                size: "",
                age: 5079600000,
                animal: "",
                description: "",
                info: {
                    adaptation: false,
                    fur: "",
                    size: ""
                },
                traits: {
                    active: '',
                    sociable: '',
                    friendly: ''
                },
                health: {
                    vaccine: false,
                    sterile: false
                },
                reason: "Меня нашли на улице и временно приютили в питомнике.",
            }
            
        }
    },
    methods: {
        confirmAdd() {
            let now = moment()
            this.$store.dispatch("ADD_ANIMAL", {...this.animal, creation_datetime: now.valueOf(), 
            pics: ["/img/animals/stub.jpg"], likes: 0, views: 0
            })
            this.$emit('onAnimalAdd')
            this.close = true
        }
    }
}
</script>

<style>
.vs-dialog {
    max-width: 1000px;
    width: 800px;
}
.vs-input {
    width: 100%;
    height: 38px;
}
.vs-select-content {
    max-width: 100%;
}
</style>