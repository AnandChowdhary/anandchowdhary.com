/** @jsx h */
import { h, Fragment, FunctionComponent } from "preact";

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
    </Fragment>
  );
};
