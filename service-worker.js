/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "eleventy-plugin-pwa"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404/index.html",
    "revision": "bfff34dc9036f45620f8c905fcdba87c"
  },
  {
    "url": "about/colophon/index.html",
    "revision": "f079722d1a381e888f2456b654381629"
  },
  {
    "url": "about/devices/index.html",
    "revision": "781d03d666a88dd7e06d5cc9c7c5cb79"
  },
  {
    "url": "about/index.html",
    "revision": "d55d0c6d34b7b6748fc1823802477782"
  },
  {
    "url": "about/versions/1/index.html",
    "revision": "b96fbae8eb1fc9506427c5c579457a4d"
  },
  {
    "url": "about/versions/abacus/index.html",
    "revision": "22f27c988657eb8691c10c372e5d0f91"
  },
  {
    "url": "about/versions/academia/index.html",
    "revision": "ca1659bd26e209702bac82e58f0fdd68"
  },
  {
    "url": "about/versions/access/index.html",
    "revision": "0d60836d27ab03d3b5fdcfbdab86ae3e"
  },
  {
    "url": "about/versions/airbrush/index.html",
    "revision": "c51dc34bd03672e6b706d122a1f35442"
  },
  {
    "url": "about/versions/altitude/index.html",
    "revision": "331644fc531539cc9ba2b2f69dee7870"
  },
  {
    "url": "about/versions/amsterdam/index.html",
    "revision": "e709fbe01a358e219a78d7eb854394ca"
  },
  {
    "url": "about/versions/arise/index.html",
    "revision": "7a99e81e7dce8d2373f1ddb5fda860dd"
  },
  {
    "url": "about/versions/artistic/index.html",
    "revision": "1d48e67ab81b34d34473dd7c57dbe4e8"
  },
  {
    "url": "about/versions/assembly/index.html",
    "revision": "5121fbf39ce29b94996db07c1ed74b62"
  },
  {
    "url": "about/versions/asterisk/index.html",
    "revision": "fe9710bd6b5af30c2dd9e8c4c4e6b53d"
  },
  {
    "url": "about/versions/atom/index.html",
    "revision": "0d6bb78b3d5e08dd3e9125bab25243be"
  },
  {
    "url": "about/versions/index.html",
    "revision": "5f06d78db18ba6653587a281a2d91f6f"
  },
  {
    "url": "admin/index.html",
    "revision": "2754edb7ee25c410abfffa0bad307ef7"
  },
  {
    "url": "android-chrome-144x144.png",
    "revision": "ab44de3ca3348aa9855f39a207b0083d"
  },
  {
    "url": "android-chrome-192x192.png",
    "revision": "8cf205b1dfd9d3a65626a49d2533e8ad"
  },
  {
    "url": "android-chrome-256x256.png",
    "revision": "e74162241e02b92af8b8caa0f6fa5ce6"
  },
  {
    "url": "android-chrome-36x36.png",
    "revision": "e6475d9635e20c83adb8c2ec0ae30de8"
  },
  {
    "url": "android-chrome-384x384.png",
    "revision": "a2c7b86602691757e83b7a9fbf9e34af"
  },
  {
    "url": "android-chrome-48x48.png",
    "revision": "eb9dae6533a73cbb316df5025a3be167"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "561725a63a637608d62873aaa8ba86bd"
  },
  {
    "url": "android-chrome-72x72.png",
    "revision": "271574bd49b747911e1d96f7cf3eb289"
  },
  {
    "url": "android-chrome-96x96.png",
    "revision": "e143de91e390beed05581756c94bffda"
  },
  {
    "url": "apple-touch-icon-114x114-precomposed.png",
    "revision": "fbf35f9169ece5d509e20b10e0398d5e"
  },
  {
    "url": "apple-touch-icon-114x114.png",
    "revision": "b7929234051721bbec710b47b00c789c"
  },
  {
    "url": "apple-touch-icon-120x120-precomposed.png",
    "revision": "9a6aa18b6aa6b89eaa06629064c2dd2a"
  },
  {
    "url": "apple-touch-icon-120x120.png",
    "revision": "804dd29687296ac042da62bb6c4115ff"
  },
  {
    "url": "apple-touch-icon-144x144-precomposed.png",
    "revision": "1d1e96467473b10404e23a9f29a3289a"
  },
  {
    "url": "apple-touch-icon-144x144.png",
    "revision": "8c788db41a1ebcc3db4ef6ef51320766"
  },
  {
    "url": "apple-touch-icon-152x152-precomposed.png",
    "revision": "eba3721ee7dce6f87bb96144f1f96d65"
  },
  {
    "url": "apple-touch-icon-152x152.png",
    "revision": "411d721b9fd56f572caea68f28ac1b7b"
  },
  {
    "url": "apple-touch-icon-180x180-precomposed.png",
    "revision": "ef6654efd4d7e46f3847239d69ff7a44"
  },
  {
    "url": "apple-touch-icon-180x180.png",
    "revision": "a53bb3da01ea9e2a11af8c98e55ed010"
  },
  {
    "url": "apple-touch-icon-57x57-precomposed.png",
    "revision": "d6a56caca5becba052a82bf2bf077d28"
  },
  {
    "url": "apple-touch-icon-57x57.png",
    "revision": "aae332a98a1c5af7439f7596afba5ed2"
  },
  {
    "url": "apple-touch-icon-60x60-precomposed.png",
    "revision": "019187cea5edae8d77db82f28569de4a"
  },
  {
    "url": "apple-touch-icon-60x60.png",
    "revision": "847787a860b090b0c93694a325351232"
  },
  {
    "url": "apple-touch-icon-72x72-precomposed.png",
    "revision": "48aa4b0d5616081a14c5d23bcdda7e97"
  },
  {
    "url": "apple-touch-icon-72x72.png",
    "revision": "d5d42136aefb9949f6693bd76e65484a"
  },
  {
    "url": "apple-touch-icon-76x76-precomposed.png",
    "revision": "50f862443a5590835e1f4749e4ce12b8"
  },
  {
    "url": "apple-touch-icon-76x76.png",
    "revision": "e76c91d872862f9564f58cc00c1d9ed9"
  },
  {
    "url": "apple-touch-icon-precomposed.png",
    "revision": "971c715cf99dc84da9f7cdfc88a1c145"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "a53bb3da01ea9e2a11af8c98e55ed010"
  },
  {
    "url": "assets/scripts/app.0e4467ed.js",
    "revision": "e788751c0246a3fd7c9d4268dbe32965"
  },
  {
    "url": "assets/scripts/app.0e4467ed.js.map",
    "revision": "c7c31e06c3f0d309ff9b98a248953b9c"
  },
  {
    "url": "assets/styles/app.374e776d.css",
    "revision": "e99eec5a9f14cb24a28e34cef5736f63"
  },
  {
    "url": "assets/styles/app.374e776d.css.map",
    "revision": "85531d71b879670527ad148813433f99"
  },
  {
    "url": "blog.json",
    "revision": "dbf40c263986edcd69e1d65d5511fe02"
  },
  {
    "url": "blog/1/index.html",
    "revision": "832559578efcdb6d8014bef3cccca86e"
  },
  {
    "url": "blog/code/index.html",
    "revision": "0b9b6c03b8376bb0b16a228a09c50c1a"
  },
  {
    "url": "blog/coffee-time/google-docs-github/index.html",
    "revision": "e160b4ddca3edc2e92ba26f5d735adbe"
  },
  {
    "url": "blog/coffee-time/google-play-badges/index.html",
    "revision": "844e4a32d596c8389511c239410629df"
  },
  {
    "url": "blog/coffee-time/index.html",
    "revision": "6d7501d82c9db9101fc9c765efc05f34"
  },
  {
    "url": "blog/coffee-time/package-managers/index.html",
    "revision": "f4eef5a93991e33098c81d69b71aa0b4"
  },
  {
    "url": "blog/coffee-time/twitter-subaccounts/index.html",
    "revision": "1d82bde70777e1816752af46066998fe"
  },
  {
    "url": "blog/college/index.html",
    "revision": "cdfba28abc66dac6588168c63b46b98c"
  },
  {
    "url": "blog/design/index.html",
    "revision": "e6ba7d37d1c0d94610b019ab1d22c57c"
  },
  {
    "url": "blog/index.html",
    "revision": "0dc094f00a4e7addfd4be5c46c81cd83"
  },
  {
    "url": "blog/introducing-uppload-v2/index.html",
    "revision": "496aa9d0cc0e5f1b68583f445d7d3faa"
  },
  {
    "url": "blog/md5/index.html",
    "revision": "bf7448afda22f51a4a413959236cf338"
  },
  {
    "url": "blog/open-source/index.html",
    "revision": "bb8ae36f9a4703946ffe90096bf7b1b7"
  },
  {
    "url": "blog/quarter-of-open-source/index.html",
    "revision": "80ccda4e5439e9615272011a51f54397"
  },
  {
    "url": "blog/state-of-the/dock/2018/index.html",
    "revision": "80e51483643597fa716894f7fc1d5084"
  },
  {
    "url": "blog/state-of-the/dock/index.html",
    "revision": "a3f6c51678a2c1860008b8810701f2e9"
  },
  {
    "url": "blog/state-of-the/index.html",
    "revision": "adc6dc81da50684671a9255f65214f4c"
  },
  {
    "url": "blog/state-of-the/podcasts/2018/index.html",
    "revision": "7ed207395584573e95c48dd0a7e4ac2a"
  },
  {
    "url": "blog/state-of-the/podcasts/2019/index.html",
    "revision": "cc8e0d978683f91ac2d21d99ee5f2814"
  },
  {
    "url": "blog/state-of-the/podcasts/index.html",
    "revision": "637fc36944cf42135dafe8e8034cbb15"
  },
  {
    "url": "blog/utwente-peoplepages/index.html",
    "revision": "4b0aa32a8e6e06eac602b25c5f13e925"
  },
  {
    "url": "blog/zomato/index.html",
    "revision": "87757de2105da5c638a9e9a5c929d305"
  },
  {
    "url": "contact/index.html",
    "revision": "752660d836706f3061c4bb505d524942"
  },
  {
    "url": "cv/index.html",
    "revision": "c1d07397bb718c66812b741a6c1b01cb"
  },
  {
    "url": "events/1/index.html",
    "revision": "a064b405f9b228e7846591842bc118f4"
  },
  {
    "url": "events/2/index.html",
    "revision": "6952cbe7e3304d483e93314f41ecbaff"
  },
  {
    "url": "events/bharathacks/index.html",
    "revision": "89bbd5f6ea66e78bd4974ff781bc57b3"
  },
  {
    "url": "events/codelhi/index.html",
    "revision": "f31cbbba45bba720f905c918bcc73168"
  },
  {
    "url": "events/dutch-design-week/index.html",
    "revision": "fd16ea44227f2d34e710d9ab1263a550"
  },
  {
    "url": "events/esummit/index.html",
    "revision": "a31ea531dc7a1a72e7f70910e14f3e59"
  },
  {
    "url": "events/gogbot/index.html",
    "revision": "3e34dd404e375b1c20ccd095e52deb81"
  },
  {
    "url": "events/hackiiitd/index.html",
    "revision": "2def50c87eb2fce7f68c109f03207e37"
  },
  {
    "url": "events/hardstart-pitch-training/index.html",
    "revision": "1361d6eb73595e7216ec601c71a0d015"
  },
  {
    "url": "events/hive-01-season-5/index.html",
    "revision": "a7efdd003a28d9886a009be457ad9674"
  },
  {
    "url": "events/index.html",
    "revision": "26e77e6360985780c63a01748aacbf75"
  },
  {
    "url": "events/minet-x-2018/index.html",
    "revision": "270aeb99f2217ee43028678b42d426f6"
  },
  {
    "url": "events/minet-x-2019/index.html",
    "revision": "3be01cabe694e6f8fc508c49e9f7ff7c"
  },
  {
    "url": "events/nesst-season-3/index.html",
    "revision": "f4b8c79023efd4e6da16de6c467476b6"
  },
  {
    "url": "events/nesst/index.html",
    "revision": "b9ffeccedfe96d33f9ebc82a27e4cb54"
  },
  {
    "url": "events/oneup-scu/index.html",
    "revision": "91992f29a8acb87ea828f069c8983196"
  },
  {
    "url": "events/online-open-day/index.html",
    "revision": "84ae8ea3b007f3204acc365b2fa62b0d"
  },
  {
    "url": "events/roles/exhibition/index.html",
    "revision": "f18cdcee8b80ce6f952defbd6023691a"
  },
  {
    "url": "events/roles/index.html",
    "revision": "f82a30ca641f4d1be54e11cb7fc3f871"
  },
  {
    "url": "events/roles/panelist/index.html",
    "revision": "95c39a26d9788d911ba0e8ebee1b0299"
  },
  {
    "url": "events/roles/speaker/index.html",
    "revision": "7dfbcfa886d358f371ca7ee2e78682f8"
  },
  {
    "url": "events/roles/trainer/index.html",
    "revision": "f6123254131e6f99076b8968ce09d37f"
  },
  {
    "url": "events/sip-launch-dtu/index.html",
    "revision": "4787382273b45e9c64838933e9f5aecd"
  },
  {
    "url": "events/speakup/index.html",
    "revision": "2f5792e824a9b84896e9f44a8d7335fb"
  },
  {
    "url": "events/startup24/index.html",
    "revision": "e74ef7203b7c4882db4a16d111b2c261"
  },
  {
    "url": "events/tech-charcha/index.html",
    "revision": "df3ef6738a97b8baed6fb8f51b892941"
  },
  {
    "url": "events/tedx-hailey-road/index.html",
    "revision": "b944ad7549067631529bc430042441ca"
  },
  {
    "url": "events/wief-2018/index.html",
    "revision": "78c070c490c6cf355e8cdb7ba62b5811"
  },
  {
    "url": "events/women-who-code/index.html",
    "revision": "3986c106705f90cf31d41ca0386027de"
  },
  {
    "url": "everything/index.html",
    "revision": "0a1f2f728dfaf1c36ca35c25cc3dc096"
  },
  {
    "url": "external-dark.svg",
    "revision": "34da674b698f421a8f211452172d23fe"
  },
  {
    "url": "external.svg",
    "revision": "7eadb08503b0ae16e2fe2a03e68f5298"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "e535fb042e44943d8c2d0e59988b08dc"
  },
  {
    "url": "favicon-194x194.png",
    "revision": "90da97727819f27aaf3de674efacc62c"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "eed32b96cd8d5e8209f1de43ae9e42a8"
  },
  {
    "url": "favicon.ico",
    "revision": "da41296d1e1cec2ceb155af51eb68f5c"
  },
  {
    "url": "feed.json",
    "revision": "d6f111e4497f9926d4018697474c6558"
  },
  {
    "url": "icon.svg",
    "revision": "5c94b3639619768a1e8a45804b71d1fb"
  },
  {
    "url": "images/blog/google-play-badges/badge-proposal.png",
    "revision": "5e542eeeda7408a11f3f240d3b6d73ed"
  },
  {
    "url": "images/blog/google-play-badges/official-badges.png",
    "revision": "16d73bf24f6cab78354a2d70f1e80cde"
  },
  {
    "url": "images/blog/md5-pr_wav36p.png",
    "revision": "a565625ed8905519d63b170da717bc1c"
  },
  {
    "url": "images/blog/quarter-of-open-source/2015.png",
    "revision": "b9124b3d42ae36d43ca022c1887ff6d7"
  },
  {
    "url": "images/blog/quarter-of-open-source/2016.png",
    "revision": "71f49254714f90287b60cc6f3db47f86"
  },
  {
    "url": "images/blog/quarter-of-open-source/2017.png",
    "revision": "4532c69aef068e794b32bb0c1bd5136a"
  },
  {
    "url": "images/blog/quarter-of-open-source/2018.png",
    "revision": "5f739bb0186d6b70050a194dd67e8dc5"
  },
  {
    "url": "images/blog/quarter-of-open-source/2019.png",
    "revision": "3dee42941a29cb69bc9c12b6d3fbf982"
  },
  {
    "url": "images/blog/quarter-of-open-source/contributions.png",
    "revision": "99b065c44422dd35deb5cfe8b27456fd"
  },
  {
    "url": "images/blog/Screen_Shot_2018-07-28_at_11.27.45_PM.png",
    "revision": "b0f90cf6c02ccbea579fca74458f77d3"
  },
  {
    "url": "images/blog/secure-endpoints_ddwwmr.png",
    "revision": "fe41059db12aac20369c5f5872428698"
  },
  {
    "url": "images/blog/state-of-the/dock/1password.png",
    "revision": "7488ff567fba17bfa0ede3b8129c2722"
  },
  {
    "url": "images/blog/state-of-the/dock/airmail.png",
    "revision": "2c164a50f93599bb7dbfeafba7bff61b"
  },
  {
    "url": "images/blog/state-of-the/dock/arduino.png",
    "revision": "064e68f9d87a1a1ddef8810c1727e305"
  },
  {
    "url": "images/blog/state-of-the/dock/franz.png",
    "revision": "01af79e23ae1f154dc38f6e01a02448f"
  },
  {
    "url": "images/blog/state-of-the/dock/google-chrome.png",
    "revision": "2ac4a8e6c100f9f8826c72c8368cfe73"
  },
  {
    "url": "images/blog/state-of-the/dock/iterm.png",
    "revision": "e73f64fa4af0c4d459e1a352260f527d"
  },
  {
    "url": "images/blog/state-of-the/dock/navicat.png",
    "revision": "8318f8bfc38b5534867448111431c195"
  },
  {
    "url": "images/blog/state-of-the/dock/photoshop.png",
    "revision": "ebff9637407bc3b242ba5276e09741d1"
  },
  {
    "url": "images/blog/state-of-the/dock/postman.png",
    "revision": "a27b4d90c5301b3ab98de544a59c0778"
  },
  {
    "url": "images/blog/state-of-the/dock/sketch.png",
    "revision": "7deadd89e2db21a0d0f9b71cd022ac95"
  },
  {
    "url": "images/blog/state-of-the/dock/spotify.png",
    "revision": "3d51f1d973091c47f7bee4ee139377a4"
  },
  {
    "url": "images/blog/state-of-the/dock/termius.png",
    "revision": "4158edad9a8ce7e013b9b45341c6fd5a"
  },
  {
    "url": "images/blog/state-of-the/dock/vs-code.png",
    "revision": "5ad9b52b3236fceb5d71b40503b9cbb6"
  },
  {
    "url": "images/blog/state-of-the/podcasts/2019-0.png",
    "revision": "105fbcb678bf807fbc26e48727858e3c"
  },
  {
    "url": "images/blog/state-of-the/podcasts/2019-1.png",
    "revision": "ee5bf55b7d0cdff6ae562cf8ed829187"
  },
  {
    "url": "images/blog/state-of-the/podcasts/2019-2.png",
    "revision": "2128e0be791d1ff51f9f6cfee3581f40"
  },
  {
    "url": "images/blog/state-of-the/podcasts/99-invisible_pd4gdg.png",
    "revision": "1f016763d67f85d9274ba2a0dafb802b"
  },
  {
    "url": "images/blog/state-of-the/podcasts/a16z.png",
    "revision": "2bf76e410713055c3e3ad925a1ed534e"
  },
  {
    "url": "images/blog/state-of-the/podcasts/build-your-saas_n90oca.png",
    "revision": "c944f838abebf5197dae5a8bcd29f1d1"
  },
  {
    "url": "images/blog/state-of-the/podcasts/character-count.png",
    "revision": "3f75eda75647305ac9e430d675b2f8cd"
  },
  {
    "url": "images/blog/state-of-the/podcasts/clockwise.png",
    "revision": "15ac7a784ecbb41f1a34701e63c8382a"
  },
  {
    "url": "images/blog/state-of-the/podcasts/codeish.png",
    "revision": "d5edede86022bf8764fd17f8a982cc0d"
  },
  {
    "url": "images/blog/state-of-the/podcasts/connected.png",
    "revision": "b11a06d771462b79c39c79b56ef1ff84"
  },
  {
    "url": "images/blog/state-of-the/podcasts/cortex_fv6crb.png",
    "revision": "282e1147950f2fcb3d0a010150f48a6a"
  },
  {
    "url": "images/blog/state-of-the/podcasts/embedded_c7m41c.png",
    "revision": "27bf140c446c699fa7084c8b58b25c34"
  },
  {
    "url": "images/blog/state-of-the/podcasts/heavyweight.png",
    "revision": "a13dc25a12a9d9ba4b75ddc055d3b839"
  },
  {
    "url": "images/blog/state-of-the/podcasts/hello-internet_a98ikc.png",
    "revision": "7e5829da690b290cc6978a5a39e9d648"
  },
  {
    "url": "images/blog/state-of-the/podcasts/how-i-built-this_juo5co.png",
    "revision": "1419622b464e8d94cfbc7dd09cd8603a"
  },
  {
    "url": "images/blog/state-of-the/podcasts/http-203.png",
    "revision": "9e1c947a2c4511afaa7063a3b05c3c3a"
  },
  {
    "url": "images/blog/state-of-the/podcasts/in-depth_cvhyxy.png",
    "revision": "fc022becbe860e6d4e6a16df41dad965"
  },
  {
    "url": "images/blog/state-of-the/podcasts/instant-message.png",
    "revision": "d2b7f701b7968c13ac1a2f94d6cd6cc6"
  },
  {
    "url": "images/blog/state-of-the/podcasts/newslaundry-hafta_smvs1f.png",
    "revision": "5572a527b2a6a9760952737bcfe8b19e"
  },
  {
    "url": "images/blog/state-of-the/podcasts/numberphile.png",
    "revision": "0423d8d4f14a3fdd5f782e6bba33d511"
  },
  {
    "url": "images/blog/state-of-the/podcasts/relatively-prime_ada4tg.png",
    "revision": "2f2d8800e23ae489c3f0a91699af907a"
  },
  {
    "url": "images/blog/state-of-the/podcasts/startup_hgrdxc.png",
    "revision": "27bbf04beefcd33d676601b1be855041"
  },
  {
    "url": "images/blog/state-of-the/podcasts/talkscript.png",
    "revision": "d7ad7a972dbeac48207a5e79899b3de4"
  },
  {
    "url": "images/blog/state-of-the/podcasts/ted-radio-hour_kwaymj.png",
    "revision": "aac5063661b026deba710e87957d5f67"
  },
  {
    "url": "images/blog/state-of-the/podcasts/the-daily_j51cfm.png",
    "revision": "5314c322e6a43525ff55007253adc70d"
  },
  {
    "url": "images/blog/state-of-the/podcasts/the-freecodecamp-podcast_m1bi3p.png",
    "revision": "0989b7a8972b8622494756deef74234f"
  },
  {
    "url": "images/blog/state-of-the/podcasts/the-unmade-podcast_faatpk.png",
    "revision": "5236f7dbe3859ad7b12d0ca4322f1579"
  },
  {
    "url": "images/blog/state-of-the/podcasts/travel-genius.png",
    "revision": "daafbcd51b1a3c00f8f94ed33070f9c0"
  },
  {
    "url": "images/blog/state-of-the/podcasts/unbox.png",
    "revision": "efbd1c6078ebede0014c82225542f997"
  },
  {
    "url": "images/blog/state-of-the/podcasts/where-should-we-begin_crlryb.png",
    "revision": "7a6e40dbe9ed0f5f8e884a99d8f9e012"
  },
  {
    "url": "images/blog/state-of-the/podcasts/without-fail.png",
    "revision": "18a1999fb4e8c2816fa1f9b36754dd2c"
  },
  {
    "url": "images/blog/state-of-the/podcasts/works-for-me.png",
    "revision": "0eb49ffda5cf71e7798f340c74d8957c"
  },
  {
    "url": "images/events/esummit/1.jpg",
    "revision": "e8952d2f78035da10dc1361eb1d1341d"
  },
  {
    "url": "images/events/esummit/2.jpg",
    "revision": "d937b0917b51d27af3634dc5684f815b"
  },
  {
    "url": "images/events/esummit/3.jpg",
    "revision": "8a7744975dab0bdca0dde9c91c4ede3e"
  },
  {
    "url": "images/events/esummit/4.jpg",
    "revision": "fc6ce2cc4282bb184ed92ffcb38177cf"
  },
  {
    "url": "images/events/esummit/icon.png",
    "revision": "f1e4646f816dffbe9a56401933fbf69f"
  },
  {
    "url": "images/events/hive-01/icon.png",
    "revision": "f413a4b28514ca3a442a0f7a0d97287e"
  },
  {
    "url": "images/events/minet-x-2018/icon.png",
    "revision": "87cd3ef596f28c11631d06886e2e4b63"
  },
  {
    "url": "images/events/online-open-day/icon.png",
    "revision": "39dc0b5c2198e8f8ba4bc69fbe96072c"
  },
  {
    "url": "images/events/online-open-day/screen1.png",
    "revision": "b8b6397113706c5c76d22ad2de038874"
  },
  {
    "url": "images/events/online-open-day/screen2.png",
    "revision": "1444c23ed42932df513c4fa9986258fc"
  },
  {
    "url": "images/events/speakup/5baa7959cb226_MASTERPHOTO_NL-20-09-18_042.jpg",
    "revision": "0c3ecb2f4ad2b9b7b6dbb37397b0626e"
  },
  {
    "url": "images/events/speakup/5baa795ec8ec7_MASTERPHOTO_NL-20-09-18_053.jpg",
    "revision": "253e9c8c108ef7dd9072894a11d15693"
  },
  {
    "url": "images/events/speakup/5baa79763d49f_MASTERPHOTO_NL-20-09-18_102.jpg",
    "revision": "0a9dca87f552c25af3a2d40bd0884802"
  },
  {
    "url": "images/events/speakup/5baa797ed3317_MASTERPHOTO_NL-20-09-18_121.jpg",
    "revision": "7947be1bcc06c706559fac1e18b1b3b7"
  },
  {
    "url": "images/events/speakup/icon.png",
    "revision": "41242c9296d596ea63a44b225dc205cf"
  },
  {
    "url": "images/icons/acjs.png",
    "revision": "711a974c572587a6ba5ff83021227379"
  },
  {
    "url": "images/icons/akept-wief-social-enterprise-forum.png",
    "revision": "d7f5a39f2fdd527b5ad13f8769dc9cf1"
  },
  {
    "url": "images/icons/aptitude.png",
    "revision": "6a2120dde58c5850709d3185142abd45"
  },
  {
    "url": "images/icons/bharathacks.png",
    "revision": "4d61b5f6e6604519e8afd9ae3028baac"
  },
  {
    "url": "images/icons/codelhi.png",
    "revision": "2b0a7dec118fdfeb9ec8bf842e0467f2"
  },
  {
    "url": "images/icons/dtu.png",
    "revision": "ae7af6703b17b9e66025a2a9cab87573"
  },
  {
    "url": "images/icons/dutch-design-week.png",
    "revision": "ead74e7a7aab0b9b1511f51e48fc6c05"
  },
  {
    "url": "images/icons/essential.png",
    "revision": "fa15142a4c76f404893d9ca780dc425c"
  },
  {
    "url": "images/icons/facebook.png",
    "revision": "78fb24e1fb00fcca55bbb6ed0ce29c9f"
  },
  {
    "url": "images/icons/gogbot.png",
    "revision": "39142f32f7183572c9571b23a5eea924"
  },
  {
    "url": "images/icons/hackiiitd.png",
    "revision": "239c74a126314bb6b9b8a9350329a33e"
  },
  {
    "url": "images/icons/hardstart.png",
    "revision": "d07ae68a290f6ec59c5c8203a7f7fcb7"
  },
  {
    "url": "images/icons/nesst.png",
    "revision": "77ff150067fae599ce761da677859887"
  },
  {
    "url": "images/icons/one-grid.png",
    "revision": "5b8c8e2aa5656e7c2e90c6c20c807776"
  },
  {
    "url": "images/icons/oneup.png",
    "revision": "39c772511ae31d9fe47bff073a7982ac"
  },
  {
    "url": "images/icons/precis.png",
    "revision": "3774c3d68247bf2405c410b63df07f4a"
  },
  {
    "url": "images/icons/staart.png",
    "revision": "fb036d84365ff8c1511620e6dc8c0db4"
  },
  {
    "url": "images/icons/startup24.png",
    "revision": "0b93d612b58b75e8e59caa28d96dadef"
  },
  {
    "url": "images/icons/tedx.png",
    "revision": "2a45b70dcdbf66d81fc88c3726065c6a"
  },
  {
    "url": "images/icons/uppload.png",
    "revision": "d1118680eda62149cef5ed7937db4ff2"
  },
  {
    "url": "images/icons/women-who-code.png",
    "revision": "9a08a20b4fd850eeb9c61b1f76e79ecc"
  },
  {
    "url": "images/open-source/aptitude.jpg",
    "revision": "d182ec6a42b864a9dbeca4a7300e55e9"
  },
  {
    "url": "images/open-source/essential1.png",
    "revision": "fd92a0ebb5100b05c6d9cf356a248ae8"
  },
  {
    "url": "images/open-source/essential2.png",
    "revision": "abb51cb1831da9a10567831cd002fedb"
  },
  {
    "url": "images/open-source/hello-bar/icon.svg",
    "revision": "c2ee9ddf03f9a5fa0595547e110985a8"
  },
  {
    "url": "images/open-source/hello-bar/screenshot.png",
    "revision": "de97eec9330b123f762137f0ac296c54"
  },
  {
    "url": "images/open-source/hovercard/icon.png",
    "revision": "f3289f308111531488c8e52d9f84f9c0"
  },
  {
    "url": "images/open-source/hovercard/screenshot.png",
    "revision": "8f7682ed132c354bf6a03c3df93e8fa8"
  },
  {
    "url": "images/open-source/one-grid.jpg",
    "revision": "bf7933ece22a086fe05d0a9c76b2099b"
  },
  {
    "url": "images/open-source/precis1.png",
    "revision": "563831c47aa31cda7c3e4c3f22a13488"
  },
  {
    "url": "images/open-source/precis2.png",
    "revision": "8eda9a6f08fb432ebfa1271f53d93616"
  },
  {
    "url": "images/open-source/precis3.png",
    "revision": "cacc09d98c2c3fbd281dac5c20bdb0f8"
  },
  {
    "url": "images/open-source/staart/1.png",
    "revision": "8fc7cc7f55916ac47b39eba2bff48fa0"
  },
  {
    "url": "images/open-source/staart/2.png",
    "revision": "5b39552388db7733006ce66854d07fc4"
  },
  {
    "url": "images/open-source/staart/3.png",
    "revision": "3fcbedd85fd86727febe0db1bd6aa5ca"
  },
  {
    "url": "images/open-source/staart/4.png",
    "revision": "2c743423965da981b8c69e81078d5d9c"
  },
  {
    "url": "images/open-source/staart/5.png",
    "revision": "e1de544abf6472ddd99b2bf0a9b3946b"
  },
  {
    "url": "images/open-source/staart/6.png",
    "revision": "b457d0b2a7539233a71c18f5e2b053e3"
  },
  {
    "url": "images/photos/anand-chowdhary.jpg",
    "revision": "b9da1cb751738c2c961a21d6606e3af9"
  },
  {
    "url": "images/portfolio/baymax_2x.png",
    "revision": "77460b66cda928e88019f1fa945d024c"
  },
  {
    "url": "images/portfolio/bharathacks_2x.png",
    "revision": "277e8ee79e1b5de5a349bb77faf0ea94"
  },
  {
    "url": "images/portfolio/blueboard_2x.png",
    "revision": "00d15811179acd104c09752450f4f5a5"
  },
  {
    "url": "images/portfolio/capella_2x.png",
    "revision": "cc5d7a8fb82d1095fcc848662526086d"
  },
  {
    "url": "images/portfolio/classrebels_2x.png",
    "revision": "bacd7a4f5b768f849c3b5c1de434d991"
  },
  {
    "url": "images/portfolio/claude_2x.png",
    "revision": "354479f25383858490342d2f76b933ab"
  },
  {
    "url": "images/portfolio/crink-jewel_2x.png",
    "revision": "996116c560fa5375dc61d3397539ca7b"
  },
  {
    "url": "images/portfolio/csunite_2x.png",
    "revision": "13a4ae8fc10849fd09ef3d1890c1f485"
  },
  {
    "url": "images/portfolio/cyankart_2x.png",
    "revision": "290963b8143a95e610fa071d14f2c8ba"
  },
  {
    "url": "images/portfolio/delhi-government_2x.png",
    "revision": "b25d0cdb74cd9f49a25f651e1c0628be"
  },
  {
    "url": "images/portfolio/drillmaps_2x.png",
    "revision": "8d5ab78a3fa23213d4cd1ddc79451b80"
  },
  {
    "url": "images/portfolio/facematch_2x.png",
    "revision": "28582a0ed7ad0fbf995d4d7526c15e88"
  },
  {
    "url": "images/portfolio/firangana_2x.png",
    "revision": "deb5b45542d65576fee65a8bcac48a5d"
  },
  {
    "url": "images/portfolio/ibm-iot-escape-room_2x.png",
    "revision": "e45977e47e4f71ded76d446f55d7843c"
  },
  {
    "url": "images/portfolio/internet.org_2x.png",
    "revision": "55d4a470cafa1698352c87d5056bc6a8"
  },
  {
    "url": "images/portfolio/justice-adda_2x.png",
    "revision": "7f821b3cc97a1f4d4b978264f8486183"
  },
  {
    "url": "images/portfolio/keeep_2x.png",
    "revision": "6e58e9ccbdae12062f06b553bf67c624"
  },
  {
    "url": "images/portfolio/made-with-love-in-india_2x.png",
    "revision": "0fd56c3f5da4541c4e3dfb0f124da5ee"
  },
  {
    "url": "images/portfolio/melangebox_2x.png",
    "revision": "591486f1e72ef9cead66ef41c6aa1451"
  },
  {
    "url": "images/portfolio/naari_2x.png",
    "revision": "55f3912ed2487cb35e354993bb106c3e"
  },
  {
    "url": "images/portfolio/project-blue_2x.png",
    "revision": "2fbd413aa064d622f7613307ee94d306"
  },
  {
    "url": "images/portfolio/refuserve_2x.png",
    "revision": "25d7746202b2022d8681227d07257c17"
  },
  {
    "url": "images/portfolio/saga-music_2x.png",
    "revision": "0e4bb1ef5f935bbce22472e1fcb3f99a"
  },
  {
    "url": "images/portfolio/sixteeninches_2x.png",
    "revision": "88ecf18df35740a852e625fe9915831d"
  },
  {
    "url": "images/portfolio/unifiers_2x.png",
    "revision": "540c6ba2204b72410426db5d72fc37ed"
  },
  {
    "url": "images/portfolio/wendy_2x.png",
    "revision": "115639e36820f1bf3757077ff601b545"
  },
  {
    "url": "images/projects/aristotle/1.png",
    "revision": "cbf471d951f411bf8ee672321ce340e9"
  },
  {
    "url": "images/projects/aristotle/2.png",
    "revision": "be49cec4ab3149e4e858901d1f1957ee"
  },
  {
    "url": "images/projects/aristotle/3.png",
    "revision": "4aa3542b7998b40794805c7e0f4de2a0"
  },
  {
    "url": "images/projects/aristotle/4.png",
    "revision": "9531b2b1f4374589e68565b2f044055f"
  },
  {
    "url": "images/projects/aristotle/5.png",
    "revision": "5431510ffdf48f8f1bd04aa29b98ac1f"
  },
  {
    "url": "images/projects/aristotle/6.png",
    "revision": "ab61035bb8aa0d6afb48d4770df008c9"
  },
  {
    "url": "images/projects/aristotle/7.png",
    "revision": "f0c09ac4c63b75f6b6f5c38ebf356cec"
  },
  {
    "url": "images/projects/aristotle/8.png",
    "revision": "955ffb5d7c3afbbe8d3ebdbae0ebe001"
  },
  {
    "url": "images/projects/aristotle/icon.png",
    "revision": "89933c83c6436c2442fc7207b525af96"
  },
  {
    "url": "images/projects/baymax/1.png",
    "revision": "6127024427ab239853096e96fa848ddc"
  },
  {
    "url": "images/projects/baymax/2.png",
    "revision": "4f7cde10d0796bdc254a3274ef4f9923"
  },
  {
    "url": "images/projects/baymax/3.png",
    "revision": "3dc2948bd4a7a07f56becea2ceb9a76e"
  },
  {
    "url": "images/projects/baymax/icon.png",
    "revision": "64f8ecc360fb17e87eb8ef7562dae48d"
  },
  {
    "url": "images/projects/bharathacks/1.png",
    "revision": "4b09c295665e91a01712b344c991c724"
  },
  {
    "url": "images/projects/bharathacks/icon.png",
    "revision": "4d61b5f6e6604519e8afd9ae3028baac"
  },
  {
    "url": "images/projects/blueboard/1.jpg",
    "revision": "858f036bc3a6679a99aeaf67c1a3f39b"
  },
  {
    "url": "images/projects/blueboard/2.jpg",
    "revision": "5374f13fc80b75068895b4308959f1cd"
  },
  {
    "url": "images/projects/blueboard/icon.png",
    "revision": "1b6fff33601a39d415a1bbb09251057a"
  },
  {
    "url": "images/projects/blueboard/team.png",
    "revision": "e1a945413117849d0968442b7ea6d805"
  },
  {
    "url": "images/projects/capella/1.jpg",
    "revision": "49915f9b5d70aa082a6881e68c9cc9f1"
  },
  {
    "url": "images/projects/capella/emergency.png",
    "revision": "b6aa2b628a02052ce6b2bfa086e1dddc"
  },
  {
    "url": "images/projects/capella/home.png",
    "revision": "2e6419aa5577f73a744cb47d48b81b6e"
  },
  {
    "url": "images/projects/capella/icon.png",
    "revision": "4da698fca69a95ee1bf879e4c8cf03cd"
  },
  {
    "url": "images/projects/capella/location.png",
    "revision": "f49fef8e428197c8573b14d7f45975d0"
  },
  {
    "url": "images/projects/capella/people.png",
    "revision": "cab609ea1a18c32e791e659a61381650"
  },
  {
    "url": "images/projects/capella/s1.jpg",
    "revision": "298f0b631cffab4804a601e07319e960"
  },
  {
    "url": "images/projects/capella/s2.jpg",
    "revision": "54252a66eb201a1906bbcf307c3a306c"
  },
  {
    "url": "images/projects/capella/s3.jpg",
    "revision": "7186df5539d7c9929c9739d44ef963b3"
  },
  {
    "url": "images/projects/capella/s4.jpg",
    "revision": "8dd71037100db95e4d7c5201c52f008e"
  },
  {
    "url": "images/projects/capella/settings.png",
    "revision": "f297a63ea7d25f66682e1bc9a3cca090"
  },
  {
    "url": "images/projects/capella/taste.png",
    "revision": "107bdabff44e7d2354e7a0811783ba5c"
  },
  {
    "url": "images/projects/classrebels/1.jpg",
    "revision": "eabf9749c04bd3a3befcee099223d679"
  },
  {
    "url": "images/projects/classrebels/2.png",
    "revision": "cf4e605361efbe99aeef746249c276b5"
  },
  {
    "url": "images/projects/classrebels/3.png",
    "revision": "f6d3a572081e6ce332afad9528b6e41b"
  },
  {
    "url": "images/projects/classrebels/4.png",
    "revision": "fd10e82a6673042a165a9d80a2d4f4a1"
  },
  {
    "url": "images/projects/classrebels/5.png",
    "revision": "3dd0567f924dbde60cd328ef8dbce84b"
  },
  {
    "url": "images/projects/classrebels/cover.png",
    "revision": "5b1ef70ff94daf11f2bfbbd5a412233e"
  },
  {
    "url": "images/projects/classrebels/icon.png",
    "revision": "81748ebd32dfb55fa2345b97843e06ec"
  },
  {
    "url": "images/projects/clshare/1.png",
    "revision": "543f51af39a40959631fb917e5832cc2"
  },
  {
    "url": "images/projects/clshare/2.png",
    "revision": "75dc18226f4892c3e242c4273b9afda5"
  },
  {
    "url": "images/projects/clshare/3.png",
    "revision": "0a343c8dc19244736040e3b11f61f6f7"
  },
  {
    "url": "images/projects/clshare/4.png",
    "revision": "239ba03081a3eb88d9f41983e8bcec45"
  },
  {
    "url": "images/projects/clshare/5.png",
    "revision": "9d3fdcdfd977554b30ffd5d318c62d43"
  },
  {
    "url": "images/projects/clshare/6.png",
    "revision": "f019bb1766cc72e295381ec2cdb26009"
  },
  {
    "url": "images/projects/clshare/cover.png",
    "revision": "5ec24a24a4184f39ff716d22cb83805d"
  },
  {
    "url": "images/projects/clshare/icon.png",
    "revision": "907cf6d71aa23b610e74e91f6fddd512"
  },
  {
    "url": "images/projects/clshare/IMG_1169.jpg",
    "revision": "522699f38231b192123c90f83e3ccd52"
  },
  {
    "url": "images/projects/clshare/IMG_1195.jpg",
    "revision": "9b5ce3f88ed1b5b0516e493cb5c0fafd"
  },
  {
    "url": "images/projects/crink-jewel/1.png",
    "revision": "4bdd70dd5f45185ae80a0266d84c8a1a"
  },
  {
    "url": "images/projects/crink-jewel/2.png",
    "revision": "b888b673ecbc237f3a8ff7e57189d6c5"
  },
  {
    "url": "images/projects/crink-jewel/3.png",
    "revision": "1aa08e4c8245947fe68d1dd45e03289c"
  },
  {
    "url": "images/projects/crink-jewel/4.png",
    "revision": "6a07610b8c70fe366f59bee7e958b244"
  },
  {
    "url": "images/projects/crink-jewel/5.png",
    "revision": "52b56e3d9a08c8a7d6d0fe69bd0031de"
  },
  {
    "url": "images/projects/crink-jewel/6.png",
    "revision": "cdd424d3bb0daa470d02e6e68c3c0168"
  },
  {
    "url": "images/projects/crink-jewel/7.png",
    "revision": "fdfa28ffcafeedc3d1aae178ca234c89"
  },
  {
    "url": "images/projects/crink-jewel/icon.png",
    "revision": "facdfaea9fb7aaa2bccb3ee785ad7504"
  },
  {
    "url": "images/projects/csunite/community.png",
    "revision": "38905c7d6306ea3092e1c595f9d1197f"
  },
  {
    "url": "images/projects/csunite/icon.png",
    "revision": "004b1af7c699ade6d802c998efda8feb"
  },
  {
    "url": "images/projects/csunite/learn.png",
    "revision": "fd0f158615a8e20f976fd1f442400f3a"
  },
  {
    "url": "images/projects/csunite/news.png",
    "revision": "549e4d5e9ed9fb440b6f532b85086ece"
  },
  {
    "url": "images/projects/csunite/profile.png",
    "revision": "4002ee04e7abd5ddcb3e97d18baa5ed0"
  },
  {
    "url": "images/projects/csunite/request.png",
    "revision": "f0e36a6cd1698b50c287e9b45321fd30"
  },
  {
    "url": "images/projects/csunite/requests.png",
    "revision": "bf06e50127463a87e145439929255b7a"
  },
  {
    "url": "images/projects/csunite/slide-1.png",
    "revision": "03b1b8bdf21f4b8f1e5c9d05ace671e9"
  },
  {
    "url": "images/projects/csunite/slide-2.png",
    "revision": "2fbdb9ea11a8f03fcc838bae3356adb8"
  },
  {
    "url": "images/projects/csunite/video.png",
    "revision": "5cc212124cdd6ff5667106f61ac8c7cf"
  },
  {
    "url": "images/projects/cyankart/1.png",
    "revision": "9acb0a0c80e98af3795b696ebaf55665"
  },
  {
    "url": "images/projects/cyankart/2.png",
    "revision": "ccedb5fa2c0640bf1b84026895709769"
  },
  {
    "url": "images/projects/cyankart/a.png",
    "revision": "b14ffc713692ce8e9bf9740569f12ad5"
  },
  {
    "url": "images/projects/cyankart/icon.png",
    "revision": "7aeea52911d70c536a4b280f58522f0a"
  },
  {
    "url": "images/projects/delhi-government/1.png",
    "revision": "06e8e72e2e1b02d9671e9c43a78072bb"
  },
  {
    "url": "images/projects/delhi-government/2.png",
    "revision": "6959bc1b8be0d4719eb6ddeae51f239c"
  },
  {
    "url": "images/projects/delhi-government/3.png",
    "revision": "b21a6f80b2b7d97fe0b1231977c9881a"
  },
  {
    "url": "images/projects/delhi-government/icon.png",
    "revision": "55ed45b92e6da669b5fa9871800048ef"
  },
  {
    "url": "images/projects/drillmaps/1.png",
    "revision": "0015fb2199f7a851e31049c28a9393a6"
  },
  {
    "url": "images/projects/drillmaps/2.png",
    "revision": "d19e66d0889bc8872a75128f2a5ffebc"
  },
  {
    "url": "images/projects/drillmaps/3.png",
    "revision": "f2ba6ca000fd032ed70b974d6430b9ec"
  },
  {
    "url": "images/projects/drillmaps/4.png",
    "revision": "eaee8ddd8fd4f4477e7d05fff11341a8"
  },
  {
    "url": "images/projects/drillmaps/5.png",
    "revision": "f4899826663df22f7390e4a2e36d26fc"
  },
  {
    "url": "images/projects/drillmaps/icon.png",
    "revision": "2b546e729005c089d6abcb40b91aee80"
  },
  {
    "url": "images/projects/drillmaps/logo.png",
    "revision": "82f4bb77aaa007988893b98e018dfcf1"
  },
  {
    "url": "images/projects/facematch/1.jpg",
    "revision": "41bd190f9aea24b565a40e407478dc7e"
  },
  {
    "url": "images/projects/facematch/2.jpg",
    "revision": "8c37fe28388061527fed6cbf202316bc"
  },
  {
    "url": "images/projects/facematch/icon.png",
    "revision": "66f03536b6ecb6167294d978654006e4"
  },
  {
    "url": "images/projects/firangana/1.png",
    "revision": "6569a7423e39bfa707a9536007c3a507"
  },
  {
    "url": "images/projects/firangana/2.png",
    "revision": "69fad04a361b88458372180a835fe964"
  },
  {
    "url": "images/projects/firangana/3.png",
    "revision": "c30297ef3d747a08ca0a2f51fdf00e0b"
  },
  {
    "url": "images/projects/firangana/coupon.png",
    "revision": "f3e20b5cba8244a76b364fa8a90d4f45"
  },
  {
    "url": "images/projects/firangana/icon.png",
    "revision": "c419e9fd365b20912fe4dfbc350bafbf"
  },
  {
    "url": "images/projects/firangana/insta.png",
    "revision": "855cafe71f25a09768833eb8292c8a5d"
  },
  {
    "url": "images/projects/firangana/photo.png",
    "revision": "36bec36272b81658b254fb8ddf5ae065"
  },
  {
    "url": "images/projects/firangana/tw.png",
    "revision": "06010ac507893d69508be5dd41c78479"
  },
  {
    "url": "images/projects/gsmc/1.png",
    "revision": "7c45c41f9ff5612de4c25f1684f1006d"
  },
  {
    "url": "images/projects/gsmc/cover.png",
    "revision": "7c02db1866e98ff36d7fb23ec7fa39e8"
  },
  {
    "url": "images/projects/gsmc/icon.png",
    "revision": "cfca6044024e4527d59e5620d1aea674"
  },
  {
    "url": "images/projects/ibm-iot-escape-room/1.jpg",
    "revision": "4bf75d17a7f0ee574f3dc8df8b6fa508"
  },
  {
    "url": "images/projects/ibm-iot-escape-room/2.jpg",
    "revision": "c7f97a09fee4d0bae93cb8c15e217286"
  },
  {
    "url": "images/projects/ibm-iot-escape-room/3.jpg",
    "revision": "130d50274edbebfd06fc6312d00d8ebc"
  },
  {
    "url": "images/projects/ibm-iot-escape-room/4.jpg",
    "revision": "1512d5dc7cb5f8c0f171b1ad267df9a3"
  },
  {
    "url": "images/projects/ibm-iot-escape-room/5.jpg",
    "revision": "3d9ed8f753ee430a6a1606f3861ab19f"
  },
  {
    "url": "images/projects/ibm-iot-escape-room/6.jpg",
    "revision": "df225dc1588b3e15c77ff7e241387ee0"
  },
  {
    "url": "images/projects/ibm-iot-escape-room/icon.png",
    "revision": "e3d6306b1eb901dcd46fb6125531f3c6"
  },
  {
    "url": "images/projects/internetorg/1.jpg",
    "revision": "b2b92c77c1518a2c7a3f4755ba4cabee"
  },
  {
    "url": "images/projects/internetorg/2.jpg",
    "revision": "acac5110492e9c1dfabf74b47e903409"
  },
  {
    "url": "images/projects/internetorg/3.png",
    "revision": "94c49cee77743f3a84c29d6f37817d9e"
  },
  {
    "url": "images/projects/internetorg/4.png",
    "revision": "7d0891254be64454eca20f8169a77932"
  },
  {
    "url": "images/projects/internetorg/icon.png",
    "revision": "6a9b8c7d9786041ea1bfc5d44e24d870"
  },
  {
    "url": "images/projects/justice-adda/0001.jpg",
    "revision": "9bc3e6383a1a2f754d3fab3c4d87e803"
  },
  {
    "url": "images/projects/justice-adda/0002.jpg",
    "revision": "1874216f43dfa2472dcb574d678c9399"
  },
  {
    "url": "images/projects/justice-adda/0003.jpg",
    "revision": "63acc7980c446960452dfa6c4582c08c"
  },
  {
    "url": "images/projects/justice-adda/0004.jpg",
    "revision": "b2c9b448cd096afdbe7b3498831982d1"
  },
  {
    "url": "images/projects/justice-adda/0005.jpg",
    "revision": "bf9a58f0382aeb88405fffb5059eb40a"
  },
  {
    "url": "images/projects/justice-adda/0006.jpg",
    "revision": "101dd6ad78e6a99c76376ea5ad929b6f"
  },
  {
    "url": "images/projects/justice-adda/0007.jpg",
    "revision": "99db4d134b162c5e37aadf35dd000909"
  },
  {
    "url": "images/projects/justice-adda/0008.jpg",
    "revision": "01e902bb7c0a3dc77c621dcfdfdad1b1"
  },
  {
    "url": "images/projects/justice-adda/0009.jpg",
    "revision": "7e84834204bc91553283f985bcaae47b"
  },
  {
    "url": "images/projects/justice-adda/0010.jpg",
    "revision": "a696e0e3845b05f89b88d673d2dece03"
  },
  {
    "url": "images/projects/justice-adda/0011.jpg",
    "revision": "9583fc3f3e985294ebd2517f8ee26bed"
  },
  {
    "url": "images/projects/justice-adda/0012.jpg",
    "revision": "19943779594e499afaa3b22a02a47f93"
  },
  {
    "url": "images/projects/justice-adda/0013.jpg",
    "revision": "863300aa76042821f8b687a1bdf9f2b7"
  },
  {
    "url": "images/projects/justice-adda/0014.jpg",
    "revision": "fc734866baad2f66160b8f9978d4fc2b"
  },
  {
    "url": "images/projects/justice-adda/0015.jpg",
    "revision": "039bdbb143a83be942998740f92c5719"
  },
  {
    "url": "images/projects/justice-adda/0016.jpg",
    "revision": "ac575aa36a91dcd46e4844c987f2871e"
  },
  {
    "url": "images/projects/justice-adda/0017.jpg",
    "revision": "dc5c10b33fd2dbadbb0b953af2318127"
  },
  {
    "url": "images/projects/justice-adda/0018.jpg",
    "revision": "02960d3b2035a01f04be89b229b4e335"
  },
  {
    "url": "images/projects/justice-adda/icon.png",
    "revision": "297afcf27abb091a012fd8f11c8b52cc"
  },
  {
    "url": "images/projects/keeep/1.jpg",
    "revision": "7499f42c9909bee886e8c4b7823ae787"
  },
  {
    "url": "images/projects/keeep/2.jpg",
    "revision": "9b3db083435b3a6901ce31751122d0e3"
  },
  {
    "url": "images/projects/keeep/3.jpg",
    "revision": "0fc2313cccfe8652008bca67f00c307d"
  },
  {
    "url": "images/projects/keeep/4.jpg",
    "revision": "47a9dee5d5f06a96c775a34c6dbfd5ef"
  },
  {
    "url": "images/projects/keeep/5.jpg",
    "revision": "6045e77e5a54ce0ea93e6fba627002ca"
  },
  {
    "url": "images/projects/keeep/6.jpg",
    "revision": "9085e2b84b41918484e1e274f0d99af3"
  },
  {
    "url": "images/projects/keeep/7.jpg",
    "revision": "c6f64497e7ed7121d098a34bff50dc35"
  },
  {
    "url": "images/projects/keeep/icon.png",
    "revision": "9e34b652196e0bbf67c93520e7326545"
  },
  {
    "url": "images/projects/melangebox/icon.png",
    "revision": "8ea9d081a97e6e1092454aa888273944"
  },
  {
    "url": "images/projects/mwlii/1.png",
    "revision": "c9b075028cec8a1a4c4c539beca7f080"
  },
  {
    "url": "images/projects/mwlii/2.png",
    "revision": "dd8825a39b16f218a149698001c52860"
  },
  {
    "url": "images/projects/mwlii/3.png",
    "revision": "12f3896ad3ce398609010a8f888d1c8a"
  },
  {
    "url": "images/projects/mwlii/4.png",
    "revision": "614984b4dcdd66b9f3e39de6a9d20f74"
  },
  {
    "url": "images/projects/mwlii/cover.png",
    "revision": "c75ac935bea7f11d4597d5b5e6a28f21"
  },
  {
    "url": "images/projects/mwlii/icon.png",
    "revision": "9137b929e75194d74864f7a6af95d8b2"
  },
  {
    "url": "images/projects/naari/1.png",
    "revision": "cdea0c4b925356829e5bfffbfc08e713"
  },
  {
    "url": "images/projects/naari/2.png",
    "revision": "bc4f8ff369ffffaafe8cd5ea7f12626c"
  },
  {
    "url": "images/projects/naari/3.png",
    "revision": "a7b425124a29ace123370c5b91ad3b3e"
  },
  {
    "url": "images/projects/naari/4.png",
    "revision": "416c9157a4960f3ce550c6a5472e03fe"
  },
  {
    "url": "images/projects/naari/5.png",
    "revision": "efe5042dacd812158a42ad5ed633fd2b"
  },
  {
    "url": "images/projects/naari/express.png",
    "revision": "5c3d4ff6ca0fdc715520093bcfe8f708"
  },
  {
    "url": "images/projects/naari/home.png",
    "revision": "36a02a3d426d09325838b19a6b07551c"
  },
  {
    "url": "images/projects/naari/icon.png",
    "revision": "339b1ed8c02032ab35c48f70a46bef73"
  },
  {
    "url": "images/projects/naari/ml.png",
    "revision": "04c623f2ab40ecb406e571366b5b1410"
  },
  {
    "url": "images/projects/open-source/staart/1.png",
    "revision": "8fc7cc7f55916ac47b39eba2bff48fa0"
  },
  {
    "url": "images/projects/open-source/staart/2.png",
    "revision": "5b39552388db7733006ce66854d07fc4"
  },
  {
    "url": "images/projects/open-source/staart/3.png",
    "revision": "3fcbedd85fd86727febe0db1bd6aa5ca"
  },
  {
    "url": "images/projects/open-source/staart/4.png",
    "revision": "2c743423965da981b8c69e81078d5d9c"
  },
  {
    "url": "images/projects/open-source/staart/5.png",
    "revision": "e1de544abf6472ddd99b2bf0a9b3946b"
  },
  {
    "url": "images/projects/open-source/staart/6.png",
    "revision": "b457d0b2a7539233a71c18f5e2b053e3"
  },
  {
    "url": "images/projects/open-source/staart/cover.png",
    "revision": "360a028e327365c9750a8f6b2025536d"
  },
  {
    "url": "images/projects/open-source/uppload/1.png",
    "revision": "0f86e4f62db1874b763c13e330d08f44"
  },
  {
    "url": "images/projects/open-source/uppload/2.png",
    "revision": "04e8b9fcc4f4f9563df7276d1faa2722"
  },
  {
    "url": "images/projects/open-source/uppload/3.png",
    "revision": "6ce8592643c49426a24aabafcc6a6b42"
  },
  {
    "url": "images/projects/open-source/uppload/4.png",
    "revision": "834d5601d762325efd488f5cb2097666"
  },
  {
    "url": "images/projects/open-source/uppload/5.png",
    "revision": "56259cc6d744a7572de07c826513f1c4"
  },
  {
    "url": "images/projects/open-source/uppload/6.png",
    "revision": "deec8a8578998c74cb7514e2bcfb7240"
  },
  {
    "url": "images/projects/open-source/uppload/cover.png",
    "revision": "61413bb50be8c4236389ef6f34d8be69"
  },
  {
    "url": "images/projects/open-source/uppload/icon.png",
    "revision": "d184f0394aa938f14224d7468eb40554"
  },
  {
    "url": "images/projects/oswald-labs/agastya/chatbot.png",
    "revision": "6f9c2a21562cfb7b1cca3b59bfcd9b36"
  },
  {
    "url": "images/projects/oswald-labs/agastya/cover.png",
    "revision": "470292ac622a214ef3487b214b69486c"
  },
  {
    "url": "images/projects/oswald-labs/agastya/customize.png",
    "revision": "7157c6c881247f6335f4086f14fe5dac"
  },
  {
    "url": "images/projects/oswald-labs/agastya/home.png",
    "revision": "760045906f809799985add4b4044104d"
  },
  {
    "url": "images/projects/oswald-labs/agastya/icon.png",
    "revision": "7c022477344accdef9cbc02005e1b053"
  },
  {
    "url": "images/projects/oswald-labs/agastya/modes.png",
    "revision": "19451d0d985bb442f8307ce8cc8bf550"
  },
  {
    "url": "images/projects/oswald-labs/agastya/settings.png",
    "revision": "60fe3ed1d42b9f6755ca822ed75175c7"
  },
  {
    "url": "images/projects/oswald-labs/agastya/whitelabelled.png",
    "revision": "68ef27c7f85d88660d04c9fdfd583d5b"
  },
  {
    "url": "images/projects/oswald-labs/shravan/cover.png",
    "revision": "314beb3937dc4032411092121c908150"
  },
  {
    "url": "images/projects/oswald-labs/shravan/icon.png",
    "revision": "24e6659a3616d385865783819aa8f891"
  },
  {
    "url": "images/projects/oswald-labs/valmiki/cover.png",
    "revision": "a41cffd3a676ca8540453042ac32ae23"
  },
  {
    "url": "images/projects/oswald-labs/valmiki/homepage.png",
    "revision": "599aaea682149f4c993a1396ef1581e3"
  },
  {
    "url": "images/projects/oswald-labs/valmiki/icon.png",
    "revision": "630064e90143fa92b2b9d7e8323dc3c3"
  },
  {
    "url": "images/projects/oswald-labs/valmiki/preferences.png",
    "revision": "accb98a2c100a0a38444ec4a516291ac"
  },
  {
    "url": "images/projects/pickquick/1.png",
    "revision": "8fd730ef2790010cbc680a960390d82b"
  },
  {
    "url": "images/projects/pickquick/2.png",
    "revision": "789f315d3b8703b441d559f781b488ea"
  },
  {
    "url": "images/projects/pickquick/cover.png",
    "revision": "f1df0340a85020dbabe22559171d159f"
  },
  {
    "url": "images/projects/pickquick/icon.png",
    "revision": "8534edeae5293c5e17636cacf61c5ad0"
  },
  {
    "url": "images/projects/project-blue/1.png",
    "revision": "d0027ee2c08a8d88474f4dda50a392d0"
  },
  {
    "url": "images/projects/project-blue/2.jpg",
    "revision": "cf30e831f7d6719481539f3e7d036b58"
  },
  {
    "url": "images/projects/project-blue/3.jpg",
    "revision": "dfb0cdcdd95b43cfdb1ea69d6a2825dc"
  },
  {
    "url": "images/projects/project-blue/4.jpg",
    "revision": "fa73c181d4b70f94357858c134261aba"
  },
  {
    "url": "images/projects/project-blue/5.jpg",
    "revision": "2cd95dc9033aec2b14ddebb7a4bb95ee"
  },
  {
    "url": "images/projects/project-blue/icon.png",
    "revision": "f46695baeda55815500900755dc5355c"
  },
  {
    "url": "images/projects/project-blue/sketch.jpg",
    "revision": "9c2c5b5d069c08d8d4158e88da2adf57"
  },
  {
    "url": "images/projects/project-blue/sketch2.jpg",
    "revision": "87995f66ea03211e361569d98f6578d0"
  },
  {
    "url": "images/projects/refuserve/1.png",
    "revision": "05a7ee1af0418b63ffcf973ee78fc940"
  },
  {
    "url": "images/projects/refuserve/2.png",
    "revision": "48e4b07e3f1a7c5e0bf0572be4a454e1"
  },
  {
    "url": "images/projects/refuserve/3.png",
    "revision": "0fcce4d3c219ec1d045962e01b9f8236"
  },
  {
    "url": "images/projects/refuserve/icon.png",
    "revision": "d67a52f3365b0f986e4e7deb82f5b094"
  },
  {
    "url": "images/projects/refuserve/slide1.jpg",
    "revision": "1e0217b47060d3a1ad95a470f1410955"
  },
  {
    "url": "images/projects/refuserve/slide2.jpg",
    "revision": "fbb6dd2f0f4c30bf16296e97d59ac4d3"
  },
  {
    "url": "images/projects/saga-music/1.jpg",
    "revision": "9b30596098f822448c7ca62aa286a4c3"
  },
  {
    "url": "images/projects/saga-music/2.jpg",
    "revision": "53fd5f6f25a5a0f12ba984e3af14ae65"
  },
  {
    "url": "images/projects/saga-music/3.jpg",
    "revision": "d1ca583c9ebc5035a2f30d9c9802bbe8"
  },
  {
    "url": "images/projects/saga-music/4.jpg",
    "revision": "39c048d1b290eabf9f42134b42c01308"
  },
  {
    "url": "images/projects/saga-music/5.jpg",
    "revision": "da6ee32ee92641c60fb6b42eeb0dbcaa"
  },
  {
    "url": "images/projects/saga-music/6.jpg",
    "revision": "2ed8c3876e21de6391ccb8876311439e"
  },
  {
    "url": "images/projects/saga-music/7.jpg",
    "revision": "0b6ab1e712ad9ea364e6a97c79d456fd"
  },
  {
    "url": "images/projects/saga-music/8.png",
    "revision": "347472654a0828ab8829a939733103d5"
  },
  {
    "url": "images/projects/saga-music/9.png",
    "revision": "e06645be2c80b50639f16f3deba03dd3"
  },
  {
    "url": "images/projects/saga-music/icon.png",
    "revision": "d45f536fdde532b7fbe8759649db5104"
  },
  {
    "url": "images/projects/scrub/1.png",
    "revision": "a39244bc95ed8dd9e2fd95611f3d6364"
  },
  {
    "url": "images/projects/scrub/2.png",
    "revision": "0a2e7e52bf256df6d8d95b45a5ab6265"
  },
  {
    "url": "images/projects/scrub/3.png",
    "revision": "af5aaf9fcf3f76be5c7886afe99cc9e0"
  },
  {
    "url": "images/projects/scrub/4.png",
    "revision": "a84f864ec6fad333db0ae6925d741429"
  },
  {
    "url": "images/projects/scrub/icon.png",
    "revision": "a5d20895fda2311a69559d6b5bc63c48"
  },
  {
    "url": "images/projects/scrub/image.png",
    "revision": "dc018520a605158f081dfd007164bce4"
  },
  {
    "url": "images/projects/sixteeninches/1.png",
    "revision": "84c940f7be27834baedfccba13351775"
  },
  {
    "url": "images/projects/sixteeninches/2.png",
    "revision": "4e6f599f871cab5a657ce4ff88a6dadd"
  },
  {
    "url": "images/projects/sixteeninches/3.png",
    "revision": "e43e94d080c21683c55b43ea6556c492"
  },
  {
    "url": "images/projects/sixteeninches/icon.png",
    "revision": "9a3e7933813888174c76512024dbf58b"
  },
  {
    "url": "images/projects/staart/icon.png",
    "revision": "633de87f477a7f9fc2846947a7117aa2"
  },
  {
    "url": "images/projects/type-with-tobias/0.png",
    "revision": "b1673557260748b20f138da93180ce1c"
  },
  {
    "url": "images/projects/type-with-tobias/1.png",
    "revision": "b63197cf2276ddf350b03dce7b6b34bf"
  },
  {
    "url": "images/projects/type-with-tobias/2.png",
    "revision": "ec0b1dd4fa2816cd08ad45ba144f0925"
  },
  {
    "url": "images/projects/type-with-tobias/3.png",
    "revision": "9c8347090f9da4731e8c4f9f92a613d9"
  },
  {
    "url": "images/projects/type-with-tobias/4.png",
    "revision": "bca47acf70a41f96f6d9543371abeb16"
  },
  {
    "url": "images/projects/type-with-tobias/5.png",
    "revision": "ca433a35c8ce85e7cac3c488bbb74491"
  },
  {
    "url": "images/projects/type-with-tobias/6.png",
    "revision": "b18df621bfce2b8d905e0043765c57ae"
  },
  {
    "url": "images/projects/type-with-tobias/7.png",
    "revision": "85531027f33263973cbeab8f7e7135b1"
  },
  {
    "url": "images/projects/type-with-tobias/ticket.png",
    "revision": "2ad9894d97f3cd3f427244892950adab"
  },
  {
    "url": "images/projects/unifiers/icon.png",
    "revision": "801228c433f038cbf2fb98936daabaf0"
  },
  {
    "url": "images/projects/wendy/1.png",
    "revision": "6d1d7fea377fcf8d734b161b75691491"
  },
  {
    "url": "images/projects/wendy/2.png",
    "revision": "c83ad08c042342cbca896f69e410df29"
  },
  {
    "url": "images/projects/wendy/3.png",
    "revision": "90bb9fe8d9d017a7c04b41220d7f8ec7"
  },
  {
    "url": "images/projects/wendy/4.png",
    "revision": "3d0910d97fe5c24b9d652f91c80b6ac8"
  },
  {
    "url": "images/projects/wendy/5.png",
    "revision": "02f0bf9beae5d2907a16625db489b62c"
  },
  {
    "url": "images/projects/wendy/6.png",
    "revision": "d5302bb9fa684ee485b12dd5d7d2f473"
  },
  {
    "url": "images/projects/wendy/icon.png",
    "revision": "65b23b8e0d33a68ae464a75f39781c23"
  },
  {
    "url": "images/projects/wendy/slide-1.png",
    "revision": "62df6d2d0eb972e5c4c25aa4270fe889"
  },
  {
    "url": "images/projects/wendy/slide-2.png",
    "revision": "e9e622e4cfe80de6af0403571c0c959f"
  },
  {
    "url": "images/projects/wendy/slide-3.png",
    "revision": "43f8f8b896e0fab0c86ea520919ef0dd"
  },
  {
    "url": "images/projects/wendy/slide-4.png",
    "revision": "252ceec73d06f923035202368d723c9c"
  },
  {
    "url": "images/versions/abacus/blog.png",
    "revision": "dde5132c129ba92038262d64a05a7af1"
  },
  {
    "url": "images/versions/abacus/home.png",
    "revision": "58494686d5cb6664df3ea061164e6287"
  },
  {
    "url": "images/versions/abacus/projects.png",
    "revision": "aa4e897524242264ecf2f6d00610dcac"
  },
  {
    "url": "images/versions/academia/about.png",
    "revision": "0be180f3973db48b0a50e25a9f10ef42"
  },
  {
    "url": "images/versions/academia/home.png",
    "revision": "08aa9e69268a7ccb6ccb8b2d20d2ee96"
  },
  {
    "url": "images/versions/academia/portfolio.png",
    "revision": "a2875db4419298d259cedc1f54c8dbae"
  },
  {
    "url": "images/versions/academia/writing.png",
    "revision": "b2aee203f95446ea9c5503e91a4c4a00"
  },
  {
    "url": "images/versions/access/about.png",
    "revision": "2c3c9eae416fc000a4d72733213f736f"
  },
  {
    "url": "images/versions/access/home-full.png",
    "revision": "38913428849003e9fd63872f9fd9473a"
  },
  {
    "url": "images/versions/access/home.png",
    "revision": "79f0cbf45c5a5b25994bca778b693bf8"
  },
  {
    "url": "images/versions/airbrush/home.png",
    "revision": "eb829da87a5ae6d959464b17a0c839b1"
  },
  {
    "url": "images/versions/altitude/home.png",
    "revision": "b7ed1a0a43d3798b8cab9b53c4c21b8e"
  },
  {
    "url": "images/versions/amsterdam/about.png",
    "revision": "29cda909861034e9fe80a2b79a679499"
  },
  {
    "url": "images/versions/amsterdam/blog.png",
    "revision": "b5d210277df3da8965fe4dd74b375107"
  },
  {
    "url": "images/versions/amsterdam/city.png",
    "revision": "c77dcfdaff58c8e1f2aab7987931a76e"
  },
  {
    "url": "images/versions/amsterdam/contact.png",
    "revision": "57b065212b28c1ec4c503a16cf67b76f"
  },
  {
    "url": "images/versions/amsterdam/events.png",
    "revision": "cd82481bf8774b55d2912c971108e642"
  },
  {
    "url": "images/versions/amsterdam/home.png",
    "revision": "38672c48ab4886e5e1d4c6ab5797a24a"
  },
  {
    "url": "images/versions/amsterdam/life.png",
    "revision": "ead5f0086afaf4abbf279414a5bcc1b5"
  },
  {
    "url": "images/versions/amsterdam/projects.png",
    "revision": "ee39120764ed6e118ea1481a5054ab58"
  },
  {
    "url": "images/versions/amsterdam/travel.png",
    "revision": "381412b6239a964f222cf58abbe8914c"
  },
  {
    "url": "images/versions/amsterdam/videos.png",
    "revision": "a11a1a7a6586b617a2096113ee1f749b"
  },
  {
    "url": "images/versions/arise/about.png",
    "revision": "d79f3a67aa4e5e5588518e40d8a5405b"
  },
  {
    "url": "images/versions/arise/home.png",
    "revision": "a6975f4086c06fc0b361c722aaf2068a"
  },
  {
    "url": "images/versions/arise/photos.png",
    "revision": "c850baff51f661ba705a3a49ee1a66e7"
  },
  {
    "url": "images/versions/arise/writing.png",
    "revision": "66613c0d26a7cc0961ef07f76b4f4ba5"
  },
  {
    "url": "images/versions/artistic/home.png",
    "revision": "185969b973331b72518e4348da518e5f"
  },
  {
    "url": "images/versions/assembly/about.png",
    "revision": "2323ba53bc80ef102dcc5ff1978955d0"
  },
  {
    "url": "images/versions/assembly/home.png",
    "revision": "e98362ffa60ae651bb197be6f6f4684e"
  },
  {
    "url": "images/versions/assembly/press.png",
    "revision": "80a7c1340dc05d26d419c53ca6e01dd9"
  },
  {
    "url": "images/versions/assembly/projects.png",
    "revision": "46d5626759ad555fe967927ceb1ebe8c"
  },
  {
    "url": "images/versions/asterisk/home.png",
    "revision": "46f3649325cba2cdf4c034ebab6ec36c"
  },
  {
    "url": "images/versions/atom/home.png",
    "revision": "99921a9917d7c2019bc46a0f2831a629"
  },
  {
    "url": "images/videos/aristotle.png",
    "revision": "ce72293f1346ecd7cfba20562edbcc13"
  },
  {
    "url": "images/videos/bharathacks.png",
    "revision": "aab9df939f0e4a09cc2a520fc9c8af66"
  },
  {
    "url": "images/videos/going-to-school.png",
    "revision": "dc5c4e7a952c9e1278c15884e1e36031"
  },
  {
    "url": "images/videos/oneup.png",
    "revision": "98a165db0d410c36a9f3c2573b7ea223"
  },
  {
    "url": "images/videos/rtvoost.png",
    "revision": "d0efae5147f3555fff9c628c99d5535b"
  },
  {
    "url": "images/videos/startup-india-rocks.png",
    "revision": "c05e7d5789ce5ebd76b89f9c8595f6ec"
  },
  {
    "url": "images/videos/ut-india.png",
    "revision": "0248464540d7e3cc71fec20ed06583ba"
  },
  {
    "url": "images/videos/wwcode.png",
    "revision": "34ce84f29ea2c651766223bdfc43601b"
  },
  {
    "url": "index.html",
    "revision": "f0eb98a16ce2a13890292eb83cce9cd8"
  },
  {
    "url": "life/index.html",
    "revision": "d0209d9c57fb9483beb85b1314a7c810"
  },
  {
    "url": "life/listening/index.html",
    "revision": "c17cb081004f118b807ed21f6d5cf5eb"
  },
  {
    "url": "life/listening/music/artists/1/index.html",
    "revision": "8805d6d22b1db0bcadf51d6108cf201c"
  },
  {
    "url": "life/listening/music/artists/index.html",
    "revision": "80dc699c43d6f15a6914dbb31066052b"
  },
  {
    "url": "life/listening/music/index.html",
    "revision": "8d9bb6da23d7fa61555a99ea2f80e58d"
  },
  {
    "url": "life/listening/music/songs/1/index.html",
    "revision": "9aeb7e0d6d9e1f75e4a18444f19f4d75"
  },
  {
    "url": "life/listening/music/songs/index.html",
    "revision": "492dc57f1ff4fdfdf919673fd58f2663"
  },
  {
    "url": "life/listening/podcasts/1/index.html",
    "revision": "5186d8b08218d933cdb23a2712018046"
  },
  {
    "url": "life/listening/podcasts/2/index.html",
    "revision": "6561615bcf317ce7f841c4946cab63b9"
  },
  {
    "url": "life/listening/podcasts/3/index.html",
    "revision": "5ca8389fc1f79a559c70acd23c4d5309"
  },
  {
    "url": "life/listening/podcasts/index.html",
    "revision": "60e0cf7a996ce3fe3a4bdd3c8fb747b2"
  },
  {
    "url": "life/reading/1/index.html",
    "revision": "557a05a12b10aea2bb57121e9ff64f8e"
  },
  {
    "url": "life/reading/2/index.html",
    "revision": "85e8b8bebddb77e3446e76bf47951970"
  },
  {
    "url": "life/reading/index.html",
    "revision": "18b86de34e9df3d0529cfa015b41bc23"
  },
  {
    "url": "life/travel/1/index.html",
    "revision": "8b589c72660a211fe057d73b8f6d08ab"
  },
  {
    "url": "life/travel/agra/index.html",
    "revision": "81c89af8345c05f8a754f663c1f9665d"
  },
  {
    "url": "life/travel/boston/index.html",
    "revision": "2c7fa32dea91a2a81e792d04810d1240"
  },
  {
    "url": "life/travel/bruges/index.html",
    "revision": "71a2f92124c3ca39cb943ac5194a8e04"
  },
  {
    "url": "life/travel/cologne/index.html",
    "revision": "6f3c859a8a2e270b22698db1bb70d2f6"
  },
  {
    "url": "life/travel/eindhoven/index.html",
    "revision": "b52643a64cd590f3f7f7d5b95e1c9e00"
  },
  {
    "url": "life/travel/enschede/index.html",
    "revision": "b3a28ef6ba90ea6d63e414ecb2a3b170"
  },
  {
    "url": "life/travel/gurugram/index.html",
    "revision": "dd1d007fb82d329dbd5e42a7776d1cd7"
  },
  {
    "url": "life/travel/hannover/index.html",
    "revision": "0a5325ade9cdb57406f9ce548fb040d0"
  },
  {
    "url": "life/travel/heerlen/index.html",
    "revision": "879a15b04b5740b6c610b90bb37cb69d"
  },
  {
    "url": "life/travel/index.html",
    "revision": "8da6dc5e2d53dc96e720855de26aeaa2"
  },
  {
    "url": "life/travel/kanpur/index.html",
    "revision": "d0adc3fd54a525cb2bb725082608341b"
  },
  {
    "url": "life/travel/kuala-lumpur/index.html",
    "revision": "1d8bdfe365fa7e9a7f86000079a969ae"
  },
  {
    "url": "life/travel/london/index.html",
    "revision": "e57ae177036fa4dc9c2a5294af8376a7"
  },
  {
    "url": "life/travel/los-angeles/index.html",
    "revision": "833a2e377551981666a9e960b29a1602"
  },
  {
    "url": "life/travel/new-delhi/index.html",
    "revision": "d3dbdec57f293d31f0fd4bd3cec1f01a"
  },
  {
    "url": "life/travel/new-york/index.html",
    "revision": "a5e461d92d46a12bf5e9935a46876e0f"
  },
  {
    "url": "life/travel/paris/index.html",
    "revision": "db6d338de055efc8cb7cc06ed0b358f1"
  },
  {
    "url": "life/travel/sf-bay-area/index.html",
    "revision": "bacd31e0a546b23f3008a05c7c2bc090"
  },
  {
    "url": "life/travel/the-hague/index.html",
    "revision": "ffce860afb9defb14d79673a2feb47d1"
  },
  {
    "url": "life/travel/toulouse/index.html",
    "revision": "3cb89a729f76024560d3eabd830cb3b5"
  },
  {
    "url": "life/travel/washington-dc/index.html",
    "revision": "5b6296c9d99ed7e67d7f59b5a7137ed9"
  },
  {
    "url": "life/work/emails/index.html",
    "revision": "dab24dcf6ff4507b94ee011ef27f0123"
  },
  {
    "url": "life/work/index.html",
    "revision": "aa1f26aac8da08ddd95bb2c633504910"
  },
  {
    "url": "life/work/programming/index.html",
    "revision": "26c5c82dcba9d15a4bbf1d98e65b456f"
  },
  {
    "url": "mailing-list/index.html",
    "revision": "615735a39c7438592ace7a6d95ac44d2"
  },
  {
    "url": "mentoring/index.html",
    "revision": "f1d09d7812d17fb583bf68ed343b93fb"
  },
  {
    "url": "mstile-144x144.png",
    "revision": "373228eff6d7a426872d59dbef215038"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "182ee8b9016187e73fdea5b2361b4ad3"
  },
  {
    "url": "mstile-310x150.png",
    "revision": "5ad0f8af9fbc44d7051f1242a94ea338"
  },
  {
    "url": "mstile-310x310.png",
    "revision": "27249a169289ceb87ed5f3b59f08c560"
  },
  {
    "url": "mstile-70x70.png",
    "revision": "a0419495184433bdbb76d3a74f02d9ef"
  },
  {
    "url": "now/index.html",
    "revision": "6a232eaeedb43f519c24dcba30eab827"
  },
  {
    "url": "press/index.html",
    "revision": "b1519c509c8a5e364bdc6d7e98e1cd50"
  },
  {
    "url": "projects/1/index.html",
    "revision": "2fa069ce440d598b50d9a5a1bbf6db7d"
  },
  {
    "url": "projects/2/index.html",
    "revision": "820c7508849d885de18e629d6916264d"
  },
  {
    "url": "projects/3/index.html",
    "revision": "a76101f8697c8ea0c5a6a58b5837e459"
  },
  {
    "url": "projects/ai/index.html",
    "revision": "6fd40db83d69663bef034b8f66451d62"
  },
  {
    "url": "projects/app/index.html",
    "revision": "3cd904b897465f3eda1d84321cfb7f07"
  },
  {
    "url": "projects/aristotle/index.html",
    "revision": "30ecaeb6d20ab52e796bdbd6ff85b765"
  },
  {
    "url": "projects/baymax/index.html",
    "revision": "6adbd8a428ce2b077bff0acb89bb23c7"
  },
  {
    "url": "projects/bharathacks/index.html",
    "revision": "ab61a06c5f94e8045b4cddaf1c46ba96"
  },
  {
    "url": "projects/blueboard/index.html",
    "revision": "2a16a2dce5073e5fb98ce755e3563eb8"
  },
  {
    "url": "projects/branding/index.html",
    "revision": "ba60b542b77d123c20719e4405bc20e4"
  },
  {
    "url": "projects/capella/index.html",
    "revision": "ac368016a8debb1136c3b9a2f418ff08"
  },
  {
    "url": "projects/classrebels/index.html",
    "revision": "9d18c87e2064c72f612c533868f41f13"
  },
  {
    "url": "projects/clshare/index.html",
    "revision": "03d7a408c65d6862402bc0bdb33c8ac9"
  },
  {
    "url": "projects/collaborators/akshat-srivastava/index.html",
    "revision": "3993cb8957e6a8fb927b91b773100ede"
  },
  {
    "url": "projects/collaborators/alex-imbrea/index.html",
    "revision": "12b5af8c4a65bef55183fe9b1f7f9623"
  },
  {
    "url": "projects/collaborators/index.html",
    "revision": "ada3d34b2fdb7b7ad7e5926198410705"
  },
  {
    "url": "projects/collaborators/mahendra-singh-raghuwanshi/index.html",
    "revision": "a62e211b744cbf6dcd8e287cd8a78b66"
  },
  {
    "url": "projects/collaborators/mateo-sadowski/index.html",
    "revision": "23654aa5bb7ff96a71206d1f35aeacb7"
  },
  {
    "url": "projects/collaborators/maurits-van-der-vijgh/index.html",
    "revision": "647c703d1a44eef463ffe056f3bd7670"
  },
  {
    "url": "projects/collaborators/mohit-ahuja/index.html",
    "revision": "bb7b8bafb97f74857f986e21b4164bde"
  },
  {
    "url": "projects/collaborators/nishant-gadihoke/index.html",
    "revision": "16f7123f24f18e935fa9c92b35e32cee"
  },
  {
    "url": "projects/crink-jewel/index.html",
    "revision": "c45264123db86a184d1891202ed0dd2e"
  },
  {
    "url": "projects/csunite/index.html",
    "revision": "4caea273168ccf7f9219ca6bd464c88f"
  },
  {
    "url": "projects/cyankart/index.html",
    "revision": "e0aafb0f12a8fea8a17ea5c83b2cdf57"
  },
  {
    "url": "projects/delhi-government/index.html",
    "revision": "3c9ddb313f17ab99dfc39e1a3c3490ac"
  },
  {
    "url": "projects/drillmaps/index.html",
    "revision": "451c0314d5d13f53c311b3c54ff03b44"
  },
  {
    "url": "projects/event/index.html",
    "revision": "a3347aefdbf99264e382c4aaccc72aa7"
  },
  {
    "url": "projects/facematch/index.html",
    "revision": "81a44323c7db5d4be27afd84b44f9da6"
  },
  {
    "url": "projects/firangana/index.html",
    "revision": "f93e42fc1dc3d05b7add75a0f34548a4"
  },
  {
    "url": "projects/gsmc/index.html",
    "revision": "5e5ccef5bdc27549e18f66b5cab1bb6e"
  },
  {
    "url": "projects/hardware/index.html",
    "revision": "179179381a630d6fb2a94fdf88c3e731"
  },
  {
    "url": "projects/ibm-iot-escape-room/index.html",
    "revision": "df5fdde3fae79584f8a6acfa1d26dba7"
  },
  {
    "url": "projects/index.html",
    "revision": "6654448ea2776e4d17926da1b4981732"
  },
  {
    "url": "projects/industrial-design/index.html",
    "revision": "2fbe139c0d71630e3867e8b4a50b6282"
  },
  {
    "url": "projects/internet.org/index.html",
    "revision": "e6c4d214128cbb3d503c10e969f5363f"
  },
  {
    "url": "projects/iot/index.html",
    "revision": "8e5f2de741f1ef2417c960592c05d89f"
  },
  {
    "url": "projects/justice-adda/index.html",
    "revision": "60717923bfd2ff2676d7d66830b1100b"
  },
  {
    "url": "projects/keeep/index.html",
    "revision": "ba1523abb33dfc3ad08abbd559653ec2"
  },
  {
    "url": "projects/made-with-love-in-india/index.html",
    "revision": "8a27e98f228aa8f3ce6301ca0d2e51ff"
  },
  {
    "url": "projects/melangebox/index.html",
    "revision": "3584f1412b14cdb49e6519d87fa603eb"
  },
  {
    "url": "projects/naari/index.html",
    "revision": "98ccbfe3772507b33720b2abbf16d94d"
  },
  {
    "url": "projects/open-source/index.html",
    "revision": "b3dac0aa360803f1d9ac24cfab9c8f44"
  },
  {
    "url": "projects/open-source/staart/index.html",
    "revision": "b7e6e51ac315acfbc01367dcfb29844f"
  },
  {
    "url": "projects/open-source/uppload/index.html",
    "revision": "6dc640d4fe2ca99258ab57a39bfba599"
  },
  {
    "url": "projects/oswald-labs/agastya/index.html",
    "revision": "05360e53098e072f0dfd17d05ea251ed"
  },
  {
    "url": "projects/oswald-labs/index.html",
    "revision": "0d7018020f316c9c51c6ce66123a55ee"
  },
  {
    "url": "projects/oswald-labs/shravan-apps/index.html",
    "revision": "38bbe27ab9b560cd60cb8529c8b9567c"
  },
  {
    "url": "projects/oswald-labs/valmiki/index.html",
    "revision": "84849101376bc460da00447998e6c57a"
  },
  {
    "url": "projects/pickquick/index.html",
    "revision": "a9134e45ed324106556d1f5ace11eb56"
  },
  {
    "url": "projects/print/index.html",
    "revision": "71f8b7ace383ef4684bcb1a5df46dc4b"
  },
  {
    "url": "projects/project-blue/index.html",
    "revision": "06b656647cc6bf4dfd94fbc06c53d2f1"
  },
  {
    "url": "projects/refuserve/index.html",
    "revision": "c6c6ef664c6206f5213920ed3b20cb09"
  },
  {
    "url": "projects/saga-music/index.html",
    "revision": "85e342c726540e827ac684c702dc03b2"
  },
  {
    "url": "projects/scrub/index.html",
    "revision": "3e392d117dd559b5fca7216de3b4ba6c"
  },
  {
    "url": "projects/sixteeninches/index.html",
    "revision": "6ec637ad3aee85c84440756e40815451"
  },
  {
    "url": "projects/stack/c++/index.html",
    "revision": "957665932c9991cb87422a62f7519d49"
  },
  {
    "url": "projects/stack/index.html",
    "revision": "4428b7d2fffd686fe65238a81fb23662"
  },
  {
    "url": "projects/stack/java/index.html",
    "revision": "3c7b0cb9358749a1c1b512d3a1e7a0b2"
  },
  {
    "url": "projects/stack/javascript/index.html",
    "revision": "e9d6312a63575f5b2cfda31d11b91239"
  },
  {
    "url": "projects/stack/php/index.html",
    "revision": "9eeffddd798d2ea49e2b188034b82f69"
  },
  {
    "url": "projects/stack/python/index.html",
    "revision": "46ccf730c61fcf32aa0f71d655ab7ef4"
  },
  {
    "url": "projects/stack/typescript/index.html",
    "revision": "871662d51f14e1338c8dc3afbfa3b666"
  },
  {
    "url": "projects/startup/index.html",
    "revision": "b1fe8eb2840ae7d2cd5d7d370d62561e"
  },
  {
    "url": "projects/tools/1/index.html",
    "revision": "2d81060138ce64d0bf16fe6efccb05be"
  },
  {
    "url": "projects/tools/android/index.html",
    "revision": "90cb18d3cc9061e4932a28501ab43dbc"
  },
  {
    "url": "projects/tools/arduino/index.html",
    "revision": "4e7433e02060ebca247ad41d56542ca4"
  },
  {
    "url": "projects/tools/firebase/index.html",
    "revision": "2d214fca1f1e8eafd711d8e055aa8416"
  },
  {
    "url": "projects/tools/illustrator/index.html",
    "revision": "a8cfa6dfa362b1c7987f36b107d8e0db"
  },
  {
    "url": "projects/tools/indesign/index.html",
    "revision": "66b5ec0386b698c51ba4c4af47362921"
  },
  {
    "url": "projects/tools/index.html",
    "revision": "33f6a4b220bb88c947ad4a318e83c58d"
  },
  {
    "url": "projects/tools/node.js/index.html",
    "revision": "52d36228a0d9382ac8ee2d5b60a98068"
  },
  {
    "url": "projects/tools/photoshop/index.html",
    "revision": "b8150760177345d1c042ffb18320899a"
  },
  {
    "url": "projects/tools/processing/index.html",
    "revision": "2163827ebab1f3029ec3aa3b5644cf1a"
  },
  {
    "url": "projects/tools/shopify/index.html",
    "revision": "7341088a1dd72e4fcc34cc31e4fe3193"
  },
  {
    "url": "projects/tools/sketch/index.html",
    "revision": "0afdc02e51abeb198e435c21194b216e"
  },
  {
    "url": "projects/tools/vue.js/index.html",
    "revision": "45766c1d36d28832752570136a7c9737"
  },
  {
    "url": "projects/tools/woocommerce/index.html",
    "revision": "67969f308c07db5e3606f2c3563a1ee7"
  },
  {
    "url": "projects/tools/wordpress/index.html",
    "revision": "473074571e2caaac987eb44f537bdf88"
  },
  {
    "url": "projects/type-with-tobias/index.html",
    "revision": "b99e21dc2a16ce6b5c76a960d2e0d2e4"
  },
  {
    "url": "projects/unifiers/index.html",
    "revision": "be9e602086e0c2835dd649a2f4767d33"
  },
  {
    "url": "projects/web/index.html",
    "revision": "41325edd091a7cd751b91c664a086566"
  },
  {
    "url": "projects/wendy/index.html",
    "revision": "3ae3e237d03cc974014afd2d60f43817"
  },
  {
    "url": "safari-pinned-tab.svg",
    "revision": "f7e738728c38dc61de33f0a27329a003"
  },
  {
    "url": "sitemap/index.html",
    "revision": "db67f61d302c4035ff1f816bdb5a3ca7"
  },
  {
    "url": "timeless/index.html",
    "revision": "065a48a353ab13845e7a1d2fa5bf707d"
  },
  {
    "url": "videos/index.html",
    "revision": "ce1971167859740b8e1da1c98e6a3606"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
