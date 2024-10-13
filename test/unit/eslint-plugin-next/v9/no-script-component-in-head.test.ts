import rule from '@next/eslint-plugin-next/dist/rules/no-script-component-in-head'
import { RuleTester } from 'eslint-v9'
;(RuleTester as any).setDefaultConfig({
  languageOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        modules: true,
        jsx: true,
      },
    },
  },
})
const ruleTester = new RuleTester()

ruleTester.run('eslint-v9 no-script-in-head', rule, {
  valid: [
    `import Script from "next/script";
     const Head = ({children}) => children

    export default function Index() {
      return (
        <Head>
          <Script></Script>
        </Head>
      );
    }
    `,
  ],

  invalid: [
    {
      code: `
      import Head from "next/head";
      import Script from "next/script";

      export default function Index() {
        return (
            <Head>
              <Script></Script>
            </Head>
        );
      }`,
      filename: 'pages/index.js',
      errors: [
        {
          message:
            '`next/script` should not be used in `next/head` component. Move `<Script />` outside of `<Head>` instead. See: https://nextjs.org/docs/messages/no-script-component-in-head',
        },
      ],
    },
  ],
})
