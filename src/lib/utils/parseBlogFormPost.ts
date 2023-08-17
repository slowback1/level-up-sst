const formKeys = {
    title: "title",
    body: "body",
    image: "image"
}

export default function parseBlogFormPost(post: string): { title: string; body: string; image: number; } {
    let sections = post.split("&");

    let result = {
        body: "",
        image: 0,
        title: ""
    }

    sections.forEach(section => {
        let [key, value] = section.split("=");

        switch (key) {
            case formKeys.title:
                result.title = value;
                break;
            case formKeys.body:
                result.body = value;
            case formKeys.image:
                result.image = Number(value);
        }
    })

    return result;
}