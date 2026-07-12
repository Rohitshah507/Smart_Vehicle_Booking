import { generateEmailTemplate } from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";

const generateVerificationCode = () => {
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const remainingDigit = Math.floor(Math.random() * 1000);

  return `${firstDigit}${remainingDigit}`;
};

const sendVerificationCode = async (email, verificationCode) => {
  try {
    const template = generateEmailTemplate(verificationCode);
    await sendEmail(email, {
      subject: "Your Verification Code",
      message: template,
    });
  } catch (error) {
    console.log(`Email failed to sent code to this ${email}`, error.message);
  }
};

const generateResetCode = () => {
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const remainingDigit = Math.floor(Math.random() * 1000);

  return `${firstDigit}${remainingDigit}`;
};

const sendResetCode = async (email, verificationCode) => {
  try {
    const template = generateEmailTemplate(verificationCode);
    await sendEmail(email, {
      subject: "Your Reset Code",
      message: template,
    });
  } catch (error) {
    console.log(`Email failed to sent code to this ${email}`, error.message);
  }
};

export {
  generateVerificationCode,
  sendVerificationCode,
  generateResetCode,
  sendResetCode,
};
