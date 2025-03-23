/* eslint-disable */
import fs from "fs";
import path from "path";

const { promises: fsPromises } = fs;

// Define the app directory
const appDirectory = "./";

// Define paths
const packageJsonPath = path.join(appDirectory, "package.json");
const ecosystemSrc = path.join(appDirectory, "ecosystem.config.cjs");
const standaloneSrc = path.join(appDirectory, ".next", "standalone");
const staticSrc = path.join(appDirectory, ".next", "static");
const publicSrc = path.join(appDirectory, "public");

// Function to get the version from package.json
async function getVersion() {
    try {
        const data = await fsPromises.readFile(packageJsonPath, "utf-8");
        const packageJson = JSON.parse(data);
        return packageJson.version;
    } catch (err) {
        console.error("GlobalError reading package.json:", err);
        throw err;
    }
}

// Function to get the current date and time in YYYYMMDD_HHmmss format
function getCurrentDateTime() {
    const date = new Date();
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // const hours = String(date.getHours()).padStart(2, '0');
    // const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');
    // return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    return date.toISOString();
}

// Function to copy directory recursively
async function copyDirectory(src, dest) {
    try {
        await fsPromises.mkdir(dest, { recursive: true });
        const entries = await fsPromises.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await copyDirectory(srcPath, destPath);
            } else {
                await fsPromises.copyFile(srcPath, destPath);
            }
        }
    } catch (err) {
        console.error("GlobalError copying directory:", err);
        throw err;
    }
}

// Function to create and rename directory
async function createAndRenameDirectory(version) {
    const currentDateTime = getCurrentDateTime();
    const frontendDir = path.join(
        appDirectory,
        `Football@${version}_${currentDateTime}`,
    );

    try {
        // Create the new directory
        await fsPromises.mkdir(frontendDir, { recursive: true });

        // Copy ecosystemEU.config.cjs to the new directory
        await fsPromises.copyFile(
            ecosystemSrc,
            path.join(frontendDir, "ecosystem.config.cjs"),
        );

        // Copy files from .next/standalone to the new directory
        await copyDirectory(standaloneSrc, path.join(frontendDir, "standalone"));

        // Copy static files to standalone/.next
        await copyDirectory(
            staticSrc,
            path.join(frontendDir, "standalone", ".next", "static"),
        );

        // Copy public files to standalone
        await copyDirectory(
            publicSrc,
            path.join(frontendDir, "standalone", "public"),
        );

        console.log(
            "Files and directories have been copied and renamed successfully.",
        );
    } catch (err) {
        console.error("GlobalError during file operations:", err);
    }
}

// Run all operations
async function run() {
    try {
        const version = await getVersion();
        await createAndRenameDirectory(version);
    } catch (err) {
        console.error("GlobalError:", err);
    }
}

run();
