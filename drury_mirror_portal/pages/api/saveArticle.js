
import excuteQuery from "../../backend/mysqldb";

export default async (req, res) => {
    try {
        console.log("Called saveArticle route");
        const body = req.body;
        console.log("article", body.article);

        let articleString = body.article;

        const result = await excuteQuery({
            query: 'INSERT INTO test(article) VALUES(?)',
            values: articleString
        });
        res.status(201).json({msg: "Insertion Successful"});
        console.log("here");
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }

};
