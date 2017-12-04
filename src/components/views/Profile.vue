<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="validateBeforeSubmit" >
              <div class="box box-info" style="border:1px solid #d2d6de;">
                <div class="box-header" style="background-color:#f5f5f5;border-top:1px;height:40px;border-bottom:1px  solid #d2d6de;">
                </div>
                <div class="box-body" style="padding:20px;">
                      <div class="form-group" :class="{'has-error': errors.has('email') }" >
                          <label class="control-label" for="email">Email</label>
                          <input name="email" v-model="email" v-validate="'required|email'" class="form-control" type="email" placeholder="Email">
                          <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                      </div>

                      <div class="form-group" :class="{'has-error': errors.has('name') }">
                          <label class="control-label" for="name">Name</label>
                          <input name="name" v-model="name" v-validate="'required|alpha_spaces|min:3'" class="form-control" type="text" placeholder="Full Name">
                          <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                      </div>

                      <div class="form-group" >
                          <hr />
                          <label class="control-label text-danger" >Leave this empty if doesn't want to change the password</label>
                      </div>

                      <div class="form-group" :class="{'has-error': errors.has('password') }" >
                          <label class="control-label" for="password">Password</label>
                          <input name="password" v-model="password" v-validate="'min:6'" class="form-control" type="password" placeholder="Password">
                          <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>
                      </div>

                      <div class="form-group" :class="{'has-error': errors.has('password_confirmation') }" >
                          <label class="control-label" for="password_confirmation">Confirm password</label>
                          <input name="password_confirmation" v-model="password_confirmation" v-validate="'confirmed:password'"
                              class="form-control" type="password" placeholder="Confirm password">
                          <p class="text-danger" v-if="errors.has('password_confirmation')">
                            Password confirmation doesn't match
                          </p>
                      </div>

                </div>
                <div class="box-footer" style="background-color:#f5f5f5;border-top:1px solid #d2d6de;">
                  <button type="submit" class="btn btn-info" style="width:100px;">Update</button>
                </div>
              </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import api from '../../api'

export default {
  name: 'Profile',
  data () {
      return {
          id: '',
          email: '',
          name: '',
          password: '',
          role: '',
          password_confirmation: '',
      }
  },
  mounted () {
    this.$nextTick(() => {
        this.getProfile()
    })
  },
  methods: {
    getProfile () {
      api.request('get', 'profile/' + this.$store.state.user.id)
            .then(response => {
                this.id= response.data.user.id
                this.email= response.data.user.email
                this.name= response.data.user.name
                this.role= response.data.user.role
            })
            .catch(error => {
                if (error.response) {
                    var error = error.response.data.error
                    this.$toastr('error', error.message, error.status_code)
                    return
                }
                this.$toastr('error', error.message, 'Error')
            })
            .then(()=>{

          });
    },
    clearInput () {
        this.password = ''
        this.password_confirmation = ''
    },
    validateBeforeSubmit(e) {
        this.$validator.validateAll();
        this.$nextTick(() => {
            if (!this.errors.any()) {
                this.save()
            }
        });
    },
    save () {
      var data = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
      }

      api.request('put', 'profile/'+this.id, data)
        .then(response => {
            this.$toastr('success', 'Profile updated!', 'Success')
            this.clearInput()
        })
        .catch(error => {
            if (error.response) {
                var error = error.response.data.error
                this.$toastr('error', error.message, error.status_code)
                return
            }
            this.$toastr('error', error.message, 'Error')
        })
    }
  }
}
</script>

<style>

</style>
