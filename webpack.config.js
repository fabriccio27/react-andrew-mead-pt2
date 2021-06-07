/* 
para que wp funcione le tengo que dar entry point , donde arranca la app
y output para archivo bundle
 */
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//si estoy corriendo jest, process.env.NODE_ENV saca su valor por el flag de cross-env=test, si no, es development.
//en heroku, NODE_ENV se setea a production automaticamente, por lo que tengo que planear para eso
//usando heroku config:set puedo setear variables de entorno de heroku --> heroku config:set API_KEY=2312384835
process.env.NODE_ENV = process.env.NODE_ENV || "development"

if (process.env.NODE_ENV === "test"){
    require("dotenv").config({path:".env.test"});
}else if(process.env.NODE_ENV == "development"){
    require("dotenv").config({path:".env.development"});
}

module.exports = (env, argv) =>{
    
    const isProduction = argv.mode==="production";

    return {
        mode:"development",
        entry: './src/app.js',
        output:{
            // path es absoluto, por eso uso __dirname
            path:path.join(__dirname,"public","dist"),
            filename:'bundle.js'
        },
        module:{
            rules:[{
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['@babel/preset-env', '@babel/preset-react'] // con esto no me hace falta el archivo .babelrc
                    }
                },
                test:/\.js$/, // lo que tenga.js al final
                exclude: /node_modules/
            },{
                test:/\.s?css$/i, // lo que tenga .scss o .css al final
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader:'css-loader', options:{sourceMap:true, url:false}},
                    {loader:'sass-loader', options:{sourceMap:true}}
                ],
                //["style-loader","css-loader","sass-loader"],
                //estos 3 hacen que interprete scss como css y que el scss/css que hice, lo interprete como un style tag en head
            }]
        },
        plugins:[
            new MiniCssExtractPlugin({ 
                filename: 'styles.css'
            }),
            new webpack.DefinePlugin({
                "process.env.FIREBASE_API_KEY":JSON.stringify(process.env.FIREBASE_API_KEY),
                "process.env.FIREBASE_AUTH_DOMAIN":JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                "process.env.FIREBASE_DATABASE_URL":JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                "process.env.FIREBASE_PROJECT_ID":JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                "process.env.FIREBASE_STORAGE_BUCKET":JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                "process.env.FIREBASE_MESSAGING_SENDER_ID":JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                "process.env.FIREBASE_API_ID":JSON.stringify(process.env.FIREBASE_API_ID),
                "process.env.FIREBASE_MEASUREMENT_ID":JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
            })
        ],
        devtool: isProduction?'source-map':'inline-source-map',
        devServer:{
            contentBase: path.join(__dirname,"public"),
            historyApiFallback:true,
            publicPath:"/dist/"
        }
        //devServer corre virtualmente, desde memoria, tengo que cambiar porque trata de busca los recursos virtuales en root de folder
        //y ahora estaria accediendo desde dist. publicPath indica donde estan los archivos del bundle, por default es root respecto contentBase
        //si veo dist, antes de armar el build de produccion, veo que esta vacio, porque con devServer corre desde memoria
    };
}

