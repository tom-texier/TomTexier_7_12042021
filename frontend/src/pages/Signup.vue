<template>
  <div class="login-container">
    <form id="signup" @submit.prevent="signup">
      <h1>Inscription</h1>
      <p>
        Tu as déjà un compte ?
        <router-link to="/login">Se connecter</router-link>
      </p>
      <div class="row">
        <div class="group">
          <label for="signup-lastname">Nom</label>
          <input type="text" id="signup-lastname" placeholder="Nom*" v-model="lastname" @input="validateInput" />
          <i v-if="lastnameValid === true" class="far fa-check-circle"></i>
        </div>
        <div class="group">
          <label for="signup-firstname">Prénom</label>
          <input type="text" id="signup-firstname" placeholder="Prénom*" v-model="firstname" @input="validateInput" />
          <i v-if="firstnameValid === true" class="far fa-check-circle"></i>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <label for="signup-job">Poste</label>
          <input type="text" id="signup-job" placeholder="Poste*" v-model="job" @input="validateInput" />
          <i v-if="jobValid === true" class="far fa-check-circle"></i>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <label for="signup-email">Email</label>
          <input type="email" id="signup-email" placeholder="Email*" v-model="email" @input="validateInput" />
          <i v-if="emailValid === true" class="far fa-check-circle"></i>
          <i v-else-if="emailValid === false" class="far fa-times-circle"></i>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <label for="signup-password">Mot de passe</label>
          <input type="password" id="signup-password" placeholder="Mot de passe*" v-model="password" @input="validateInput" />
          <i v-if="passwordValid === true" class="far fa-check-circle"></i>
          <i v-else-if="passwordValid === false" class="far fa-times-circle"></i>
        </div>
        <div class="group">
          <label for="signup-confirm-password">Mot de passe</label>
          <input type="password" id="signup-confirm-password" placeholder="Confirmer le mot de passe*" v-model="confirmPassword" @input="validateInput" />
          <i v-if="passwordValid === true" class="far fa-check-circle"></i>
          <i v-else-if="passwordValid === false" class="far fa-times-circle"></i>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <button :disabled="disabledButton">S'inscrire</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import { signupCall } from '../mixins/auth'

export default {
    name: "SignupPage",
    data() {
        return {
            lastname: "",
            firstname: "",
            job: "",
            email: "",
            password: "",
            confirmPassword: "",
            lastnameValid: "",
            firstnameValid: "",
            jobValid: "",
            emailValid: "",
            passwordValid: "",
            emailRegExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            disabledButton: true
        }
    },
    methods: {
        validEmail() {
            return this.emailRegExp.test(this.email);
        },
        samePassword() {
            return this.password === this.confirmPassword;
        },
        validateInput() {
            if(this.lastname != '') {
                this.lastnameValid = true;
            }
            else {
                this.lastnameValid = "";
            }

            if(this.firstname != '') {
                this.firstnameValid = true;
            }
            else {
                this.firstnameValid = "";
            }

            if(this.job != '') {
                this.jobValid = true;
            }
            else {
                this.jobValid = "";
            }

            if(this.email != "" && this.validEmail()) {
                this.emailValid = true;
            }
            else if(!this.validEmail() && this.email != "") {
                this.emailValid = false;
            }
            else {
                this.emailValid = "";
            }

            if(this.samePassword() && this.password != "" && this.confirmPassword != "") {
                this.passwordValid = true;
            }
            else if(this.password == "" && this.confirmPassword == "") {
                this.passwordValid = "";
            }
            else {
                this.passwordValid = false;
            }

            if(this.lastnameValid && this.firstnameValid && this.jobValid && this.emailValid && this.passwordValid) {
                this.disabledButton = false;
            }
            else {
                this.disabledButton = true;
            }
        },
        signup() {
            const user = {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password,
                job: this.job,
            };
            signupCall(user);
        }
    }
};
</script>

<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(#fd2d01, 0.5);

    form {
        background-color: #fff;
        padding: 30px;
        border-radius: 15px;
        min-width: 450px;
        max-width: 99%;

        h1 {
            margin: 0;
            text-align: center;
            font-size: 28px;
            font-weight: 700;
        }

        p {
            margin: 0 0 15px;
            text-align: center;
            font-size: 14px;
        }

        .row {
            display: flex;
            width: 100%;

            &:not(:last-child) {
                margin-bottom: 15px;
            }

            .group {
                display: flex;
                width: 100%;
                position: relative;

                &:not(:last-child) {
                    margin-right: 15px;
                }

                label {
                    display: none;
                }

                input {
                    width: 100%;
                    border: none;
                    outline: none;
                    background-color: #F8F8F8;
                    padding: 10px 25px 10px 10px;
                    border-radius: 5px;
                    font-family: "Poppins";
                }

                i {
                    position: absolute;
                    top: 50%;
                    right: 5px;
                    transform: translateY(-50%);
                    color: green;

                    &.fa-check-circle {
                        color: green;
                    }

                    &.fa-times-circle {
                        color: red;
                    }
                }

                button {
                    width: 100%;
                    border: none;
                    border-radius: 5px;
                    background-color: #FD2D01;
                    color: #fff;
                    padding: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: .3s ease;

                    &:not(:disabled):hover {
                        background-color: darken(#FD2D01, 5);
                    }

                    &:disabled {
                        opacity: .4;
                        cursor: default;
                    }
                }
            }
        }
    }
}
</style>