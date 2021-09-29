module.exports = {
  presets: [
    ['module:metro-react-native-babel-preset'],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          src: './src'
        }
      }
    ],
    'babel-plugin-transform-typescript-metadata'
  ]
}
