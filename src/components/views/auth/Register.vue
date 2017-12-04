<template >
    <div >
          <div class="login-box" >
              <div class="login-logo" >
                  <b>Vue</b> <i>AdminLTE</i>
              </div>
              <!-- /.login-logo -->
              <div class="login-box-body" >
                  <p class="login-box-msg"><font size="5">Register Form</font></p>

                  <!-- errors -->
                  <div v-if=response class="text-red text-center"><p>{{response}}</p></div>

                  <form @submit.prevent="validateBeforeSubmit">
                      <div class="form-group has-feedback">
                        <input type="email" class="form-control" name="email" v-model="email" v-validate="'required|email'"  placeholder="Email">
                        <span class="fa fa-envelope form-control-feedback"></span>
                        <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                      </div>

                      <div class="form-group has-feedback">
                        <input type="name" class="form-control" name="name" v-model="name" v-validate="'required|min:3'"  placeholder="Fullname">
                        <span class="fa fa-user form-control-feedback"></span>
                        <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                      </div>

                      <div class="form-group has-feedback">
                        <input type="password" class="form-control" name="password" v-model="password" v-validate="'required|min:6'"  placeholder="Password">
                        <span class="fa fa-lock form-control-feedback"></span>
                        <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>
                      </div>

                      <div class="form-group has-feedback">
                        <input type="password" class="form-control" name="password_confirmation" v-model="password_confirmation" v-validate="'required|min:6'"  placeholder="Confirm Password">
                        <span class="fa fa-unlock-alt form-control-feedback"></span>
                        <p class="text-danger" v-if="errors.has('password_confirmation')">Password confirmation doesn't match</p>
                      </div>


                      <div class="row">
                        <div class="col-xs-8 text-left" style="margin-top:7px;">
                          <router-link  :to="{path: 'forgotpassword'}">Forgot your password ? </router-link>
                        </div>
                        <!-- /.col -->
                        <div class="col-xs-4">
                          <button type="submit"  v-bind:class="'btn btn-primary btn-block btn-flat ' + loading">Register</button>
                        </div>
                        <!-- /.col -->
                      </div>
                  </form>

                  <div class="text-center">
                      <hr/>
                      <router-link  :to="{path: 'login'}"> Click here to login</router-link>
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
  name: 'Register',
  data (router) {
    return {
      section: 'Register',
      loading: '',
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
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
      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      var credential = {
          email : this.email,
          name : this.name,
          password : this.password,
          password_confirmation : this.password_confirmation
      }

      /* Register */
      api.request('post', 'auth/register', credential)
      .then(response => {
        this.toggleLoading()
        if (response.data.status === 'OK') {
          //this.$toastr('success', 'Thank you for reaching us !', 'Register done!')
          this.$router.push('/registerdone')
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
