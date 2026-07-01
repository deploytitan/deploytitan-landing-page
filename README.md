# DeployTitan Landing Page

## Waitlist Form

The waitlist UI posts to the internal API route at `/api/waitlist`.
Configure the upstream provider with the server-side env var:

```bash
WAITLIST_WEBHOOK_URL=https://formspree.io/f/mojokkwl
```

`NEXT_PUBLIC_FORM_ENDPOINT` is still supported as a temporary fallback for the
legacy Google Apps Script setup, but new deployments should use
`WAITLIST_WEBHOOK_URL`.

### Formspree setup

Formspree's `llms.txt` recommends creating forms with a claim URL, then pasting
the generated `/f/...` endpoint into your app config.

Claim URL for the current waitlist fields:

```text
https://formspree.io/claim?name=DeployTitan+Waitlist&project=deploytitan-website&field.name=text,required,maxlength:100,prettyName:Full+Name&field.email=email,required,prettyName:Work+Email&field.company=text,maxlength:160,prettyName:Company&field.role=text,maxlength:120,prettyName:Role&field.team_size=text,prettyName:Team+Size&field.pain_level=text,prettyName:Current+Pain+Level&field.budget_range=text,prettyName:Expected+Budget&field.current_process=text,maxlength:2000,prettyName:What+is+painful+today&field.notes=text,maxlength:2000,prettyName:Anything+else+we+should+know&action.email=hello@deploytitan.com
```

Setup flow:

1. Open the claim URL above.
2. Sign in to Formspree and confirm the form creation.
3. Copy the generated endpoint URL, which looks like `https://formspree.io/f/...`.
4. Set that value as `WAITLIST_WEBHOOK_URL` in local env and Vercel env.
5. Submit the `/waitlist` form once and confirm the submission appears in Formspree.

## Notes

- The frontend does not need to change when the provider changes.
- If you add or rename fields later, update the claim URL in this README only if
  you want Formspree's dashboard schema to stay aligned with the UI.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
