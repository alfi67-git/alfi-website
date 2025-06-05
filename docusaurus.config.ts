import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { Options } from '@dipakparmar/docusaurus-plugin-umami';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Le lab d\'Alfi',
  tagline: 'Toutes mes bidouilles au même endroit',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://alfi67-git.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'alfi67-git', // Usually your GitHub org/user name.
  projectName: 'alfi-website', // Usually your repo name.
  deploymentBranch: 'deployment',
  trailingSlash: true, 

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/alfi67-git/alfi-website/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/alfi67-git/alfi-website/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Lab d\'Alfi',
      logo: {
        alt: 'Tux',
        src: 'img/linux.png',
      },

      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},

        {
          href: 'https://github.com/alfi67-git',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/alexandre-fidalgo/',
          label: 'LinkedIn',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      /* links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ], */
      copyright: `Copyright © ${new Date().getFullYear()} Lab d\'Alfi, Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

/* 
ANALYSE UMAMI
*/
export default {
  plugins: [
    [
      "@dipakparmar/docusaurus-plugin-umami",
      {
        websiteID: "ab9a5196-cb7a-45e2-bb49-1531b197361d", // Required
        analyticsDomain: "analytics.afidalgo.fr", // Required
        scriptName: "script.js", // Optional, defaults to script.js
        dataHostURL: "", // Optional
        dataAutoTrack: true, // Optional, defaults to true
        dataDoNotTrack: false, // Optional, defaults to false
        dataCache: false, // Optional, defaults to false
        dataDomains: "", // Optional, comma separated list of domains, *Recommended*
        dataExcludeSearch: false, // Optional, defaults to false
        dataExcludeHash: false, // Optional, defaults to false
        dataTag: "", // Optional
      } as Options,
    ],
  ],
};


/* shadesOfPurple */
/* export default config; */