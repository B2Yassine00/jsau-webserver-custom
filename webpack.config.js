const path = require('path');

module.exports = {
  entry: './app.js', // Assurez-vous que l'entrée est correcte

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  resolve: {
    fallback: {
      path: false,
      zlib: false,
      crypto: false,
      stream: false,
      querystring: false,
    },
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // Pas de babel-loader ici si vous ne l'utilisez pas
        use: 'file-loader', // ou un autre loader en fonction de vos besoins
      },
    ],
  },
};
