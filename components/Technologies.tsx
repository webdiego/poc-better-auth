import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const technologies = [
  {
    name: "Better Auth",
    logo: "https://www.better-auth.com/_next/static/media/better-auth-logo-light.4b03f444.png",
  },
  {
    name: "Next.js",
    logo: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67",
  },
  {
    name: "Drizzle ORM",
    logo: "https://avatars.githubusercontent.com/u/108468352?v=4",
  },
  {
    name: "Turso",
    logo: "https://avatars.githubusercontent.com/u/139391156?s=200&v=4",
  },
  {
    name: "Resend",
    logo: "https://avatars.githubusercontent.com/u/109384852?s=200&v=4",
  },
  {
    name: "shadcn/ui",
    logo: "https://ui.shadcn.com/apple-touch-icon.png",
  },
];

export default function Technologies() {
  return (
    <div className="flex items-center justify-center gap-5 mt-5">
      {technologies.map((tech) => (
        <Tooltip key={tech.name}>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarImage src={tech.logo} alt={tech.name} />
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tech.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
