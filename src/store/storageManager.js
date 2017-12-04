export default function (Vue) {
  Vue.storageManager = {
    setToken (token, expiration) {
      localStorage.setItem('token', token)
      localStorage.setItem('expiration', expiration)
    },

    setUserAuth (user) {
      localStorage.setItem('user', user)
    },
    
    setSelectedUser (user) {
      localStorage.setItem('selecteduser', JSON.stringify(user))
    },

    setTableState (data) {
      localStorage.setItem('tablestate', JSON.stringify(data))
    },

    getToken () {
      var token = localStorage.getItem('token')
      var expiration = localStorage.getItem('expiration')

      if (!token || !expiration) {
        return null
      }
      if (Date.now() > Date.parse(expiration)) {
        this.logout()
        return null
      }
      return token
    },

    getSelectedUser () {
      var user = localStorage.getItem('selecteduser')
      
      if (!user) {
        return null
      }
      else return JSON.parse(user)
    },

    getTableState () {
      var data = localStorage.getItem('tablestate')
      
      if (!data) {
        return null
      }
      else return JSON.parse(data)
    },

    getUserAuth () {
      var user = localStorage.getItem('user')

      if (!user) {
        return null
      }
      else return JSON.parse(user)
    },

    getUserAuthId () {
      var user = localStorage.getItem('user')
      if (!user) {
        return null
      }
      else {
        user = JSON.parse(user)
        user = user.id
      }

      return user
    },

    getUserAuthName () {
      var user = localStorage.getItem('user')
      if (!user) {
        return null
      }
      else {
        user = JSON.parse(user)
        user = user.name
      }

      return user
    },

    getUserAuthRole () {
      var user = localStorage.getItem('user')
      if (!user) {
        return ''
      }
      else {
        user = JSON.parse(user)
        user = user.role
      }

      return user
    },

    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('expiration')
      localStorage.removeItem('user')
      localStorage.removeItem('selecteduser')
      localStorage.removeItem('tablestate')
    },

    isAuthenticated () {
      if (this.getToken()) {
        return true
      }
      else {
        return false
      }
    }
  }

  Object.defineProperties(Vue.prototype, {
    $storageManager: {
      get () {
        return Vue.storageManager
      }
    }
  })
}
