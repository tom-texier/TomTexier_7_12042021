<template>
    <form @submit="update">
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
        <input ref="file" type="file" id="alternative" @change="onFileChange">
        <img v-if="image" :src="image" alt="Image ou gif choisi" class="selectImage">
        <textarea v-model="description" placeholder="Ajouter une description"></textarea>
        <button>Modifier</button>
    </form>
</template>

<script>
import axios from 'axios';
import { updatePost } from '../../../mixins/post';

export default {
    name: "FormEditpost",
    data() {
        return {
            reveal: false,
            results: false,
            query: "",
            apiKey: "05pHQKk692kM4shQ4Bh7Ta7n4CuhgW2j",
            apiUrl: "https://api.giphy.com/v1/gifs/search",
            image: "",
            description: "",
            file: "",
            gif: ""
        }
    },
    props: [
        'post'
    ],
    mounted() {
        this.description = this.br2nl(this.post.description),
        this.image = this.post.image,
        this.gif = this.post.image
    },
    methods: {
        br2nl(str) {
            var replaceStr = "";
            // Includes <br>, <BR>, <br />, </br>
            return str.replace(/<\/?br ?\/?>/gi, replaceStr);
        },
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
            this.file = "";
            this.image = e.currentTarget.getAttribute('src');
            this.gif = e.currentTarget.getAttribute('src');
            this.reveal = false;
            this.query = "";
        },
        onFileChange() {
            this.gif = "";
            this.file = this.$refs.file.files[0];

            var reader = new FileReader();

            reader.onload = (e) => {
                this.image = e.target.result;
            };
            reader.readAsDataURL(this.file);
        },
        update(e) {
            e.preventDefault();

            let post;

            console.log();

            if(this.gif != "") {
                post = {
                    description: this.description,
                    image: this.gif
                }
            }
            else if(this.file != "") {
                post = new FormData();
                post.append('image', this.file);
                post.append('description', this.description);
            }
            else {
                console.log("Erreur : la publication ne peut être vide !");
            }

            updatePost(post, this.post.ID)
                .then(post => {
                    this.updatePostHTML(post);
                })
                .catch(err => console.log(err));
        },
        updatePostHTML(post) {
            this.$emit('updatePostHTML', post);
        }
    }
}
</script>

<style src="../Forms.css" scoped>

</style>