import LoginView from './components/views/auth/Login.vue'
import RegisterView from './components/views/auth/Register.vue'
import RegisterDoneView from './components/views/auth/RegisterDone.vue'
import EmailConfirmationView from './components/views/auth/EmailConfirmation.vue'
import EmailConfirmationDoneView from './components/views/auth/EmailConfirmationDone.vue'
import ForgotPasswordView from './components/views/auth/ForgotPassword.vue'
import ForgotPasswordDoneView from './components/views/auth/ForgotPasswordDone.vue'
import ResetPasswordView from './components/views/auth/ResetPassword.vue'
import DashView from './components/Dash.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import UsersView from './components/views/user/Users.vue'
import UserEditView from './components/views/user/Edit.vue'
import UserAddView from './components/views/user/Add.vue'
import ProfileView from './components/views/Profile.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/registerdone',
    component: RegisterDoneView
  },
  {
    path: '/emailconfirmation/:token',
    component: EmailConfirmationView
  },
  {
    path: '/emailconfirmationdone',
    component: EmailConfirmationDoneView
  },
  {
    path: '/forgotpassword',
    component: ForgotPasswordView
  },
  {
    path: '/forgotpassworddone',
    component: ForgotPasswordDoneView
  },
  {
    path: '/resetpassword/:token',
    component: ResetPasswordView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        alias: '',
        path: 'dashboard',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment', requiresAuth: true}
      },
      {
        path: 'users',
        component: UsersView,
        name: 'Users',
        meta: {description: 'User management', requiresAuth: true}
      }, {
        path: 'useradd',
        component: UserAddView,
        name: 'UserAdd',
        meta: {description: 'Add new user', requiresAuth: true}
      }, {
        path: 'useredit',
        component: UserEditView,
        name: 'UserEdit',
        meta: {description: 'Edit user', requiresAuth: true}
      }, {
        path: 'profile',
        component: ProfileView,
        name: 'Profile',
        meta: {description: 'Profile', requiresAuth: true}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
