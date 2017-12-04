<template>
  <div :class="['wrapper', classes]" >
    <header class="main-header">
        <a href="/" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini" style="text-align:center;"><b>V</b><i>E</i></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>Vue</b> <i>AdminLTE</i></span>
        </a>
        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

              <!-- User Account Menu -->
              <li class="dropdown user user-menu" >
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <!-- The user image in the navbar -->
                  <i class="fa fa-user"></i>
                  <!-- hidden-xs hides the username on small devices so only the image appears. -->
                  <span class="hidden-xs">{{ demo.displayName }}</span>
                </a>
                <ul class="dropdown-menu" style="border-bottom:0px;">
                  <!-- The user image in the menu -->
                  <li class="user-header">
                    <p>
                        {{ demo.email }}
                        <small>Level : {{ demo.role | capitalize}}</small>
                    </p>
                  </li>

                  <!-- Menu Body -->
                  <li class="user-body" >
                    <div class="row">
                      <div class="col-xs-6 text-center">
                        <!-- <a href="#" class="btn btn-success btn-flat" style="width:100px">Profile</a> -->
                        <button class="btn btn-success btn-flat"  style="width:100px" @click="profile()">Profile</button>
                      </div>
                      <div class="col-xs-6 text-center">
                        <button class="btn btn-warning btn-flat"  style="width:100px" @click="logout()">Sign Out</button>
                      </div>
                    </div>
                  </li>

                </ul>

              </li>
            </ul>
          </div>
        </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar :display-name="demo.displayName" :picture-url="demo.avatar" />

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{ $route.meta.description }}
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="javascript:;">
              <i class="fa fa-home"></i>Home</a>
          </li>
          <li class="active">{{$route.name}}</li>
        </ol>
      </section>

      <router-view ></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}}
        <a href="#">{{ appname }}</a>.</strong> All rights reserved.
    </footer>

  </div>
  <!-- ./wrapper -->
</template>

<script>
import faker from 'faker'
import { mapState } from 'vuex'
import config from '../config'
import Sidebar from './Sidebar'
import 'hideseek'
import api from '../api'

export default {
  name: 'Dash',
  components: {
    Sidebar
  },
  data: function () {
    return {
      appname: config.appname,
      year: new Date().getFullYear(),
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      },
      error: ''
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    demo () {
      return {
        displayName: this.$store.state.user.name,
        email: this.$store.state.user.email,
        role: this.$store.state.user.role,
      }
    }
  },
  methods: {
    changeloading () {
      this.$store.commit('TOGGLE_SEARCHING')
    },
    profile () {
      this.$router.push('/profile')
    },
    logout () {
        var toaster = this.$toastr

        this.$dialog.confirm("Are you sure want to exit ?", {
            loader: true // shows a loader when clicked.
        })
        .then((dialog) => {
            api.request('delete', 'auth/logout')
                .then(response => {
                })
                .catch(e => {
                    this.$toastr('error', e.message, 'Error')
                })
            dialog.close() // stops the loader and close the dialog
            localStorage.setItem('user', null)
            localStorage.setItem('token', null)
            localStorage.setItem('selecteduser', null)
            localStorage.setItem('tablestate', null)
            this.$store.commit('SET_USER', null)
            this.$store.commit('SET_TOKEN', null)
            this.$router.push('/login')

        })
        .catch(() => { // Triggered when cancel button is clicked
        });

    }
  },
  mounted () {
    this.$nextTick(() => {
        if ($.AdminLTE.layout) $.AdminLTE.layout.fix()
    })
  }
}

</script>

<style lang="scss">

body {
  height:auto !important;
}

.wrapper.fixed_layout {
  .main-header {
    position: fixed;
    width: 100%;
  }
  .content-wrapper {
    padding-top: 50px;
  }

  .main-sidebar {
    position: fixed;
    height: 100vh;
  }
}

.content-header {
  margin-bottom:10px;
}

.wrapper.hide_logo {
  @media (max-width: 767px) {
    .main-header .logo {
      display: none;
    }
  }
}

.logo-mini,
.logo-lg {
  text-align: left;

  img {
    padding: .4em !important;
  }
}

.logo-lg {
  img {
    display: -webkit-inline-box;
    width: 25%;
  }
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}

.navbar-nav>.user-menu>.dropdown-menu>li.user-header {
  height: 80px;
}

.navbar-nav>.user-menu>.dropdown-menu>li.user-body {
  border: 1px solid #d2d6de;
  background-color: #f9f9f9;
}

.navbar-nav>.user-menu>.dropdown-menu>li.user-footer {
  background-color: #3c8dbc;
}

a:hover {
  text-decoration: none;
}
</style>
