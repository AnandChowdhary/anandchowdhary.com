# Screen-reader review

Browser semantics and keyboard behavior can be checked in CI. Spoken output
requires a real assistive-technology session; this work does not claim one.
Use VoiceOver with Safari on macOS for the next manual review (Command-F5).

1. On Home, Tab to Skip to content and activate it. Confirm focus enters main;
   use the rotor to find the single main landmark and page heading.
2. On Search, find the named search input and category selector. Enter “agents”.
   Confirm the polite status announces the count without reading every result
   or moving focus. Arrow Down enters the first result; Escape in the input
   clears the query. Test empty results and offline index-load failure/retry.
3. On a long article, open On this page and activate an anchor. Confirm the
   destination heading is discoverable. The named reading progress indicator
   must not continuously interrupt speech while scrolling. Test without JS too.
4. On Life, confirm the contributions chart has a summary name including the
   total. Follow View activity on GitHub for the detailed activity. Read latest
   record dates and page refresh separately; a refresh does not imply new data.
5. On Food, Tab into daily records and confirm calorie/macronutrient/date labels
   are available. Check tooltip visibility at mobile width without losing focus.
6. On an illustrated article, open an image with the keyboard, confirm the
   dialog name, close with Escape, and confirm focus returns to that image.

Record OS/browser/screen-reader versions, route, action, expected and actual
speech, and any focus problem. Automated axe passes do not certify conformance.
