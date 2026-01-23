import { PostPreview } from "@/app/[locale]/(main)/blog/post-preview";
import { getAllPosts } from "@/lib/api";

export default function Page() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return (
    <section className="space-y-12">
      <header className="sm:p-6">
        <h1 className="font-bold text-4xl tracking-tight">Recent Posts</h1>
      </header>
      <div className="mb-16 grid grid-cols-1 gap-8">
        allposts
        {allPosts.map((post) => {
          console.log("Slug - ", post.slug);

          return (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          );
        })}
      </div>
    </section>
  );
}
