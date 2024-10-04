const News = require("../schema/newsSchema");

exports.createNews = async (req, res) => {
  try {
    const { title, content, status } = req.body;

    const newNews = new News({ title, content, status });

    const savedNews = await newNews.save();

    res
      .status(200)
      .json({ message: "success", news: savedNews });
  } catch (err) {
    res.status(200).json({ message: `Server error: ${err.message}` });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find();
    res.status(200).json({message:"success",data:newsList});
  } catch (err) {
    res.status(200).json({ message: `Server error: ${err.message}` });
  }
};

exports.deleteNews = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedNews = await News.findByIdAndDelete(id);
  
      if (!deletedNews) {
        return res.status(200).json({ message: 'News not found' });
      }
  
      res.status(200).json({ message: 'success' });
    } catch (err) {
      res.status(200).json({ message: `Server error: ${err.message}` });
    }
  };

  exports.updateNews = async (req, res) => {
    try {
      const { id } = req.params;  // Get the id of the news article to update
      const { title, content, status } = req.body;  // Get updated fields from the request body
  
      // Find the news article by its ID and update it
      const updatedNews = await News.findByIdAndUpdate(
        id,
        { title, content, status },
        { new: true, runValidators: true }  // Return the updated document and validate the inputs
      );
  
      if (!updatedNews) {
        return res.status(200).json({ message: 'News not found' });
      }
  
      res.status(200).json({ message: 'success'});
    } catch (err) {
      res.status(200).json({ message: `Server error: ${err.message}` });
    }
  };
  
  
