/* 
para que wp funcione le tengo que dar entry point , donde arranca la app
y output para archivo bundle
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) =>{
    
    const isProduction = argv.mode==="production";

    return {
        mode:"development",
        entry: './src/app.js',
        //entry: './src/playground/hoc.js',
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
                    {loader:'css-loader', options:{sourceMap:true}},
                    {loader:'sass-loader', options:{sourceMap:true}}
                ],
                //["style-loader","css-loader","sass-loader"],
                //estos 3 hacen que interprete scss como css y que el scss/css que hice, lo interprete como un style tag en head
            }]
        },
        plugins:[
            new MiniCssExtractPlugin({ 
                filename: 'styles.css'
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

