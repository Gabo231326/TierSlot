export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    app: "TierSlot",
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    branch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
    repo: process.env.VERCEL_GIT_REPO_SLUG ?? null,
  });
}
