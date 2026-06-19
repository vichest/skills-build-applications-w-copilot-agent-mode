import app from './server';

const PORT = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`OctoFit Tracker API running at ${baseUrl}`);
});
