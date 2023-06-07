const metaConfig = require('./gatsby-meta-config')

module.exports = {
  siteMetadata: {
    title: `nueavv.cloud`,
    description: `안녕하세요 ~`,
    author: `nueavv`,
    introduction: `😁 음하화 🗒️ 정리하는 습관 들이기 위한 블로그`,
    siteUrl: `https://nueavv.github.io`, // Your blog site url
    social: {
      twitter: ``, // Your Twitter account
      github: `nueavv`, // Your GitHub account
      medium: ``, // Your Medium account
      facebook: ``, // Your Facebook account
      linkedin: ``, // Your LinkedIn account
      instagram: ``, // Your Instagram account
    },
    icon: `content/assets/favicon.png`, // Add your favicon
    keywords: [`blog`],
    comment: {
      disqusShortName: '', // Your disqus-short-name. check disqus.com.
      utterances: '', // Your repository for archive comment
    },
    configs: {
      countOfInitialPost: 10, // Config your initial count of post
    },
    sponsor: {
      buyMeACoffeeId: '',
    },
    ga: 'G-658N8CH1JM', // Add your google analytics tranking ID
    ad: '', // Add your google adsense publisherId `ca-pub-xxxxxxxxxx`

  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/__about`,
        name: `about`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
            options: {
              margin: 36,
              scrollOffset: 0,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '%',
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-emoji`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: metaConfig.ga,
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: metaConfig.title,
        short_name: metaConfig.title,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: metaConfig.icon,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://nueavv.github.io',
        sitemap: 'https://nueavv.github.io/sitemap.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: metaConfig.ad,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-mermaid`,
            options: {
              launchOptions: {
                executablePath: 'path/to/chrome/executable'
              },
              svgo: {
                plugins: [{ name: 'removeTitle', active: false }]
              },
              mermaidOptions: {
                theme: 'neutral',
                themeCSS: '.node rect { fill: #fff; }'
              }
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-sitemap`,
  ],
}
