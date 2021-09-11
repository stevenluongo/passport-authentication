import connectDB from "../../utils/connectDB";

export default (req, res) => {
    switch(req.method) {
        case 'GET':
            login(req, res); 
    }
}


const login = async(req, res) => {
    const data = await connectDB();
    res.json({hello: data})
}