<template>
    <form>
        <div class="input-gif">
            <input v-model="query" type="text" placeholder="Rechercher un gif..." @click="inputFocused" @keyup="searchGif">
            <div v-if="reveal" class="datalist">
                <div class="results" v-if="results && results.length != 0">
                    <img :src="gif.images.fixed_width_small.url" class="image-card" v-for="gif in results" :key="gif.id" @click="selectGif">
                </div>
                <div class="empty" v-if="results.length == 0 || !results">
                    Aucun résultat
                </div>
            </div>
        </div>
        <p class="alternative">Ou insérer une image</p>
        <textarea placeholder="Ajouter une description"></textarea>
        <button>Publier</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: "FormNewpost",
    data() {
        return {
            reveal: false,
            results: false,
            query: "",
            apiKey: "05pHQKk692kM4shQ4Bh7Ta7n4CuhgW2j",
            apiUrl: "https://api.giphy.com/v1/gifs/search",
            gifSelected: ""
        }
    },
    methods: {
        inputFocused() {
            this.reveal = true;
        },
        searchGif() {
            axios.get(this.apiUrl, {
                params: {
                    api_key: this.apiKey,
                    q: this.query.split(' ').join('+'),
                    limit: 25,
                    lang: 'fr'
                }
            })
            .then(response => {
                this.results = response.data.data;
            })
            .catch(error => {
                console.log("Erreur : ", error);
            })
        },
        selectGif(e) {
            this.gifSelected = e.currentTarget.getAttribute('src');
            this.reveal = false;
            console.log(this.gifSelected);
        }
    }
}
</script>

<style src="../Forms.css" scoped>

</style>