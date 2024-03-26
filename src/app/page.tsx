import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="m-10">
      <Link href="/dashboard/">Dashboard</Link>
      <Link href="/admin/">Admin</Link>
    </main>
  );
}
