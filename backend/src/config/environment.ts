import dotenv from 'dotenv'
dotenv.config();

export default {
    PRIVATE_KEY : process.env.PRIVATE_KEY,
    HOST : process.env.HOST,
    USER : process.env.USER,
    PASSWORD : process.env.PASSWORD,
    DATABASE : process.env.DATABASE
};