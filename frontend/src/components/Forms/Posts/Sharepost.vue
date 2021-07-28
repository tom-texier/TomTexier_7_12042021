<template>
    <form @submit.prevent="share" class="share">
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
        <button>Partager</button>
    </form>
</template>

<script>
import { sharePost } from '../../../mixins/post';

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
    },
    methods: {
        share() {
            let post;
            post = {
                description: this.description,
                image: this.image,
                comment: this.comment,
                firstname_sharer: this.user.firstname,
                lastname_sharer: this.user.lastname,
                job_sharer: this.user.job,
                avatar_sharer: this.user.avatar_url,
                id_sharer: this.user.ID,
                authorID: this.post.id_user,
            }
        
            sharePost(post)
                .then(() => {
                    window.scrollTo(0,0);
                    document.location.reload();
                })
                .catch(err => console.log(err));
        }
    }
}
</script>

<style src="../Forms.css" scoped></style>