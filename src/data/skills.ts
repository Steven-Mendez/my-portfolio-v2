/**
 * The stack, grouped. Ported from `../v2/lib/data.ts` `skills.categories`.
 */
import type { Localized } from "./localized"

export interface StackTool {
  name: string
}

export interface StackGroup {
  label: Localized<string>
  items: readonly StackTool[]
}

export const stack: readonly StackGroup[] = [
  {
    label: { en: "Languages", es: "Lenguajes" },
    items: [
      { name: "Python" },
      { name: "TypeScript" },
      { name: "C#" },
      { name: "SQL" },
    ],
  },
  {
    label: { en: "Backend & data", es: "Backend y datos" },
    items: [
      { name: "FastAPI" },
      { name: "Django" },
      { name: "Flask" },
      { name: "ASP.NET / .NET" },
      { name: "PostgreSQL" },
      { name: "SQL Server" },
      { name: "Redis" },
      { name: "Data pipelines" },
    ],
  },
  {
    label: { en: "Frontend", es: "Frontend" },
    items: [{ name: "React" }, { name: "Next.js" }, { name: "Astro" }],
  },
  {
    label: { en: "Cloud & tooling", es: "Nube y herramientas" },
    items: [
      { name: "AWS (Lambda, ECS, S3, RDS, SQS)" },
      { name: "Docker" },
      { name: "Terraform" },
      { name: "CI/CD" },
    ],
  },
  {
    label: { en: "AI", es: "IA" },
    items: [
      { name: "LLM / RAG" },
      { name: "LLM evals" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "pgvector" },
      { name: "Qdrant" },
      { name: "LiveKit" },
      { name: "OpenAI" },
    ],
  },
  {
    label: { en: "Coding agents", es: "Agentes de código" },
    items: [{ name: "Claude Code" }, { name: "Codex" }, { name: "OpenCode" }],
  },
]
