export function Breadcrumbs({
  items,
  ...props
}: {
  items: { title: string; href: string }[];
  class?: string;
}) {
  return (
    <nav {...props}>
      <ol
        class="flex flex-wrap breadcrumbs -mb-3"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          class="hidden"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <a itemProp="item" href="/">
            <span itemProp="name">Anand Chowdhary</span>
            <meta itemProp="position" content="1" />
          </a>
        </li>
        {items.map((item, index) => (
          <li
            key={item.href}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            hidden={index === items.length - 1}
          >
            <a itemProp="item" href={item.href}>
              <span itemProp="name">{item.title}</span>
              <meta itemProp="position" content={(index + 2).toString()} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
