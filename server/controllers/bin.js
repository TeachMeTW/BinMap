


// test
export const createListing = async(req, res) => {
    res
    .status(201)
    .json({success:true, result: {id:64920, title: 'Test Bin'}})
}