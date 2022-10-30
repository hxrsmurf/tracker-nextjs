import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Form from "../../Components/Form";

export default function categoryPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { category } = router.query;

  if (!session.user) return <>Loading...</>;

  return (
    <>
      <div>Category: {category}</div>

      <div>
        <Form type={category} user={session.user.email} />
      </div>
    </>
  );
}