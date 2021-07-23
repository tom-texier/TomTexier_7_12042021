<template>
    <form @submit.prevent="update" class="formEditUser">
        <div class="bg-primary"></div>
        <label class="img" for="selectImage">
            <img v-if="image" :src="image" alt="Avatar">
            <img v-else src="../../../assets/default_profile_pic.jpeg" alt="Avatar">
            <div class="indication"><i class="fas fa-pencil-alt"></i></div>
            <input ref="file" type="file" id="selectImage" @change="onFileChange">
        </label>
        <div class="inputs">
            <div class="row">
                <div class="group">
                    <label for="firstname">Prénom</label>
                    <input v-model="user.firstname" type="text" id="firstname" @input="validateInput">
                    <i v-if="firstnameValid === true" class="far fa-check-circle"></i>
                    <i v-else-if="firstnameValid === false" class="far fa-check-circle"></i>
                </div>
                <div class="group">
                    <label for="lastname">Nom</label>
                    <input v-model="user.lastname" type="text" id="lastname" @input="validateInput">
                    <i v-if="lastnameValid === true" class="far fa-check-circle"></i>
                    <i v-else-if="lastnameValid === false" class="far fa-check-circle"></i>
                </div>
            </div>
            <div class="row">
                <div class="group">
                    <label for="job">Poste au sein de Groupomania</label>
                    <input v-model="user.job" type="text" id="job" @input="validateInput">
                    <i v-if="jobValid === true" class="far fa-check-circle"></i>
                    <i v-else-if="jobValid === false" class="far fa-check-circle"></i>
                </div>
            </div>
            <div class="row">
                <div class="group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="user.email" @input="validateInput" />
                <i v-if="emailValid === true" class="far fa-check-circle"></i>
                <i v-else-if="emailValid === false" class="far fa-times-circle"></i>
                </div>
            </div>
            <div class="row">
                <div class="group">
                    <label for="password">Nouveau mot de passe</label>
                    <input type="password" id="password" @input="validateInput" v-model="user.password">
                    <i v-if="passwordValid === true" class="far fa-check-circle"></i>
                    <i v-else-if="passwordValid === false" class="far fa-times-circle"></i>
                </div>
                <div class="group">
                    <label for="confirm-password">Confirmation du mot de passe</label>
                    <input type="password" id="confirm-password" @input="validateInput" v-model="confirmPassword">
                    <i v-if="passwordValid === true" class="far fa-check-circle"></i>
                    <i v-else-if="passwordValid === false" class="far fa-times-circle"></i>
                </div>
            </div>
            <div class="row">
                <div class="group">
                    <button :disabled="disabledButton">Enregistrer les modifications</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>

export default {
    name: "FormEditUser",
    data() {
        return {
            image: "",
            lastnameValid: "",
            firstnameValid: "",
            jobValid: "",
            emailValid: "",
            passwordValid: "",
            emailRegExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            disabledButton: true,
            user: {},
            confirmPassword: "",
        }
    },
    props: [
        'currentUser'
    ],
    updated() {
        console.log(this.user);
        this.user = this.currentUser;
    },
    methods: {
        update() {
            if(this.validateInput()) {
                console.log("UPDATE");
            }
        },
        onFileChange() {
            this.user.newAvatar = this.$refs.file.files[0];

            var reader = new FileReader();

            reader.onload = (e) => {
                this.image = e.target.result;
            };
            reader.readAsDataURL(this.user.newAvatar);
        },
        validEmail() {
            return this.emailRegExp.test(this.user.email);
        },
        samePassword() {
            return this.user.password === this.confirmPassword;
        },
        validateInput() {
            console.log(this.user);
            if(this.user.lastname != '') {
                this.lastnameValid = true;
            }
            else {
                this.lastnameValid = "";
            }

            if(this.user.firstname != '') {
                this.firstnameValid = true;
            }
            else {
                this.firstnameValid = "";
            }

            if(this.user.job != '') {
                this.jobValid = true;
            }
            else {
                this.jobValid = "";
            }

            if(this.user.email != "" && this.validEmail()) {
                this.emailValid = true;
            }
            else if(!this.validEmail() && this.user.email != "") {
                this.emailValid = false;
            }
            else {
                this.emailValid = "";
            }

            if(this.samePassword() && this.user.password != "" && this.confirmPassword != "") {
                this.passwordValid = true;
            }
            else if(this.user.password == "" && this.confirmPassword == "") {
                this.passwordValid = "";
            }
            else {
                this.passwordValid = false;
            }

            if(this.lastnameValid && this.firstnameValid && this.jobValid && this.emailValid && this.passwordValid) {
                this.disabledButton = false;
                return true;
            }
            else {
                this.disabledButton = true;
                return false;
            }
        },
    }
}
</script>

<style scoped src="./Edituser.css"></style>