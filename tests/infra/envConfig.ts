// The below can be used in a Jest global setup file or similar for your testing set-up
import { loadEnvConfig } from "@next/env";
import next from "next";

export default async () => {
  next({});
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
