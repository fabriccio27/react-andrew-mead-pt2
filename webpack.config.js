/* esto es un archivo de node, pero se parece bastante a js
para que wp funcione le tengo que dar entry point , donde arranca la app
y output para archivo bundle
 */
const path = require("path");

module.exports = {
    mode:"development",
    entry: './src/app.js',
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
                    //plugins:['@babel/plugin-proposal-class-properties']
                }
            },
            test:/\.js$/, // lo que tenga.js al final
            exclude: /node_modules/
        },{
            test:/\.s?css$/i,
            use: ["style-loader","css-loader","sass-loader"],
            //estos 3 hacen que interprete scss como css y que el scss/css que hice, lo interprete como un style tag en head
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer:{
        contentBase: path.join(__dirname,"public")
    }
};

// ESTO PARA QUE ES?
/* es para que no tenga que poner un monton de scripts tags en html 
entre otras cosas, solo voy a necesitar uno para el js, para que use el
bundle generado*/

//hacer npm run build me da este output, si me tira un hash, se generó el bundle
/* Hash: 4dc311afcdcbccbd4e6b
Version: webpack 3.1.0
Time: 63ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.64 kB       0  [emitted]  main
   [0] ./src/app.js 168 bytes {0} [built] */

// para decirle a webpack que use Babel, tengo que hacer un loader, algo que le diga como comportarse
// tengo que instalar dos cosas, babel-core, parecido a babel-cli,y babel-loader
/* el loader lo hago a traves de property module de este archivo, y para decirle que use presets, uso
en prop loader, prop options y prop presets */

