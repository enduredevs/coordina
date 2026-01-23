import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostHeader from "@/app/[locale]/(main)/blog/components/post-header";
import { getPostBySlug } from "@/lib/api";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "excerpt",
    "content",
  ]);

  return (
    <div>
      <nav className="mb-2">
        <Link
          className="inline-flex items-center gap-x-2 font-medium text-muted-foreground text-sm hover:text-primary"
          href="/blog"
        >
          <ArrowLeftIcon className="size-4" /> All Posts
        </Link>
      </nav>
      <article className="space-y-8">
        <PostHeader title={post.title} date={post.date} />
        <div className="blog-content">
          <MDXRemote source={post.content} />
        </div>
        {/* <div className="mt-8 flex items-center gap-x-4">
          <Image
            src="/static/images/luke-vella.jpg"
            width={48}
            height={48}
            className="rounded-full"
            alt="Luke Vella"
          />
          <div>
            <div className="font-medium leading-none">Luke Vella</div>
            <div>
              <Link
                className="text-muted-foreground text-sm hover:text-primary"
                href="https://twitter.com/imlukevella"
              >
                @imlukevella
              </Link>
            </div>
          </div>
        </div> */}
      </article>
    </div>
  );
}

export const dynamicParams = false;
