const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = {
    entry: {
        app: './app.js'
    },
    module: {
        rules: [
          {
            test: /\.pug$/,
            use: [
              "raw-loader",
              "pug-html-loader"
            ]
          }
        ],
        noParse: function (content) {
            return /express/.test(content);
        }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'views/index.pug',
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        template: 'views/proyectos.pug',
        filename: 'proyectos.html'
      }),
      new HtmlWebpackPlugin({
        template: 'views/voluntarios.pug',
        filename: 'voluntarios.html'
      }),
      new HtmlWebpackPlugin({
        template: 'views/contacto.pug',
        filename: 'contacto.html'
      })
      new HtmlWebpackPlugin({
        template: 'views/ajax.pug',
        filename: 'ajax.html'
      })
      new HtmlWebpackPlugin({
        template: 'views/proyecto.pug',
        filename: 'proyecto.html'
      })
      new HtmlWebpackPlugin({
        template: 'views/faqs.pug',
        filename: 'faqs.html'
      })
      new HtmlWebpackPlugin({
        template: 'views/quienes_somos.pug',
        filename: 'quienes_somos.html'
      })
    ],
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};