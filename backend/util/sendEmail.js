// // backend/util/sendEmail.js
// import sgMail from '@sendgrid/mail';
// import dotenv from 'dotenv';

// dotenv.config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// /**
//  * Send an email using SendGrid.
//  * @param {Object} param0
//  * @param {string} param0.to - Recipient email address
//  * @param {string} param0.subject - Email subject
//  * @param {string} param0.text - Plain text version of the email content
//  * @param {string} param0.html - HTML version of the email content
//  */
// export const sendEmail = async ({ to, subject, text, html }) => {
//   const msg = {
//     to,
//     from: 'mazikaaateam@gmail.com', // Your verified sender email
//     subject,
//     text,
//     html,
//   };

//   try {
//     await sgMail.send(msg);
//     console.log('Email sent successfully to:', to);
//     return { success: true };
//   } catch (error) {
//     console.error('Error sending email:', error.response?.body || error.message);
//     return { success: false, error: error.response?.body || error.message };
//   }
// };



// //dh s7
// import sgMail from '@sendgrid/mail';
// import dotenv from 'dotenv';
// import fetch from 'node-fetch';

// dotenv.config();

// const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
// const SINGLE_SEND_ID = process.env.SENDGRID_SINGLE_SEND_ID;
// const CONTACT_LIST_ID = process.env.SENDGRID_CONTACT_LIST_ID; // Optional

// if (!SENDGRID_API_KEY || !SINGLE_SEND_ID) {
//   console.error('Missing required SendGrid environment variables (SENDGRID_API_KEY or SENDGRID_SINGLE_SEND_ID).');
//   process.exit(1);
// }

// sgMail.setApiKey(SENDGRID_API_KEY);

// /**
//  * Send a basic transactional email using SendGrid.
//  * @param {Object} param0
//  * @param {string} param0.to - Recipient email address
//  * @param {string} param0.subject - Email subject
//  * @param {string} param0.text - Plain text version of the email content
//  * @param {string} param0.html - HTML version of the email content
//  * @param {string} [param0.from] - Optional sender email override (defaults to verified sender)
//  */
// export const sendEmail = async ({ to, subject, text, html, from = 'mazikaaateam@gmail.com' }) => {
//   const msg = { to, from, subject, text, html };

//   try {
//     await sgMail.send(msg);
//     console.log(`Email sent successfully to ${to}`);
//     return { success: true };
//   } catch (error) {
//     // More detailed error info
//     const errorBody = error.response?.body || error.message || error.toString();
//     console.error('Error sending email:', errorBody);
//     return { success: false, error: errorBody };
//   }
// };

// /**
//  * Add a user to SendGrid Marketing Contacts
//  * Optionally attach to a contact list (if CONTACT_LIST_ID is provided).
//  * @param {string} email - Email address to add
//  */
// export const addUserToContacts = async (email) => {
//   try {
//     const res = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
//       method: 'PUT',
//       headers: {
//         Authorization: `Bearer ${SENDGRID_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         list_ids: CONTACT_LIST_ID ? [CONTACT_LIST_ID] : [],
//         contacts: [{ email }],
//       }),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(`Add to contacts failed with status ${res.status}: ${JSON.stringify(data)}`);
//     }

//     console.log(`Successfully added ${email} to contacts`);
//     return { success: true };
//   } catch (error) {
//     console.error('Error adding contact:', error.message);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Trigger a predefined Single Send campaign
//  */
// export const triggerSingleSend = async () => {
//   try {
//     const res = await fetch(
//       `https://api.sendgrid.com/v3/marketing/singlesends/${SINGLE_SEND_ID}/schedule`,
//       {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${SENDGRID_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ send_at: 'now' }),
//       }
//     );

//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(`Trigger Single Send failed with status ${res.status}: ${JSON.stringify(data)}`);
//     }

//     console.log('Single Send campaign triggered successfully');
//     return { success: true };
//   } catch (error) {
//     console.error('Error triggering Single Send:', error.message);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Utility to check if all required SendGrid env variables are set.
//  * Returns an object with success boolean and missing keys if any.
//  */
// export const validateSendGridConfig = () => {
//   const missing = [];
//   if (!SENDGRID_API_KEY) missing.push('SENDGRID_API_KEY');
//   if (!SINGLE_SEND_ID) missing.push('SENDGRID_SINGLE_SEND_ID');
//   // CONTACT_LIST_ID is optional

//   if (missing.length > 0) {
//     return { success: false, missing };
//   }
//   return { success: true };
// };




import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SINGLE_SEND_ID = process.env.SENDGRID_SINGLE_SEND_ID;
const CONTACT_LIST_ID = process.env.SENDGRID_CONTACT_LIST_ID;

if (!SENDGRID_API_KEY || !SINGLE_SEND_ID) {
  console.error('Missing required SendGrid environment variables (SENDGRID_API_KEY or SENDGRID_SINGLE_SEND_ID).');
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, text, html, from = 'mazikaaateam@gmail.com' }) => {
  const msg = { to, from, subject, text, html };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    const errorBody = error.response?.body || error.message || error.toString();
    console.error('❌ Error sending email:', errorBody);
    return { success: false, error: errorBody };
  }
};

export const addUserToContacts = async (email) => {
  try {
    const res = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list_ids: CONTACT_LIST_ID ? [CONTACT_LIST_ID] : [],
        contacts: [{ email }],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Add to contacts failed: ${JSON.stringify(data)}`);
    }

    console.log(`✅ Added ${email} to SendGrid contacts`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error adding contact:', error.message);
    return { success: false, error: error.message };
  }
};

export const triggerSingleSend = async () => {
  try {
    const res = await fetch(
      `https://api.sendgrid.com/v3/marketing/singlesends/${SINGLE_SEND_ID}/schedule`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ send_at: 'now' }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Trigger Single Send failed: ${JSON.stringify(data)}`);
    }

    console.log('✅ Single Send campaign triggered');
    return { success: true };
  } catch (error) {
    console.error('❌ Error triggering Single Send:', error.message);
    return { success: false, error: error.message };
  }
};

export const validateSendGridConfig = () => {
  const missing = [];
  if (!SENDGRID_API_KEY) missing.push('SENDGRID_API_KEY');
  if (!SINGLE_SEND_ID) missing.push('SENDGRID_SINGLE_SEND_ID');
  if (missing.length > 0) {
    return { success: false, missing };
  }
  return { success: true };
};
