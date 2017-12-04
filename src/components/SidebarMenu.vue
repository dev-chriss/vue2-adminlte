<template>
  <ul class="sidebar-menu">
    <li class="header">Main Navigation</li>

    <router-link tag="li" class="pageLink" to="/" >
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>

    <!-- only admin can see this menu -->
    <router-link v-if="user.role != 'user'" tag="li" class="pageLink" to="/users">
      <a>
        <i class="fa fa-users"></i>
        <span class="page">Users</span>
      </a>
    </router-link>

    <!--
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span>Files</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="#">
            <i class="fa fa-file-word-o"></i> Item 1
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture-o"></i> Item 2
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-pdf-o"></i> Item 3
          </a>
        </li>
      </ul>
    </li>
    -->
  </ul>
</template>
<script>
export default {
  name: 'SidebarName',
  computed: {
    user () {
      return {
        id: this.$store.state.user.id,
        role: this.$store.state.user.role,
      }
    }
  },
}
</script>
<style>
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
