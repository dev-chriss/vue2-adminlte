<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="validateBeforeSubmit" >
              <div class="box box-info" style="border:1px solid #d2d6de;">
                <div class="box-header" style="background-color:#f5f5f5;border-top:1px;height:40px;border-bottom:1px  solid #d2d6de;">
                </div>
                <div class="box-body" style="padding:30px;">
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

                        <div class="form-group"  :class="{'has-error': errors.has('status') }">
                          <label class="control-label" for="status" >Status</label>
                          <div class="control" :class="{'has-error': errors.has('status') }">
                              <div class="select">
                                <select name="status" v-model="status" class="form-control" v-validate="'required'" >
                                  <option disabled value="">Nothing selected</option>
                                  <option v-for="option in options.status" v-bind:value="option.value">
                                    {{ option.text }}
                                  </option>
                                </select>
                              </div>
                          </div>
                          <p class="text-danger" v-if="errors.has('status')">{{ errors.first('status') }}</p>
                      </div>

                      <div class="form-group"  :class="{'has-error': errors.has('role') }">
                          <label class="control-label" for="role" >Role</label>
                          <div class="control" :class="{'has-error': errors.has('role') }">
                              <div class="select">
                                <select name="role" v-model="role" class="form-control" v-validate="'required'" >
                                  <option disabled value="">Nothing selected</option>
                                  <option v-for="option in options.roles" v-bind:value="option.value">
                                    {{ option.text }}
                                  </option>
                                </select>
                              </div>
                          </div>
                          <p class="text-danger" v-if="errors.has('role')">{{ errors.first('role') }}</p>
                      </div>

                      <div class="form-group" >
                          <hr />
                      </div>

                      <div class="form-group" :class="{'has-error': errors.has('password') }" >
                          <label class="control-label" for="password">Password</label>
                          <input name="password" v-model="password" v-validate="'required|min:6'" class="form-control" type="password" placeholder="Password">
                          <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>
                      </div>

                      <div class="form-group" :class="{'has-error': errors.has('password_confirmation') }" >
                          <label class="control-label" for="password_confirmation">Confirm password</label>
                          <input name="password_confirmation" v-model="password_confirmation" v-validate="'required|confirmed:password'"
                              class="form-control" type="password" placeholder="Confirm password">
                          <p class="text-danger" v-if="errors.has('password_confirmation')">
                            Password confirmation doesn't match
                          </p>
                      </div>

                </div>
                <div class="box-footer" style="background-color:#f5f5f5;border-top:1px solid #d2d6de;">
                  <button class="btn btn-warning" type="button" style="width:100px;" @click="cancel()">Cancel</button>
                  <button type="submit" class="btn btn-info" style="width:100px;">Create</button>
                </div>
              </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import api from '../../../api'

export default {
  name: 'UserAdd',
  data () {
      return {
        email: '',
        name: '',
        status: '',
        role: '',
        password: '',
        password_confirmation: '',
        options: {
            roles: [
              //{ value: 'superadmin', text: "Superadmin"},
              { value: 'admin', text: "Administrator"},
              { value: 'user', text: "User"},
            ],
            status: [
              //{ value: 'superadmin', text: "Superadmin"},
              { value: 'active', text: "Active"},
              { value: 'inactive', text: "Inactive"},
              { value: 'verified', text: "Email verified"},
              { value: 'unverified', text: "Email unverified"},
            ]
        }
      }
  },
  mounted () {
    this.$nextTick(() => {
        if (this.$store.state.user.role === "superadmin") {
            this.options.roles.push({ value: 'superadmin', text: "Superadmin" })
        }
    })
  },
  methods: {
    validateBeforeSubmit(e) {
        this.$validator.validateAll();
        this.$nextTick(() => {
            if (!this.errors.any()) {
                this.save()
            }
        });
    },
    cancel () {
        this.$router.push('/users')
    },
    save () {
      var data = {
          name: this.name,
          email: this.email,
          role: this.role,
          status: this.status,
          password: this.password,
          password_confirmation: this.password_confirmation,
      }

      api.request('post', 'user', data)
        .then(response => {
            this.$toastr('success', 'Create new user succesed!', 'Success')
            this.$router.push('/users')
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
