const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });
/*  - LINKEDIN_CLIENT_ID=86cx0bed8l7njf
            - LINKEDIN_CLIENT_SECRET=WPL_AP1.mekwerKhBp6MQxkj.XfAm3A==
            - INSTAGRAM_CLIENT_ID=681118174588237
            - INSTAGRAM_CLIENT_SECRET=eb75a363dddb56b5ea7a09361f06a2c4
            - FACEBOOK_CLIENT_ID=1098589167896870
            - FACEBOOK_CLIENT_SECRET=32fd7f9d0a3df29562d30c417d786551
            - GOOGLE_CLIENT_ID=556969250426-vuhjo8l8gj0hqloe123md02nm17nb7f2.apps.googleusercontent.com
            - GOOGLE_CLIENT_SECRET=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 */
const envValidation = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('development', 'production', 'test', 'stage').required(),
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().default('localhost'),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        LINKEDIN_CLIENT_ID: Joi.string().required(),
        LINKEDIN_CLIENT_SECRET: Joi.string().required(),
        INSTAGRAM_CLIENT_ID: Joi.string().required(),
        INSTAGRAM_CLIENT_SECRET: Joi.string().required(),
        FACEBOOK_CLIENT_ID: Joi.string().required(),
        FACEBOOK_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        
        
    })
    .unknown();

const { value: envVar, error } = envValidation
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    nodeEnv: envVar.NODE_ENV,
    port: envVar.PORT,
    dbHost: envVar.DB_HOST,
    dbUser: envVar.DB_USER,
    dbPass: envVar.DB_PASS,
    dbName: envVar.DB_NAME,
    dbPort: envVar.DB_PORT,
    jwt: {
        secret: envVar.JWT_SECRET,
    },
    socialIntegrations: {
        facebook: {
            client_id: envVar.FACEBOOK_CLIENT_ID,
            client_secret: envVar.FACEBOOK_CLIENT_SECRET
        },
         instagram: {
            client_id: envVar.INSTAGRAM_CLIENT_ID,
            client_secret: envVar.INSTAGRAM_CLIENT_SECRET
        },
          google: {
            client_id: envVar.GOOGLE_CLIENT_ID,
            client_secret: envVar.GOOGLE_CLIENT_SECRET
        },
           linkedin: {
            client_id: envVar.LINKEDIN_CLIENT_ID,
            client_secret: envVar.LINKEDIN_CLIENT_SECRET
        }
    }
    
};
