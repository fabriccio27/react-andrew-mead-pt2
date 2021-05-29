/* 
para que wp funcione le tengo que dar entry point , donde arranca la app
y output para archivo bundle
 */
const path = require("path");

module.exports = {
    mode:"development",
    entry: './src/app.js',
    //entry: './src/playground/hoc.js',
    output:{
        // path es absoluto, por eso uso __dirname
        path:path.join(__dirname,"public"),
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
            use: ["style-loader","css-loader","sass-loader"],
            //estos 3 hacen que interprete scss como css y que el scss/css que hice, lo interprete como un style tag en head
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer:{
        contentBase: path.join(__dirname,"public"),
        historyApiFallback:true
    }
};


// para decirle a webpack que use Babel, tengo que hacer un loader, algo que le diga como comportarse
// tengo que instalar dos cosas, babel-core, parecido a babel-cli,y babel-loader
/* el loader lo hago a traves de property module de este archivo, y para decirle que use presets, uso
en prop loader, prop options y prop presets */

