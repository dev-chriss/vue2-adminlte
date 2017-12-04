<template>
  <section class="content" >

    <div class="row" >
      <div class="col-md-12">
        <div class="box" style="border:1px solid #d2d6de;">
          <!-- /.box-header -->
          <div class="box-header" style="background-color:#f5f5f5;border-bottom:1px solid #d2d6de;height:55px;">
               <div class="form-group">
                  <div class="select col-md-3">
                        <select name="filter" v-model="idfilter" class="form-control"  >
                        <option v-for="option in options.filter" v-bind:value="option.value">
                            {{ option.text }}
                        </option>
                        </select>
                  </div>

                  <button class="btn btn-info col-md-2" type="button" style="width:100px;" @click="filter()">Show</button>

                   <div class="text-right" >
                        <button class="btn btn-info" type="button" title="Add new user" style="width:100px;" @click="add()">
                            <i class="fa fa-plus" style="vertical-align:middle"></i>&nbsp Add New
                        </button>
                  </div>
              </div>
          </div>

          <div class="box-body table-responsive " style="padding:20px 0px;">
              <div class="col-sm-12 dataTables_wrapper dt-bootstrap">
                          <table id="tblUser" class="table table-bordered table-hover table-striped  ">
                              <thead >
                                <tr role="row" >
                                  <th aria-sort="ascending" class="sorting_asc">Email</th>
                                  <th class="sorting">Name</th>
                                  <th class="sorting">Role</th>
                                  <th class="sorting">Status</th>
                                  <th class="no-sort" style="min-width:80px;width:80px;"></th>
                                </tr>
                              </thead>
                              <tbody>
                              <tr v-for="(user, index) in users" :key="user.id">
                                  <td>{{user.email}}</td>
                                  <td>{{user.name}}</td>
                                  <td style="min-width:140px;width:140px;text-align:left;">{{(user.rolename == null) ? '[not set]' : user.rolename }}</td>
                                  <td style="min-width:140px;width:140px;text-align:left;">{{user.status | capitalize }}</td>
                                  <td style="min-width:80px;width:80px;text-align:right;" >
                                    <button class="btn btn-warning btn-xs" v-if="user.status=='verified' && user.role == 'user'"
                                        style="margin-right:3px;" title="Activate user" @click="activateUser(user, index)"><i class="fa fa-envelope-o"></i></button>
                                    <button class="btn btn-info btn-xs" style="margin-right:3px;" title="Edit" @click="editUser(user)"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger btn-xs" title="Delete" @click="deleteUser(user, index)"><i class="fa fa-trash"></i></button>
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot></tfoot>
                          </table>
              </div>

          </div> <!-- /.box-body -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'
import api from '../../../api'

export default {
  name: 'Users',
  data () {
    return {
      users: [],
      idfilter: 0,
      options: {
              filter: [
                //{ value: 'superadmin', text: "Superadmin"},
                { value: 0, text: "User role"},
                { value: 1, text: "Verified user"},
                { value: 2, text: "Unverified user"},
                { value: 3, text: "Inactive user"},
                { value: 4, text: "All"},
              ]
          }
    }
  },
  methods: {
      add() {
          var data = {
            idfilter: this.idfilter
          }
          this.$storageManager.setTableState(data)

          this.$router.push('/useradd')
      },
      filter() {
          var data = {
            idfilter: this.idfilter
          }
          this.$storageManager.setTableState(data)
          //this.$nextTick(() => {
                this.getUsers()
          //})
      },
      getUsers () {
          //console.log("tablestate = " + this.$storageManager.getTableState())
          if (!this.$storageManager.getTableState() || this.$storageManager.getTableState() === "undefined") {
              this.idfilter = 0
          }
          else {
              this.idfilter = this.$storageManager.getTableState().idfilter
          }

          // console.log('idfilter='+ this.idfilter);

          $('#tblUser').DataTable().destroy()
          api.request('get', 'user/'+this.idfilter)
                .then(response => {
                    //console.log('data='+ JSON.stringify(response.data));
                    if (response.data.user === "undefined")
                        this.users = []
                    else this.users = response.data.user
                })
                .catch(error => {
                    if (error.response.data) {
                        //console.log('error.response.data='+ JSON.stringify(error.response.data));
                        var error = error.response.data
                        this.$toastr('error', error.message, error.status_code)
                        return
                    }
                    this.$toastr('error', error.message, 'Error')
                })
                .then(()=>{
                    //$('#tblUser').DataTable().destroy()
                    if ( ! $.fn.DataTable.isDataTable( '#tblUser' ) ) {
                        $("#tblUser").DataTable({
                            //stateSave: true,
                            columnDefs: [
                                { targets: 'no-sort', orderable: false }
                            ]
                        });
                    }
                });
      },
      editUser (user) {
        this.$storageManager.setSelectedUser(user)

        var data = {
          idfilter: this.idfilter
        }
        this.$storageManager.setTableState(data)

        this.$router.push('/useredit')
      },
      deleteUser (user, index) {
          this.$dialog.confirm("Are you sure want to delete ?", {
              loader: true // shows a loader when clicked.
          })
          .then((dialog) => {
              var data = {
                idfilter: this.idfilter
              }
              this.$storageManager.setTableState(data)

              api.request('delete', 'user/' + user.id)
                  .then(response => {
                      this.getUsers()
                      this.$toastr('success', ' User succesfully deleted!', 'Success')
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
              dialog.close() // stops the loader and close the dialog
          })
          .catch(() => { // Triggered when cancel button is clicked
          })
      },
      activateUser (user, index) {
          this.$dialog.confirm("Are you sure want to activate this user ?", {
              loader: true // shows a loader when clicked.
          })
          .then((dialog) => {
              api.request('put', 'auth/activate/' + user.id)
                  .then(response => {
                      //console.log(JSON.stringify(this.users, null, 4))
                      //console.log(JSON.stringify(response.data))
                      this.getUsers()
                      this.$toastr('success', 'User succesfully activated', 'Success')
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
              dialog.close() // stops the loader and close the dialog
          })
          .catch(() => { // Triggered when cancel button is clicked
          })
      }
  },
  mounted () {
    this.$nextTick(() => {
        this.getUsers()
    })
  }
}
</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/
@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
@import url("//netdna.bootstrapcdn.com/bootstrap/3.0.0-rc2/css/bootstrap-glyphicons.css");

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>
