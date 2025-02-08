import React, { memo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type BreadcrumbsProps = {
  items: {
    title: string;
    classStyle: string;
    url: string;
    urlTitle: string;
  }[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = memo(({ items }) => {
  return (
    <Breadcrumb>
      {items.length > 0 &&
        items.map((item) => {
          return (
            <BreadcrumbList key={item.title}>
              <BreadcrumbItem className={item.classStyle}>
                {item.url !== undefined && (
                  <BreadcrumbLink
                    href={item.urlTitle}
                    className="hover:underline underline-offset-2 basic-transition"
                  >
                    {item.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className={item.classStyle} />
              <BreadcrumbItem>
                <BreadcrumbPage>{item.urlTitle ?? item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          );
        })}
    </Breadcrumb>
  );
});

export default Breadcrumbs;
