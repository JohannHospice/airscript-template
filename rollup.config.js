import glob from "glob";
import fs from "fs";
import dotenv from "dotenv";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

const env = (() => {
  const path = process.env[`npm_package_dotenv_${process.env.BUILD}`];
  const { parsed, error } = dotenv.config({
    path: path,
  });

  if (error) {
    console.warn(`Error occured while loading environment.`);
  } else {
    console.log(
      process.env.BUILD
        ? `Environment ${process.env.BUILD}(${path}) loaded.`
        : "Environment by default loaded."
    );
  }
  return parsed || {};
})();

// nettoyage du dossier de compilation
fs.rmdirSync("./dist", { recursive: true });

// https://rollupjs.org/guide/en/#big-list-of-options
export default glob.sync("./src/scripts/*.{js,ts}").map((path) => ({
  input: path,
  output: {
    // ES Module permet "un top-level await" => etre globalement en asynchrone
    format: "es",
    entryFileNames: "[name].bundle.js",
    dir: "dist",
    preserveModules: false,
    hoistTransitiveImports: false,
  },
  plugins: [
    // Injection des variables d'environnements
    replace(
      Object.keys(env).reduce(
        (acc, key) => ({
          ...acc,
          [`process.env.${key}`]: JSON.stringify(env[key]),
        }),
        {}
      )
    ),
    // transpile les modules importés en cjs
    commonjs({
      include: /node_modules/,
    }),
    // inclus les modules importés dans les script
    nodeResolve(),
  ],
}));
