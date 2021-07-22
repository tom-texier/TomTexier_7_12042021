<template>
    <div v-if="reveal" class="modal-box" @click="closeModal">
        <div class="modal-content">
            <header class="title">
                <h2>{{ title }}</h2>
                <i class="fas fa-times" @click="closeModal"></i>
            </header>
            <main></main>
            <footer></footer>
        </div>
    </div>
</template>

<script>
import FormNewpost from '../Forms/Posts/Newpost'
import FormEditpost from '../Forms/Posts/Editpost'
import Avatar from '../Avatar/Avatar'

export default {
    name: "Modal",
    components: {
        'form-newpost': FormNewpost,
        'form-editpost': FormEditpost,
        Avatar
    },
    props: [
        'reveal',
        'title',
        'action',
        'user',
        'post'
    ],
    methods: {
        closeModal(event) {
            this.$emit('closeModal', event);
        }
    }
}
</script>

<style scoped src="./Modal.css"></style>