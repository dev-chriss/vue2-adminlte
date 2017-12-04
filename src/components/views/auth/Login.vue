<template >
    <div >
          <div class="login-box" >
              <!-- <img src="/static/img/logo.png" class="center-block logo"> -->
              <div class="login-logo" >
                <b>Vue</b> <i>AdminLTE</i>
              </div>
              <!-- /.login-logo -->
              <div class="login-box-body" >
                  <p class="login-box-msg"><font size="5" >Please Login </font></p>

                  <!-- errors -->
                  <div v-if=response class="text-red text-center"><p>{{response}}</p></div>

                  <form @submit.prevent="validateBeforeSubmit">
                      <div class="form-group has-feedback">
                        <input type="email" class="form-control" name="email" v-model="email" v-validate="'required|email'"  placeholder="Email">
                        <span class="fa fa-envelope form-control-feedback"></span>
                        <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                      </div>
                      <div class="form-group has-feedback">
                        <input type="password" class="form-control" name="password" v-model="password" v-validate="'required|min:6'"  placeholder="Password">
                        <span class="fa fa-lock form-control-feedback"></span>
                        <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>
                      </div>
                      <div class="row">
                        <div class="col-xs-8 text-left" style="margin-top:7px;">
                          <router-link  :to="{path: 'forgotpassword'}">Forgot your password ? </router-link>
                        </div>
                        <!-- /.col -->
                        <div class="col-xs-4">
                          <button type="submit"  v-bind:class="'btn btn-primary btn-block btn-flat ' + loading">Login</button>
                        </div>
                        <!-- /.col -->
                      </div>
                  </form>

                  <div class="text-center">
                      <hr/>
                      <router-link  :to="{path: 'register'}"> Click here to register</router-link>
                  </div>

              </div>
              <!-- /.login-box-body -->
        </div>
        <!-- /.login-box -->

    </div>
</template>

<script>
import api from '../../../api'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      email: '',
      password: '',
      response: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
        this.errors.clear()
    })
  },
  methods: {
    validateBeforeSubmit(e) {
        this.$validator.validateAll();
        this.$nextTick(() => {
            if (!this.errors.any()) {
                this.login()
            }
        });
    },
    login () {
      //const {email, password} = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      var credential = {
          email : this.email,
          password : this.password
      }

      /* Login */
      api.request('post', 'auth/login', credential)
      .then(response => {
        this.toggleLoading()

        var data = response.data
        /* Setting user in the state and caching record to the localStorage */
        if (data.user) {
          var token = 'Bearer ' + data.token

          this.$store.commit('SET_USER', data.user)
          this.$store.commit('SET_TOKEN', token)

          if (window.localStorage) {
              window.localStorage.setItem('user', JSON.stringify(data.user))
              window.localStorage.setItem('token', token)
          }

          this.$router.push(data.redirect ? data.redirect : '/')
          //this.$router.push('/')
        }
      })
      .catch(error => {
        this.$store.commit('TOGGLE_LOADING')

        if (error.response) {
            var error = error.response.data.error
            //this.$toastr('error', error.message, error.status_code)
            this.response = error.message
            this.toggleLoading()
            return
        }

        this.response = error.message
        this.toggleLoading()
      })
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }
}
</script>
<style>
html, body {
    height: 100%;
    //background-color: #3f3f3f !important;
    background-color: #333 !important;
}

.login-logo {
    color: #e4e4e4 !important;
}

.login-box-body, .register-box-body {
    border-radius: 5px;
}

.vertical-10p {
  padding-top: 10%;
}
</style>
