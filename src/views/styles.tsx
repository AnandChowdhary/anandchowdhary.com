export const proseClassNameWithoutImages =
  "prose dark:prose-invert prose-headings:font-medium prose-a:transition-colors prose-a:focus-visible:outline-none prose-a:focus-visible:ring-2 prose-a:focus-visible:ring-offset-2 prose-a:focus-visible:ring-neutral-300 prose-a:dark:focus-visible:ring-neutral-700 prose-a:rounded";

export const proseClassNameWithoutLead = `${proseClassNameWithoutImages} prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-neutral-200 dark:prose-img:border-neutral-800 [&_p:has(img)]:lg:grid [&_p:has(img)]:lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] [&_p:has(img)]:lg:gap-6 [&_p:has(img)]:lg:-mx-32 [&_p:has(img)]:lg:my-12 [&_p:has(img)_img]:lg:m-0 [&_p:has(img)_img]:lg:w-full`;

export const proseClassName = `${proseClassNameWithoutLead} prose-p:first-of-type:text-lg`;
