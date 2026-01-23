"use client";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";
import type { Post } from "@/types";

dayjs.extend(localizedFormat);

type Props = Omit<Post, "content">;

export const PostPreview = ({ title, date, excerpt, slug }: Props) => {
  return (
    <article className="flex flex-col gap-2 sm:flex-row sm:gap-8">
      <div>
        <div className="w-48 pt-1 text-muted-foreground sm:text-right">
          <time dateTime={date}>{dayjs(date).format("LL")}</time>
        </div>
      </div>
      <div className="grow">
        <h3 className="mb-3 font-bold text-lg tracking-tight">
          <Link
            as={`/blog/${slug}`}
            href="/blog/[slug]"
            className="hover:text-indigo-600 hover:underline"
          >
            {title}
          </Link>
        </h3>
        <p className="mb-4 text-gray-600 text-lg leading-relaxed">{excerpt}</p>
      </div>
    </article>
  );
};
