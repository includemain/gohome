module.exports = {
  extends: require.resolve('@umijs/max/stylelint'),
  plugins: ["stylelint-less"],
  customSyntax: "postcss-less"
};
