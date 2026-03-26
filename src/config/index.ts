import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    cloudinary:{
        api_secret:process.env.CLOUDINARY_API_SECRET,
        cloude_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY
    },
    jwt_token_secret:process.env.JWT_TOKEN__SECRET,
    jwt_token__refresh_secret:process.env.JWT_TOKEN__SECRET_REFRESH,

    jwt_token_exprireIn:process.env.JWT_TOKEN__EXPIRES_IN,
    jwt_token_refresh_expireIn:process.env.JWT_TOKEN__REFRESH_EXPIRES_IN,

}