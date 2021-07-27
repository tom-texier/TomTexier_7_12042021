<template>
    <form @submit.prevent="update" class="formEditUser">
        <div class="bg-primary"></div>
        <label class="img" for="selectImage">
            <img v-if="image || newUser.avatar_url" :src="image || newUser.avatar_url" alt="Avatar">
            <img v-else src="../../../assets/default_profile_pic.jpeg" alt="Avatar">
            <div class="indication"><i class="fas fa-pencil-alt"></i></div>
            <input ref="file" type="file" id="selectImage" @change="onFileChange">
        </label>
        <div class="inputs">
            <div class="row">
                <div class="group">
                    <label for="firstname">Prénom</label>
                    <input v-model="newUser.firstname" type="text" id="firstname" @input="validateInput">
                    <i v-if="firstnameValid === true" class="far fa-check-circle"></i>
                    <i v-else-if="firstnameValid === false" class="far fa-check-circle"></i>
                </div>
                <div class="group">
                    <label for="lastname">Nom</label>
                    <input v-model="newUser.lastname" type="text" id="lastname" @input="validateInput">
                    <i v-if="lastnameValid === true" class="far fa-check-circle"></i>
                    <i v-else-if="lastnameValid === false" class="far fa-check-circle"></i>
                </div>
            </div>
            <div class="row">
                <div class="group">
                    <label for="job">Poste au sein de Groupomania</label>
                    <input v-model="newUser.job" type="text" id="job" @input="validateInput">
                    <i v-if="jobValid === true" class="far fa-check-circle"></i>
                    <i v-else-if="jobValid === false" class="far fa-check-circle"></i>
                </div>
            </div>
            <div class="row">
                <div class="group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="newUser.email" @input="validateInput" />
                <i v-if="emailValid === true" class="far fa-check-circle"></i>
                <i v-else-if="emailValid === false" class="far fa-times-circle"></i>
                </div>
            </div>
            <div class="row">
                <div class="group">
                    <label for="password">Nouveau mot de passe</label>
                    <input type="password" id="password" @input="validateInput" v-model="newUser.password">
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

import { updateUser } from '../../../mixins/user';

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
            newUser: {},
            confirmPassword: "",
        }
    },
    props: [
        'currentUser'
    ],
    updated() {
        this.newUser = this.currentUser;
    },
    methods: {
        update() {
            if(this.validateInput()) {
                let user;
                delete this.newUser.avatar_url;

                if(this.newUser.newAvatar && this.newUser.newAvatar != "") {
                    user = new FormData();
                    user.append('firstname', this.newUser.firstname);
                    user.append('lastname', this.newUser.lastname);
                    user.append('job', this.newUser.job);
                    user.append('email', this.newUser.email);
                    user.append('image', this.newUser.newAvatar);

                    if(this.newUser.password && this.newUser.password != "") {
                        user.append('password', this.user.password);
                    }
                }
                else {
                    user = {
                        firstname: this.newUser.firstname,
                        lastname: this.newUser.lastname,
                        job: this.newUser.job,
                        email: this.newUser.email
                    };
                
                    if(this.newUser.password && this.newUser.password != "") {
                        user.password = this.newUser.password;
                    }
                }

                updateUser(user, this.newUser.ID)
                    .then(()=> {
                        document.location.reload();
                    })
            }
        },
        onFileChange() {
            this.newUser.newAvatar = this.$refs.file.files[0];

            var reader = new FileReader();

            reader.onload = (e) => {
                this.image = e.target.result;
            };
            reader.readAsDataURL(this.newUser.newAvatar);
            this.validateInput();
        },
        validEmail() {
            return this.emailRegExp.test(this.newUser.email);
        },
        samePassword() {
            return this.newUser.password === this.confirmPassword;
        },
        validateInput() {
            if(this.newUser.lastname != '') {
                this.lastnameValid = true;
            }
            else {
                this.lastnameValid = "";
            }

            if(this.newUser.firstname != '') {
                this.firstnameValid = true;
            }
            else {
                this.firstnameValid = "";
            }

            if(this.newUser.job != '') {
                this.jobValid = true;
            }
            else {
                this.jobValid = "";
            }

            if(this.newUser.email != "" && this.validEmail()) {
                this.emailValid = true;
            }
            else if(!this.validEmail() && this.newUser.email != "") {
                this.emailValid = false;
            }
            else {
                this.emailValid = "";
            }

            if(this.samePassword() && this.newUser.password != "" && this.confirmPassword != "") {
                this.passwordValid = true;
            }
            else if((this.newUser.password == "" && this.confirmPassword == "") || !this.newUser.password) {
                this.passwordValid = "";
                delete this.newUser.password;
            }
            else {
                this.passwordValid = false;
            }

            if(this.lastnameValid && this.firstnameValid && this.jobValid && this.emailValid && (this.passwordValid || this.passwordValid === "")) {
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