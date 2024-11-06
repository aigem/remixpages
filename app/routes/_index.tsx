import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "RemixPages" },
    { name: "description", content: "Welcome to RemixPages!" },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to RemixPages</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Get started by editing app/routes/_index.tsx
      </p>
    </div>
  );
}
