<template>
  <v-container class="justify-center align">
    <v-row justify="center" align="center">
      <v-card
        class="text-center"
        outlined
        elevation="3"
        :width="bp.smAndDown ? '500' : '600'"
      >
        <div align="center">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card
              align="center"
              class="text-center"
              flat
              :width="bp.smAndDown ? '400' : '500'"
            >
              <v-card-text>
                <v-row class="justify-center pt-15">
                  <v-col cols="10">
                    <v-text-field
                      v-model="loginInfo.email"
                      rounded
                      color="secondary"
                      outlined
                      :placeholder="'Email'"
                      hide-details="auto"
                      required
                      prepend-inner-icon="mdi-account-outline"
                      type="email"
                    >
                      <template #prepend-inner>
                        <v-icon class="mr-2"> mdi-account-outline </v-icon>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="10" class="pb-10">
                    <v-text-field
                      v-model="loginInfo.password"
                      outlined
                      rounded
                      color="secondary"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      placeholder="Password"
                      :type="showPassword ? 'text' : 'password'"
                      hide-details="auto"
                      @click:append="showPassword = !showPassword"
                    >
                      <template #prepend-inner>
                        <v-icon class="mr-2"> mdi-lock-outline </v-icon>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="text-center">
                <v-row class="justify-center">
                  <v-col cols="10">
                    <v-btn
                      block
                      depressed
                      large
                      rounded
                      class="secondary mb-10 text-capitalize"
                      :loading="isLoading"
                      @click="userLogin()"
                    >
                      {{ 'login' }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-form>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import logo from 'static/logo.png'

export default {
  props: {
    isDialog: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },
  data: () => ({
    logo,
    isLoading: false,
    valid: true,
    showPassword: false,
    loginInfo: {
      email: '',
      password: ''
    }
  }),

  methods: {
    async userLogin() {
      try {
        this.isLoading = true
        if (this.$refs.form.validate()) {
          const { data } = await this.$auth.loginWith('local', {
            data: this.loginInfo
          })
          if (!data.error) {
            if (this.$auth.user.role === 'customer') {
              this.$toast.error('Unauthorized User')
            } else {
              this.$toast.success('Login Successful~')
              return this.$router.push('/')
            }
          }
        }
      } catch (err) {
        this.$toast.error(err.response?.data?.message || err.message)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
