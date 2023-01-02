import { imageUrl } from "../../utils/urls.ts";

export function About() {
  return (
    <section class="bg-white mt-8 p-8 rounded shadow-sm grid grid-cols-6 gap-8">
      <div>
        <img
          alt="Illustrated portrait of Anand"
          src={imageUrl("https://anandchowdhary.com/anand.png", {
            w: "245",
            h: "245",
          })}
          srcSet={`${imageUrl("https://anandchowdhary.com/anand.png", {
            w: "245",
            h: "245",
          })} 1x, ${imageUrl("https://anandchowdhary.com/anand.png", {
            w: "490",
            h: "490",
          })} 2x`}
          class="object-contain object-bottom w-full"
          width={198}
          height={198}
        />
      </div>
      <div class="col-span-5">
        <h2 class="uppercase text-xs font-medium text-gray-500 mb-1">
          About the author
        </h2>
        <address class="font-medium text-xl not-italic mb-2">
          Anand Chowdhary
        </address>
        <p class="text-gray-500 mb-2">
          Anand Chowdhary is a creative technologist and entrepreneur. He is the
          co-founder and CTO of Pabio, an interior design and rent-to-own
          furniture company funded by Y Combinator. He lives in Groningen, the
          Netherlands.
        </p>
        <a href="/about">Read more about Anand &rarr;</a>
      </div>
    </section>
  );
}
