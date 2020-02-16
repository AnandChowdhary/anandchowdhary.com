const { getCityEmojiTitle } = require("./cities");

const getEventCard = (post, h3 = false) =>
  `<article itemscope itemtype="http://schema.org/Event">
    <a itemprop="url" href="${post.url}">
      <div class="f">
        <img alt="" itemprop="thumbnailUrl" src="${post.data.icon}">
        <div class="ff">
          <${h3 ? "h3" : "h2"} itemprop="name">${post.data.title}</${
    h3 ? "h3" : "h2"
  }>
          <meta itemprop="startDate" content="${post.data.date}" />
          <div itemprop="location" itemscope itemtype="http://schema.org/Place">
            <div class="f">
              <div itemprop="name">${post.data.venue}</div>
              <div><time>${post.data.date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}</time></div>
            </div>
            <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
              <span itemprop="addressLocality">${getCityEmojiTitle(
                post.data.places
              )}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
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
