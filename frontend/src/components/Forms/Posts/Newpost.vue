<template>
    <form>
        <div class="input-gif">
            <input type="text" placeholder="Rechercher un gif..." @focus="inputFocused" @blur="inputFocused">
            <div v-if="reveal" class="datalist"></div>
        </div>
        <p class="alternative">Ou insérer une image</p>
        <textarea placeholder="Ajouter une description"></textarea>
        <button>Publier</button>
    </form>
</template>

<script>
export default {
    name: "FormNewpost",
    data() {
        return {
            reveal: false
        }
    },
    methods: {
        inputFocused() {
            this.reveal = !this.reveal;
        }
    }
}
</script>

<style src="../Forms.css" scoped>

</style>