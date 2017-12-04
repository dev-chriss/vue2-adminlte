<template>
    <div class="container vertical-10p">
        <div class="col-md-12 " style="color:#666666;padding:30px 50px 50px 50px; background:#fff">
          <h3>Thanks for filling out our form!</h3>
          <br/>

          <p>Please check the confirmation link at your email </p>
         
          <p>
              Note: If you do not receive the email in few minutes:

              <ul>
                  <li>check spam folder</li>
                  <li>verify if you typed your email correctly</li>
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
  name: 'RegisterDone',
  data () {
    return {
      appname: config.appname,
      companyemail: config.companyemail,
      section: 'RegisterDone',
    }
  }
}
</script>

<style>

</style>
