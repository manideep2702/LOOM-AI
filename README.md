<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1qEvHz5F8VRfHgTuD26_yaLMMy2r9xEyp

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy [.env.example](.env.example) to `.env` (or `.env.local`) and set `VITE_GEMINI_API_KEY` to your Gemini API key.
3. Run the app:
   `npm run dev`

### Deploying to Vercel

When creating the Vercel project, set the build command to `npm run build`, the output directory to `dist`, and add the `VITE_GEMINI_API_KEY` environment variable in the project settings so the browser bundle receives the key.
