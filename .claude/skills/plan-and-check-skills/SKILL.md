---
name: plan-and-check-skills
description: Use before starting any development task in this habit-tracker project — plans the task, checks whether an existing skill (user-level or project-level) already covers it, and evaluates whether the work is repeatable enough to warrant authoring a new project skill.
---

# Plan and Check Skills

For every development task in this project, work through these steps before writing code:

## 1. Plan the task

Write a brief plan: what will change, and which files are affected. Keep it short — a few bullet points, not a document.

## 2. Check existing skills

Before implementing, check whether an existing skill already covers this task:

- User-level skills in `~/.claude/skills/`
- This project's skills in `.claude/skills/`

If a relevant skill exists, use it instead of reinventing the approach.

## 3. Consider a new skill

After scoping (or completing) the task, judge whether it's a recurring, project-specific pattern worth capturing — not a one-off. If so, propose creating a new skill at `.claude/skills/<name>/SKILL.md` (same frontmatter format as this file: `name` + a trigger-style `description`). Propose it to the user rather than creating it silently.
