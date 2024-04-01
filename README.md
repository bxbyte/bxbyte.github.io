# Wait ... where is the source code ?

<link href="" rel="stylesheet">
As you can see, none of the source code is stored here, as it came from a submodule, a private repo of me used to hide you from the horrible mess that this website is.

## Repositery structure

Here you see how was structured the repo, each color representing a different repo.

```mermaid
graph TD
    classDef publicRepo fill:#477287,color:#eee;
    classDef sourceRepo fill:#913a3a,color:#eee;
    classDef articlesRepo fill:#785fc9,color:#eee;

    public("bxbyte.github (public)"):::publicRepo
    src("bxbyte.github.src (private)"):::sourceRepo
    articles("bxbyte.github.articles (private)"):::articlesRepo

    action([<a href="https://github.com/bxbyte/bxbyte.github.io/blob/main/.github/actions/publish.yml">Build & Publish</a>]):::publicRepo

    website{{<a href="https://lucas-maillet.com">lucas-maillet.com</a>}}

    public  == "`*./src*`" ==> src
    src  == "`*./website/articles/*`" ==> articles

    src  -. Trigger on tag \n release .-> action
    articles -. "Trigger on  \n ./articles push" .-> action

    action -. Push on \n change .-> public

    action -. Deploy on \n Github Pages .-> website
```
