const { getCityEmojiTitle } = require("./cities");

const getEventCard = (post, h3 = false) =>
  `<article class="events-item">
    <div class="content">
    <${h3 ? "h3" : "h2"}>
      <a href="${post.url}">
        <img class="item-icon" alt="" src="${post.data.icon}"><span>${
    post.data.title
  }</span>
      </a>
    </${h3 ? "h3" : "h2"}>
    <div class="location">
      <div>${post.data.venue}</div>
      <div><a href="/life/travel/${post.data.places}">${getCityEmojiTitle(
    post.data.places
  )}</a></div>
    </div>
    <div class="meta">
      <div>
        <a href="${post.url}">
          <time>${post.data.date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}</time>
        </a>
      </div>
      <div><a class="continue" href="${
        post.url
      }">Continue reading &rarr;</a></div>
    </div>
    </div>
  </article>`;

const getProjectCard = project =>
  `<article class="project-item">
    <a href="${project.url}">
      <div aria-hidden="true" class="project-image project-image-${
        project.data.style
      }" style="background-color: ${project.data.bg}">
        <div
          class="project-image-front"
          style="background-image: url('${project.data.img_src}.${
    project.data.img_type
  }')"
        ></div>
      </div>
      <div>
        ${
          project.data.icon
            ? `
        <div class="project-item-icon${
          project.data.icon_bg ? " project-item-icon-box" : ""
        }">
          <img alt="" src="${project.data.icon}">
        </div>
        `
            : ""
        }
        <h2>${project.data.title}</h2>
        <time>${project.data.date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric"
        })}</time>
      </div>
      <p>${project.data.intro}</p>
      <div class="project-tags">
        ${
          project.data.work
            ? `
          ${project.data.work.map(tag => `<span>${tag}</span>`).join("")}
        `
            : ""
        }
        ${
          project.data.stack
            ? `
          ${project.data.stack
            .map(tag => `<span class="stack">${tag}</span>`)
            .join("")}
        `
            : ""
        }
        ${
          project.data.tools
            ? `
          ${project.data.tools
            .map(tag => `<span class="tools">${tag}</span>`)
            .join("")}
        `
            : ""
        }
      </div>
    </a>
  </article>`;

module.exports = { getEventCard, getProjectCard };
