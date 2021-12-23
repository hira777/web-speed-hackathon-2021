module.exports = (api) => {
  const isDevelopment = api.env('development');

  return {
    presets: [
      [
        '@babel/preset-react',
        {
          development: isDevelopment,
        },
      ],
    ],
  };
};
