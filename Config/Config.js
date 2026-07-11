import dotenv from "dotenv"

dotenv.config();

const config = {
    port:process.env.PORT,
    mongodb_url:process.env.MONGODB_URL,
    smtp_email:process.env.SMTP_EMAIL,
    smtp_password:process.env.SMTP_PASSWORD,
    jwt_secret:process.env.JWT_SECRET,
}

export default config;