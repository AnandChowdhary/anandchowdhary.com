# Anand Chowdhary's personal website

Visit it at [anandchowdhary.com](https://anandchowdhary.com)

[![Netlify](https://img.shields.io/netlify/0028c6a7-b7ae-49f6-b847-917b40b5b13f)](https://app.netlify.com/sites/anandchowdhary/deploys) [![Website status](https://img.shields.io/website?down_color=red&down_message=down&up_color=brightgreen&up_message=online&url=https%3A%2F%2Fanandchowdhary.com)](https://anandchowdhary.com) [![Uptime](https://img.shields.io/uptimerobot/ratio/7/m783674845-f84f5f126f87a5110d3d21bf)](https://stats.uptimerobot.com/m29YvtjqOg)

This is the 26th version of my persional website, built using Eleventy.

## Development

### Local development

If you're cloning the project for the first time:

```
npm install
npm run build
```

After that, to make a local server with hot reloading:

```
npm run serve
```

### Deployment

Steps to deployment:

1. Push to `master` branch
2. GitHub Actions runs `npm run build-site` and pushes code to `gh-pages`
3. Netlify is triggered and deploys from `gh-pages` branch

Why? Build minutes.

## License

- Code: MIT
- Text: CC-BY-SA 4.0
- Assets and images: Proprietary (trademark law and copyright as applicable)
