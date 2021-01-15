<template>
    <vs-dialog width="550px" not-center v-model="active">
        <template #header>
            <h4 class="not-margin">
            Добавление карточки
            </h4>
        </template>


        <div class="con-content">
            <p>
                Карточка успешно опубликована!
            </p>
        </div>

        <template #footer>
            <div class="con-footer">
            <vs-button @click="active=false" transparent>
                Ok
            </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>

<script>
export default {
    name: "ConfirmDialog",
    props: {
        active: Boolean
    }
}
</script>

<style>

</style>