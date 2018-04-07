<template>
  <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">Movieing Astronaut</div>
        <div class="navbar-burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div><!-- navbar-brand END -->
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-end">
          <a class="navbar-item" v-on:click.prevent="loginWithGoogle">Sign up / Sign in with Google</a>
          <nuxt-link to="/contact" class="navbar-item">お問い合わせ</nuxt-link>
          <a class="navbar-item" v-on:click.prevent="logout">Logout</a>
          {{user}}
        </div>
      </div><!-- navbar-menu END -->
    </div>
  </nav>
</template>

<script>
import Firebase from '~/plugins/firebase.js';
import auth from '~/plugins/auth';
const provider = new Firebase.auth.GoogleAuthProvider();

export default {
  data() {
    return {
      user: null
    }
  },
  async mounted () {
    if (process.browser) {
      let user;
      if (!this.user) user = await auth();
      console.log(user);
      this.user = user;
    }
  },
  beforeCreate() {
    const self = this;
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        self.login = 'login!';
      }
    });
  },
  methods: {
    loginWithGoogle() {
      Firebase.auth().signInWithRedirect(provider);
    },
    logout() {
      Firebase.auth().signOut().then(function(result) {
      });
    }
  }
}

if (process.browser) {
  Firebase.auth().getRedirectResult().then(function(result) {
    console.log(result.credential);
  });
}
</script>