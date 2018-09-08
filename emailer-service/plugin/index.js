const sendMail = require('../emailer');

const createMessage = opts => {
  const { to, subject, text, html, cc } = opts;
  const message = {
    to: to,
    subject: subject,
    text: text,
    html: html,
    cc: cc && cc.length ? cc : null,
  };
  return message;
};

const emailPlugin = function(options) {
  const seneca = this;

  /**
   * Sends an email using template email
   */
  seneca.add({ area: 'email', action: 'send', template: '*' }, function(
    args,
    done,
  ) {
    // TODO: add code
  });

  /**
   * Sends an email including the content
   */
  seneca.add({ area: 'email', action: 'send' }, async function(args, done) {
    try {
      sendMail(createMessage(args));
    } catch (e) {
      console.error(e, 'send email error');
    }
  });

  seneca.add({ area: 'email', action: 'send', cc: '*' }, async function(
    args,
    done,
  ) {
    try {
      sendMail(createMessage(args));
    } catch (e) {
      console.error(e, 'send email error');
    }
  });

  // seneca.act(
  //   {
  //     area: 'email',
  //     action: 'send',
  //     subject: 'The Subject',
  //     to: 'test@test.com.au',
  //     text: 'Test Text',
  //     html: `<p>test html</p>`,
  //   },
  //   function(err, result) {
  //     // TODO: More code
  //   },
  // );
  //
  // seneca.act(
  //   {
  //     area: 'email',
  //     action: 'send',
  //     subject: 'The Subject',
  //     to: 'test@test.com.au <test@test.com.au>',
  //     text: 'Test Text',
  //     html: `<p>test html</p>`,
  //     cc: ['test2@test2.com.au <test2@test2.com.au>'],
  //   },
  //   function(err, result) {
  //     // TODO: More code
  //   },
  // );
};

module.exports = {
  emailPlugin,
};
