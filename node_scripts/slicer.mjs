import { trace } from "potrace";
import { JSDOM } from "jsdom";
import { optimize } from "svgo";
import { readdirSync, writeFileSync } from "fs";

const XMLNS = "http://www.w3.org/2000/svg",
    dirPath = process.env.npm_config_dir,
    resPath = process.env.npm_config_res;

function traceSync(fileName) {
    return new Promise((res, _) => {
        trace(fileName, (err, svg) => {
            if (err) {
                console.log(`Error when parsing ${fileName}!`);
            } else {
                console.log(`${fileName} parsed.`);
                res(svg)
            }
        })
    })
}

// Assemble the SVG

const dom = new JSDOM(
    await (Promise.all(
        readdirSync(dirPath).map(async fileName =>
            traceSync(`${dirPath}/${fileName}`)
        )
    ))),
    paths = dom.window.document.querySelectorAll("svg path"),
    svg = dom.window.document.createElementNS(XMLNS, "svg");

svg.setAttribute("xmlns", XMLNS);
svg.setAttribute("viewBox", dom.window.document.querySelector("svg").getAttribute("viewBox"));
svg.append(...paths);

// Do some cleaning

for (const path of svg.querySelectorAll("path")) {
    const d = path.getAttribute("d").trim();
    const newPath = dom.window.document.createElementNS(XMLNS, "path");
    newPath.setAttribute("d", d);
    svg.replaceChild(newPath, path);
}

// Optimize and save

writeFileSync(resPath, optimize(svg.outerHTML, {
    multipass: true,
    plugins: [
        {
            name: "preset-default",
            params: {
                "floatPrecision": 0,
            }
        },
        "mergePaths",
    ]
}).data)

console.log("Finish !")