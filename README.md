# Shivansh Logistics website

Responsive React + TypeScript website built with React Router and Tailwind CSS. It includes the homepage, dedicated service and industry pages, company information, contact and quote forms, tracking demo, network and policy pages.

## Run locally

```sh
npm install
npm run dev
```

Build for deployment with `npm run build`. Configure the deployment host to serve `index.html` for unknown paths so direct links and refreshes on nested routes work.

## Replaceable media

- Copy the supplied hero video to `public/video/hero-logistics.mp4`. The hero already includes muted autoplay, looping, inline playback, a poster, a CSS image fallback, and a reduced-motion static mode. The referenced video was not included with the files supplied for this build, so the static fallback is shown until the video is added.
- The company logo is represented as an editable text-and-mark wordmark because an original logo file was not available in the supplied materials.
- The service and industry photographs are distinct Unsplash image URLs in `src/App.tsx`. Replace them with approved local assets if desired.

## Content notes

Company details and confirmed capabilities are based on [shivanshlogistic.in](https://www.shivanshlogistic.in/): founded in 2016, Meerut headquarters, transportation, FTL/PTL, project and heavy equipment logistics, warehousing, distribution and supply chain management. The website also describes work related to NTPC, NHAI and infrastructure projects. Proposed industry categories are labelled as proposed in their descriptions; no individual customer relationship or performance statistics are claimed.

The shipment tracker returns clearly labelled sample events only. Quote and contact forms validate locally and explicitly say that submissions are not sent. Connect a tracking API and a server-side form/email provider before production use.
