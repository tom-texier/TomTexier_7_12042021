<template>
    <form @submit.prevent="updateShare" class="share">
        <textarea style="min-height: 50px" v-model="comment" placeholder="Ajouter un commentaire"></textarea>
        <div class="post">
            <Avatar
                :avatar_url="post.avatar_url"
                :firstname="post.firstname"
                :lastname="post.lastname"
            ></Avatar>
            <div class="img">
                <img :src="image" alt="Image du post">
            </div>
            <p class="description" v-html="description"></p>
        </div>
        <button>Modifier</button>
    </form>
</template>

<script>
import { updateSharedPost } from '../../../mixins/post';

import Avatar from '../../Avatar/Avatar'

export default {
    name: "FormSharepost",
    data() {
        return {
            image: "",
            description: "",
            comment: ""
        }
    },
    components: {
        Avatar
    },
    props: [
        'post',
        'user'
    ],
    mounted() {
        this.description = this.post.description;
        this.image = this.post.image;
        this.comment = this.br2nl(this.post.comment);
    },
    methods: {
        br2nl(str) {
            var replaceStr = "";
            // Includes <br>, <BR>, <br />, </br>
            return str.replace(/<\/?br ?\/?>/gi, replaceStr);
        },
        updateShare() {
            let post;
            post = {
                comment: this.comment
            }
        
            updateSharedPost(post, this.post.ID)
                .then((data) => {
                    this.$emit('updatePostSharedHTML');
                    document.getElementById(`post-${data.post.id}`).querySelector('.commentaire').innerHTML = data.post.comment;
                })
                .catch(err => console.log(err));
        }
    }
}
</script>

<style src="../Forms.css" scoped></style>