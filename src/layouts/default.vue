<template>
  <div>
    <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <h1 class="title is-3 navbar-item">
            <nuxt-link to="/">絶滅危惧種伝統</nuxt-link>
          </h1>
          <div class="navbar-burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div><!-- navbar-brand END -->
        <div class="navbar-menu" id="navMenu">
          <div class="navbar-end">
            <a v-if="isLogin == false" class="navbar-item" v-on:click.prevent="loginWithGoogle">Sign up / Sign in with Google</a>
            <a v-if="isLogin" class="navbar-item" v-on:click.prevent="logout">Logout</a>
          </div>
        </div><!-- navbar-menu END -->
      </div>
    </nav>
    <nuxt id="wrap"/>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
import auth from '~/plugins/auth';
const provider = new firebase.auth.GoogleAuthProvider();

// Use firestore
import 'firebase/firestore';
const firestore  = firebase.firestore();
const publicUserRef = firestore.collection("public-users");
const userRef = firestore.collection("users");

export default {
  data() {
    return {
      user: null,
      isLogin: false
    }
  },
  async mounted () {
    if (process.browser) {
      let user;
      if (!this.user) user = await auth();
      this.user = user;
    }
  },
  beforeCreate() {
    const self = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Login成功');
        self.$store.commit('changeLoginStatus',{
          status: true
        });
        self.isLogin = self.$store.getters.getLoginStatus;
      }
    });
  },
  methods: {
    loginWithGoogle() {
      firebase.auth().signInWithRedirect(provider);
    },
    logout() {
      const self = this;
      firebase.auth().signOut().then(function(result) {
        self.$store.commit('changeLoginStatus',{
          status: false
        });
        self.isLogin = self.$store.getters.getLoginStatus;
      });
    }
  }
}

if (process.browser) {
  firebase.auth().getRedirectResult().then(function(result) {
    // SignUp or Login
    if (result.credential) {
      const userData = result.user;
      const userId = userData.uid;
      const newUserData = {
        displayName: userData.displayName,
        email      : userData.email,
        modified   : getUnixTime()
      };
      const publicUserData = {
        displayName: userData.displayName,
        modified   : getUnixTime()
      }
      userRef.doc(userId).set(newUserData).then(function(result) {
        publicUserRef.doc(userId).set(publicUserData).then(function(result) {
        }).catch(function(error) {
          console.log(error);
        });
      }).catch(function(error) {
        console.log(error);
      });
    }
  });
}
const getUnixTime = () => {
  const date = new Date();
  return Math.floor(date.getTime() / 1000);
};
</script>


<style>
h1 {
  font-family: 'Dosis', sans-serif !important;
}

.navbar-brand h1 {
  margin-bottom: 0 !important;
}

h1 a {
  color: #0a0a0a;
}

#wrap {
  margin-top: 64px;
}
</style>
