import { Fragment } from "preact";

export function Socials() {
  return (
    <Fragment>
      <a
        className="p-1 transition rounded-lg hover:bg-rose-100 hover:text-rose-700"
        href="https://twitter.com/AnandChowdhary"
      >
        <span className="sr-only">Twitter</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5"
        >
          <path
            d="M4 9a7 7 0 0 1-2 2 1 1 0 0 0 0 1c7 2 11-2 10-7l1-2h-1c-2-2-6-2-5 2 0 0-2 1-5-2a1 1 0 0 0-1 0 6 6 0 0 0 3 6Z"
            style="
                  fill: none;
                  stroke: currentColor;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
            transform="scale(3.42857)"
          ></path>
        </svg>
      </a>
      <a
        className="p-1 transition rounded-lg hover:bg-rose-100 hover:text-rose-700"
        href="https://www.linkedin.com/in/AnandChowdhary"
      >
        <span className="sr-only">LinkedIn</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5"
        >
          <path
            d="M3.5 1.7a1.3 1.3 0 0 1-1.3 1.4A1.4 1.4 0 0 1 1 1.6 1.3 1.3 0 0 1 2.2.4a1.3 1.3 0 0 1 1.3 1.3ZM1.1 5.4c0-.7.5-.6 1.1-.6s1.2-.1 1.2.6V13c0 .8-.5.6-1.2.6s-1.1.2-1.1-.6ZM5.4 5.4c0-.4.2-.6.4-.6h1.4c.3 0 .5.5.5.9a2.5 2.5 0 0 1 2.2-1 3 3 0 0 1 3.2 3V13c0 .8-.5.6-1.2.6s-1.2.2-1.2-.6v-4a1.4 1.4 0 0 0-1.5-1.6A1.4 1.4 0 0 0 7.8 9v4c0 .8-.5.6-1.2.6s-1.2.2-1.2-.6Z"
            style="
                  fill: none;
                  stroke: currentColor;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
            transform="scale(3.42857)"
          ></path>
        </svg>
      </a>
    </Fragment>
  );
}
