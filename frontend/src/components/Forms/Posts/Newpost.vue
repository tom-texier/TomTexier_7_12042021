<template>
    <form @submit="publish">
        <div class="input-gif">
            <input v-model="query" type="text" placeholder="Rechercher un gif..." @click="inputFocused" @keyup="searchGif">
            <div v-if="reveal" class="datalist">
                <div class="results" v-if="results && results.length != 0">
                    <img :src="gif.images.original.url" class="image-card" v-for="gif in results" :key="gif.id" @click="selectGif">
                </div>
                <div class="empty" v-if="results.length == 0 || !results">
                    Aucun résultat
                </div>
            </div>
        </div>
        <label for="alternative">Ou insérer une image</label>
        <input type="file" id="alternative" @change="onFileChange">
        <img v-if="image" :src="image" alt="Image ou gif choisi" class="selectImage">
        <textarea v-model="description" placeholder="Ajouter une description"></textarea>
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
            image: "",
            description: "",
            file: ""
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
                    limit: 28,
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
            this.removeImage();
            this.file = e.currentTarget.getAttribute('src');
            this.image = e.currentTarget.getAttribute('src');
            this.reveal = false;
            this.query = "";
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var reader = new FileReader();

            reader.onload = (e) => {
                this.image = e.target.result;
            };
            reader.readAsDataURL(file);

            this.file = file;
        },
        removeImage: function () {
            this.image = '';
            this.file = '';
        },
        publish(e) {
            e.preventDefault();
        }
    }
}
</script>

<style src="../Forms.css" scoped>

</style>