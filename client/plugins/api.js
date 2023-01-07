import api from '../api'

export default (ctx, inject) => {
  const apiWithclient = api(ctx.$axios)

  inject('api', apiWithclient)
}

// client side this.$api ( mounted )
// server side $api ( asyncData )
