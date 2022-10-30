import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Form from "../../Components/Form";
import ListCategories from "../../Components/ListCategories";

export default function categoryPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { category } = router.query;

  if (!session) {
    router.push("/");
    return <>Loading...</>;
  }
  if (!session.user) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="content">
        <div>Category: {category}</div>

        <div>
          <Form type={category} user={session.user.email} />
        </div>

        <ListCategories session={session} type={category} />
      </div>
    </>
  );
}