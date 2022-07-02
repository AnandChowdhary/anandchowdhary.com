/** @jsx h */
import { h } from "preact";

function replaceJSX(str: string, find: string, replace: any): any[] {
  const parts = str.split(find);
  const result = [];
  for (let i = 0; i < parts.length; i++) {
    result.push(parts[i]);
    if (i < parts.length - 1) result.push(replace);
  }
  return result;
}

export const t = (
  copy: string,
  data?: Record<string, any>,
  components?: any[]
) => {
  if (data)
    Object.entries(data).forEach(([key, value]) => {
      copy = copy.replace(`{{${key}}}`, value);
    });
  const tags = copy.match(/\<[0-9]*\>/g) ?? [];
  let result = [copy];
  if (components)
    tags.forEach((tag, index) => {
      const contents = copy.split(tag)[1].split("<")[0];
      if (components[index]) {
        result = result
          .map((item) => {
            if (typeof item !== "string" || !item.includes(tag)) return item;
            return replaceJSX(
              item,
              `${tag}${item.split(tag)[1].split("<")[0]}${tag.replace(
                "<",
                "</"
              )}`,
              components[index]({ children: contents })
            );
          })
          .flat();
      }
    });
  return result;
};
