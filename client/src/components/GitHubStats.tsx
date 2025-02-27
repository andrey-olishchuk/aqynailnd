import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon, GitForkIcon, EyeIcon } from "lucide-react";

const stats = {
  stars: 1200,
  forks: 180,
  watchers: 50
};

export default function GitHubStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:gap-8 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stars</CardTitle>
          <StarIcon className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.stars}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Forks</CardTitle>
          <GitForkIcon className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.forks}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Watchers</CardTitle>
          <EyeIcon className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.watchers}</div>
        </CardContent>
      </Card>
    </div>
  );
}
