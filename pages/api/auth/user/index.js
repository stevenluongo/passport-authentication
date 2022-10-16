import nextConnect from 'next-connect';

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    // await csrf(req, res);
    // const response = await createLocalUser(req.body);
    // res.status(201).json({ success: true, ...response });
    res.status(201).json({ msg: 'hi' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default handler;
