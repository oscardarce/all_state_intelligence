module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f5f1eb",
        panel: "#fffdf9",
        ink: "#1f2a3d",
        muted: "#6d7b91",
        teal: "#0f9488",
        coral: "#df6a3c",
      },
      boxShadow: {
        workspace: "0 14px 34px rgba(35, 42, 53, 0.08)",
      },
    },
  },
  plugins: [],
};
