export async function CallArticleData(id) {

    let data = {
        articleID: id,
    };

    let payload = JSON.stringify(data);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: payload,
    };

    const endpoint = "localhost:3000/api/GetArticleBySlug";

    let response = await fetch(endpoint, options);
    let resData = await response.json();
    console.log("🚀 ~ file: [slug].js:141 ~ getStaticProps ~ resData", resData);

    // Combine the data with the id
    return {
        id,
        ...resData,
    };
}
