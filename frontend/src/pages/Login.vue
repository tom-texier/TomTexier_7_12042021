<template>
  <div class="login-container">
    <form id="signin" @submit.prevent="login">
      <h1>Connexion</h1>
      <p>
        Tu n'as pas encore de compte ?
        <router-link to="/signup">Créer un compte</router-link>
      </p>
      <p class="error" v-if="error">{{ error }}</p>
      <div class="row">
        <div class="group">
          <label for="signin-email">Email</label>
          <input type="email" id="signin-email" placeholder="Email*" v-model="email" @input="validateInput" />
        </div>
      </div>
      <div class="row">
        <div class="group">
          <label for="signin-password">Mot de passe</label>
          <input type="password" id="signin-password" placeholder="Mot de passe*" v-model="password" @input="validateInput" />
        </div>
      </div>
      <div class="row">
        <div class="group">
          <button :disabled="disabledButton">Se connecter</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { loginCall } from '../mixins/auth'

export default {
    name: "LoginPage",
    data() {
        return {
            email: "",
            password: "",
            emailRegExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            disabledButton: true,
            error: ""
        }
    },
    methods: {
        validEmail() {
            return this.emailRegExp.test(this.email);
        },
        validateInput() {
            if(this.validEmail() && this.password != "") {
                this.disabledButton = false;
            }
            else {
                this.disabledButton = true;
            }
        },
        login() {
            const user = {
                email: this.email,
                password: this.password,
            };
            loginCall(user);
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
                    padding: 10px;
                    border-radius: 5px;
                    font-family: "Poppins";
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