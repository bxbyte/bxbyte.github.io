# Wait ... where is the source code ?

<link href="" rel="stylesheet">
As you can see, none of the source code is stored here, as it came from a submodule, a private repo of me used to hide you from the horrible mess that this website is.

```mermaid
graph
    classDef publicRepo fill:#477287,color:#eee;
    classDef privateRepo fill:#913a3a,color:#eee;

    public("bxbyte.github (public)"):::publicRepo
    src("bxbyte.github.src (private)"):::privateRepo
    articles("bxbyte.github.articles (private)"):::privateRepo

    workflow([<a href="https://github.com/bxbyte/bxbyte.github.io/blob/main/.github/workflows/publish.yml">Publisher workflow</a>])

    website{{<a href="https://bxbyte.net"> bxbyte.net</a>}}
    style workflow stroke-dasharray: 4,stroke-width:2

    public  == ./src/ ==> src
    src  == ./website/articles/ ==> articles

    src  -. Tag events .-> workflow
    articles -. Push events .-> workflow

    public -. Manual events .-> workflow

    workflow -. Push .-> public

    workflow -. Build & publish .-> website
```
