const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =
  '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';

const api = new SibApiV3Sdk.AccountApi();

// (async () => {
//   try {
//     const account = await api.getAccount();
//     console.log(account, 'account');
//   } catch (e) {
//     console.error(error);
//   }
// })();

const sendSmtpEmail = async message => {
  const apiInstance = new SibApiV3Sdk.SMTPApi();
  const sendSmtp = new SibApiV3Sdk.SendSmtpEmail(message);

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtp);
  } catch (e) {
    console.error(e);
  }
};

const testEmail =
  '{"sender":{"name":"shannon","email":"shannon@shannonjohnstone.com.au"},"to":[{"email":"shannon@shannonjohnstone.com.au","name":"Shannon"},{}],"htmlContent":"","textContent":"This is a test","subject":"Testing emailer service","replyTo":{"email":"test@shannonjohnstone.com.au","name":"Shannon Test"}}';
sendSmtpEmail(testEmail);
