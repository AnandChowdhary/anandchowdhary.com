import { Fragment } from "preact";

export const Icons = () => {
  return (
    <Fragment>
      <svg style="display: none">
        <defs>
          <symbol id="book-open" viewBox="0 0 48 48">
            <path
              d="M7 13.5a9.3 9.3 0 0 0-5.6-3 1 1 0 0 1-.9-1v-8A1 1 0 0 1 .8.7a1 1 0 0 1 .8-.2 9.3 9.3 0 0 1 5.4 3Z"
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              transform="scale(3.42857)"
            />
            <path
              d="M7 13.5a9.3 9.3 0 0 1 5.6-3 1 1 0 0 0 .9-1v-8a1 1 0 0 0-.3-.8 1 1 0 0 0-.8-.2 9.3 9.3 0 0 0-5.4 3Z"
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              transform="scale(3.42857)"
            />
          </symbol>
        </defs>
        <use href="#book-open" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="browser-build" viewBox="0 0 48 48">
            <path
              d="M13.5 7.5v5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h4v7ZM.5 3.5h13M10 7.5v-7"
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              transform="scale(3.42857)"
            />
          </symbol>
        </defs>
        <use href="#browser-build" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="pabio" viewBox="0 0 900 256">
            <path
              d="M0 11v241h55v-82h45c56 0 81-39 81-79s-25-80-81-80H0zm55 111V59h42c21 0 29 16 29 32 0 15-8 31-29 31H55zm270-14a65 65 0 00-52-23c-46 0-78 34-78 85s32 86 78 86c20 0 40-9 52-25v21h51V89h-51v19zm-40 100c-22 0-38-18-38-38 0-21 16-38 38-38 21 0 38 17 38 38 0 20-17 38-38 38zM522 85c-16 0-38 6-50 22V0h-52v252h52v-18c12 15 34 22 50 22 41 0 80-33 80-86s-39-85-80-85zm-10 123c-20 0-38-17-38-38s18-38 38-38 37 17 37 38-17 38-37 38zM662 64c18 0 32-13 32-30S680 4 662 4c-17 0-32 13-32 30s15 30 32 30zm26 188V89h-52v163h52zm123 4c47 0 89-34 89-86 0-51-42-85-89-85s-89 34-89 85c0 52 42 86 89 86zm0-48c-20 0-36-15-36-38 0-22 16-38 36-38s36 16 36 38c0 23-16 38-36 38z"
              fill="#ff6b6b"
            />
          </symbol>
        </defs>
        <use href="#pabio" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="oswald-labs" viewBox="0 0 116 116">
            <g fill="#007bff" fill-rule="evenodd">
              <path d="M58 116A58 58 0 1 1 58 0a58 58 0 0 1 0 116zm1-11a47 47 0 1 0 0-95 47 47 0 0 0 0 95z" />
              <circle cx="58.5" cy="57.5" r="35.5" />
            </g>
          </symbol>
        </defs>
        <use href="#oswald-labs" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="melangebox" viewBox="0 0 350 350">
            <path
              style="opacity: 0.948"
              fill="#4c9bd8"
              d="M350 76v3l-41 20-102-47-1 1 28 37a16655 16655 0 0 1-28 14l-51-9-1 1-32-5 102 49-1 3-47 24A20730 20730 0 0 1 0 80v-3l59-25c35 6 69 12 104 16a1028 1028 0 0 1-31-47 1468 1468 0 0 0 52-20l166 75Z"
            />
            <path
              style="opacity: 0.983"
              fill="#374a5d"
              d="M0 99c56 27 112 54 168 83l1 168h-4c-55-29-110-56-165-82V99ZM350 99v169c-56 26-111 53-165 82h-4c-1-57 0-113 1-168 55-29 111-56 168-83Z"
            />
          </symbol>
        </defs>
        <use href="#melangebox" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="class-rebels" viewBox="0 0 256 256">
            <path
              style="fill-rule: evenodd"
              fill="#00c3a0"
              d="M87 0h86c-3 8-6 15-11 22l-26 1v66c16-8 33-13 51-15 16-3 32 0 47 8 6 7 11 16 13 26v30l-7 31c-4 8-8 16-13 22-12 7-24 7-36 0v1l27 31 1 33h-4l-67-85c4-7 9-12 15-16l14 8c33 18 46 8 39-29-5-29-22-40-50-35-11 3-21 7-30 12l-1 127c-8 5-14 11-20 18h-3l-1-90c-18 15-37 26-59 34-25 6-39-3-44-27v-42c6-35 26-53 60-54 15 0 29 3 43 9l1-63H75l2-7L87 0ZM70 102c14-1 28 1 42 5l-1 39c-16 13-34 23-53 30-18 5-27-1-27-18 0-14 3-28 10-42 8-9 17-14 29-14Z"
            />
          </symbol>
        </defs>
        <use href="#class-rebels" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="pickquick" viewBox="0 0 492 202">
            <circle cx="101" cy="101" r="101" fill="#bcd878" />
            <circle cx="246" cy="101" r="101" fill="#e17359" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M174 172a101 101 0 0 0 0-141 101 101 0 0 0 0 141Z"
              fill="#cba567"
            />
            <circle cx="391" cy="101" r="101" fill="#8fcae2" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M319 172a101 101 0 0 0 0-141 101 101 0 0 0 0 141Z"
              fill="#b39d9c"
            />
          </symbol>
        </defs>
        <use href="#pickquick" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="plane" viewBox="0 0 48 48">
            <path
              d="M3.4 10.6H1.9a1.4 1.4 0 0 1 0-2.9h2.3l1.5-1.5-4-2.5A1.4 1.4 0 0 1 1 1.8a1.5 1.5 0 0 1 2-.7l5.3 2.4L11 1A1.4 1.4 0 0 1 13 3l-2.5 2.6 2.4 5.3a1.5 1.5 0 0 1-.7 2 1.4 1.4 0 0 1-2-.6l-2.4-4-1.5 1.5V12a1.4 1.4 0 0 1-3 0Z"
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              transform="scale(3.42857)"
            />
          </symbol>
        </defs>
        <use href="#plane" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="css-tricks" viewBox="0 0 359 383">
            <path
              d="m155 236-87 63c-11 7-19 12-29 12-21 0-39-18-39-39 0-18 14-30 27-36l102-44-102-46c-14-6-27-18-27-36 0-21 19-38 40-38 10 0 17 3 28 12l87 63-12-103c-3-24 13-44 37-44 23 0 39 19 36 43l-12 104 87-63c11-8 19-12 29-12 21 0 39 17 39 38 0 19-13 30-27 36l-103 46 103 44c14 5 27 18 27 37 0 21-19 38-40 38-9 0-17-5-28-12l-87-63 12 103c3 24-13 44-36 44-24 0-40-19-37-43l12-104Z"
              fill="currentColor"
            />
          </symbol>
        </defs>
        <use href="#css-tricks" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="podium" viewBox="0 0 48 48">
            <path
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              d="M5 8.5H2l-1-5h12l-1 5H9M7 3.5v-3M5 6.5v7M9 6.5v7M4 13.5h6M2.5 3.5s0-3 2-3M11.5 3.5s0-3-2-3"
              transform="scale(3.42857)"
            />
          </symbol>
        </defs>
        <use href="#podium" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="video" viewBox="0 0 48 48">
            <g transform="scale(3.42857)">
              <rect
                x=".5"
                y=".5"
                width="13"
                height="13"
                rx="1"
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
              />
              <path
                d="M5.5 10.6V6.7a.4.4 0 0 1 .5-.3l3.3 2a.4.4 0 0 1 0 .6L6 10.9a.4.4 0 0 1-.5-.3ZM.5 4h13M4 4 5.5.5M8.5 4 10 .5"
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
              />
            </g>
          </symbol>
        </defs>
        <use href="#video" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="alarm" viewBox="0 0 48 48">
            <g transform="scale(3.42857)">
              <circle
                cx="7"
                cy="8"
                r="5.5"
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
              />
              <path
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
                d="M5.5.5h3M7 .5v2M5.5 6 7 8h2.5M12 2l1 1M2 2 1 3"
              />
            </g>
          </symbol>
        </defs>
        <use href="#alarm" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="youtube" viewBox="0 0 48 48">
            <g transform="scale(3.42857)">
              <rect
                x=".5"
                y="2"
                width="13"
                height="10"
                rx="2"
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
              />
              <path
                d="M5.3 9.3V5.1a.4.4 0 0 1 .6-.3l3.6 2a.4.4 0 0 1 0 .8L6 9.6a.4.4 0 0 1-.6-.3Z"
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
              />
            </g>
          </symbol>
        </defs>
        <use href="#youtube" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="video-camera" viewBox="0 0 48 48">
            <g transform="scale(3.42857)">
              <circle
                cx="3.5"
                cy="3.5"
                r="3"
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
              />
              <circle
                cx="10.5"
                cy="4.5"
                r="2"
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
              />
              <rect
                x="3.5"
                y="9"
                width="7.5"
                height="4.5"
                rx="1"
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
              />
              <path
                style="
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
          "
                d="M13.5 10v2.5"
              />
            </g>
          </symbol>
        </defs>
        <use href="#video-camera" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="newspaper" viewBox="0 0 48 48">
            <path
              d="M13.5 4.5V11a1.3 1.3 0 0 1-1.3 1.3h0A1.3 1.3 0 0 1 11 11h0V2.2a.5.5 0 0 0-.5-.5H1a.5.5 0 0 0-.5.6v9a1 1 0 0 0 1 1h10.8"
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              transform="scale(3.42857)"
            />
            <path
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              d="M3.5 4.3H8v2.5H3.5zM3.5 9.8H8"
              transform="scale(3.42857)"
            />
          </symbol>
        </defs>
        <use href="#newspaper" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="award" viewBox="0 0 48 48">
            <path
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              d="M7 8.5v5M4.5 13.5h5M3.5 5.5a3 3 0 0 1-3-3v-1H4v4ZM10.5 5.5a3 3 0 0 0 3-3v-1H10v4Z"
              transform="scale(3.42857)"
            />
            <path
              d="M10 5.5a3 3 0 0 1-6 0v-5h6Z"
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              transform="scale(3.42857)"
            />
          </symbol>
        </defs>
        <use href="#award" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="microphone" viewBox="0 0 48 48">
            <path
              d="M9.5 6.5a2.5 2.5 0 0 1-5 0V3a2.5 2.5 0 0 1 5 0Z"
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              transform="scale(3.42857)"
            />
            <path
              d="M12 7h0a4.5 4.5 0 0 1-4.5 4.5h-1A4.5 4.5 0 0 1 2 7h0M7 11.5v2"
              style="
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
              transform="scale(3.42857)"
            />
          </symbol>
        </defs>
        <use href="#microphone" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol
            id="chevron"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </symbol>
        </defs>
        <use href="#chevron" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="forks" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
            ></path>
          </symbol>
        </defs>
        <use href="#forks" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="star" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            ></path>
          </symbol>
        </defs>
        <use href="#star" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="watchers" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"
            ></path>
          </symbol>
        </defs>
        <use href="#watchers" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="circle" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </symbol>
        </defs>
        <use href="#circle" />
      </svg>

      <svg style="display: none">
        <defs>
          <symbol id="triangle" viewBox="0 0 68 78">
            <path
              d="M68 39 .499996 77.9711.5.0288552 68 39Z"
              fill="currentColor"
            />
          </symbol>
        </defs>
        <use href="#triangle" />
      </svg>
    </Fragment>
  );
};

export function InfoCircleOutline(props: { class?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path
        d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M220 220h32v116"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="32"
        d="M208 340h88"
      />
      <path
        fill="currentColor"
        d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"
      />
    </svg>
  );
}

export function Location(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

export function Calendar(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
}

export function GitHub(props: { class?: string }) {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-140, -7559)" fill="currentColor">
          <g transform="translate(56, 160)">
            <path
              d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
              id="github-[#142]"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function LinkedIn(props: { class?: string }) {
  return (
    <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-376, -267)">
          <g transform="translate(376, 267)">
            <path
              d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
              fill="currentColor"
            ></path>
            <path
              d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
              fill="#FFFFFF"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function Twitter(props: { class?: string }) {
  return (
    <svg viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-60, -7521)" fill="currentColor">
          <g transform="translate(56, 160)">
            <path
              d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"
              id="twitter-[#154]"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function Instagram(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
    </svg>
  );
}
