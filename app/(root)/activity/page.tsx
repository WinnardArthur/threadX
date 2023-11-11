import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Get Activities or Notifications
  const activity = await getActivity({ userId: userInfo._id });
  return (
    <section>
      <h1 className="head-text mt-10 search">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.reverse().map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <div className="relative h-[2rem] w-[2rem]">
                    <Image
                      src={activity.author.image}
                      alt="Profile pic"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-light-3 !text-base-regular">No activity yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
