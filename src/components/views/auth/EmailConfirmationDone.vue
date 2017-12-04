<template>
    <div class="container vertical-10p">
        <div class="col-md-12 " style="color:#666666;padding:30px 50px 40px 50px; background:#fff">
          <h3>Thank you for registering!</h3>
          <br/>

          <p>We have received your email confirmation and would like to thank you for registering to us. </p>
          <p>Please kindly wait for email notification that your account already activated</p>
          
          <br />
          if you need our support, please contact us at <a href="mailto:'companyemail'">{{ companyemail }}</a>
          <br />
          <br />
          <p>Regards,<br />
          {{ appname }}
          </p>
        </div>
    </div>
</template>

<script>
import config from '../../../config'
export default {
  name: 'EmailConfirmationDone',
  data () {
    return {
      appname: config.appname,
      companyemail: config.companyemail,
      section: 'EmailConfirmationDone',
    }
  }
}
</script>

<style>

</style>
