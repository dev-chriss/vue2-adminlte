<template>
  <div >
          <div class="login-box" >
              <div class="login-logo" >
                  <b>Vue</b> <i>AdminLTE</i>
              </div>
              <!-- /.login-logo -->
              <div class="login-box-body" >
                  <p class="login-box-msg"><font size="5">Email confirmation</font></p>

                  <!-- errors -->
                  <div v-if=response class="text-red text-center"><p>{{response}}</p></div>

                  <form @submit.prevent="validateBeforeSubmit">
                      <div class="row">
                        <!-- /.col -->
                        <div class="col-xs-12">
                            <button type="submit"  v-bind:class="'btn btn-primary btn-block btn-flat ' + loading">Confirm</button>
                        </div>
                        <!-- /.col -->
                      </div>
                  </form>
              </div>
              <!-- /.login-box-body -->
        </div>
        <!-- /.login-box -->

    </div>
</template>

<script>
import api from '../../../api'

export default {
  name: 'EmailConfirmation',
  data (router) {
    return {
      section: 'EmailConfirmation',
      loading: '',
      email: '',
      token: '',
      response: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
        this.token = this.$route.params.token
    })
  },
  methods: {
    validateBeforeSubmit(e) {
        this.$validator.validateAll();
        this.$nextTick(() => {
            if (!this.errors.any()) {
                this.confirmemail()
            }
        });
    },
    confirmemail () {
      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Reset Password */
      api.request('put', 'auth/emailconfirmation/'+this.token)
      .then(response => {
        this.toggleLoading()
        if (response.data.message === 'OK') {
          //this.$toastr('success', 'Your email is already verified', 'Email verification success!')
          this.$router.push('/emailconfirmationdone')
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
