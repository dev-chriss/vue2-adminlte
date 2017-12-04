<template>
   <div >
          <div class="login-box" >
              <div class="login-logo" >
                  <b>Vue</b> <i>AdminLTE</i>
              </div>
              <!-- /.login-logo -->
              <div class="login-box-body" >
                  <p class="login-box-msg"><font size="5">Please input your email</font></p>

                  <!-- errors -->
                  <div v-if=response class="text-red text-center"><p>{{response}}</p></div>

                  <form @submit.prevent="validateBeforeSubmit">
                      <div class="form-group has-feedback">
                        <input type="email" class="form-control" name="email" v-model="email" v-validate="'required|email'"  placeholder="Email">
                        <span class="fa fa-envelope form-control-feedback"></span>
                        <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                      </div>
                      <div class="row">
                        <div class="col-xs-6 text-left" style="margin-top:7px;">
                          <router-link  :to="{path: 'login'}">Back to login </router-link>
                        </div>
                        <!-- /.col -->
                        <div class="col-xs-6">
                          <button type="submit"  v-bind:class="'btn btn-primary btn-block btn-flat ' + loading">Send reset link</button>
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
  name: 'ForgotPassword',
  data (router) {
    return {
      section: 'ForgotPassword',
      loading: '',
      email: '',
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
      //const {email} = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      var credential = {
          email : this.email
      }

      /* Login */
      api.request('post', 'auth/sendresetemail', credential)
      .then(response => {
        this.toggleLoading()

        var data = response.data

        /* Setting user in the state and caching record to the localStorage */
        if (data.status === "OK") {
          this.$router.push('/forgotpassworddone')
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
</style>
