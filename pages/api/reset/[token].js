export default async (req, res) => {
    switch(req.method) {
        case "GET":
            fetchToken(req, res)
            break;
    }
}


const fetchToken = async(req, res) => {
    console.log(req.query.token)
    parseToken(req.query.token)
    res.json({msg: "Yo"})
}