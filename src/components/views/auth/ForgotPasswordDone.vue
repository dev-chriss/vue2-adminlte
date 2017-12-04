<template>
    <div class="container vertical-10p">
        <div class="col-md-12 " style="color:#666666;padding:30px 50px 50px 50px; background:#fff">
          <h3>Email sent!</h3>
          <br/>
          <p>
            We've emailed you instructions for setting your password.
            You should receive them shortly.
          </p>
            
          <p>
              Note: If you do not receive the email in few minutes: 

              <ul>
                  <li>check spam folder</li>
                  <li>lease make sure you've entered the email you registered with</li>
                  <li>if you need our support, please contact us at <a href="mailto:'companyemail'">{{ companyemail }}</a></li>
              </ul>
          </p>
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
  name: 'ForgotPasswordDone',
  data () {
    return {
      appname: config.appname,
      companyemail: config.companyemail,
      section: 'ForgotPasswordDone',
    }
  }
}
</script>

<style>

</style>
