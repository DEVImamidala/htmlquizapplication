const userModel = require('../Model/userModel');

class userController {
   async check(req, res) {
    const { userResponses } = req.body;

    // Log the incoming request body
    console.log('Received userResponses:', userResponses);

    // Validate the structure of userResponses
    if (!Array.isArray(userResponses)) {
      console.error("userResponses is not an array");
      return res.status(400).send({ error: "Invalid input: userResponses should be an array" });
    }

    for (const response of userResponses) {
      if (typeof response.question_text !== 'string' || typeof response.options !== 'string') {
        console.error("Invalid structure in userResponses");
        return res.status(400).send({ error: "Invalid input: Each response should have a question_text and a selectedOption" });
      }
    }

    try {
      const results = await Promise.all(
        userResponses.map(async (userData) => {
          const question = await userModel.getQuestionByText(userData.question_text);
          if (!question) {
            throw new Error(`Question "${userData.question_text}" not found`);
          }

          const allCorrect = await userModel.check({
            question_id: question.question_id,
            options: [userData.selectedOption] // Assuming one option is selected for each question
          });

          return allCorrect;
        })
      );

      const allCorrect = results.every(result => result === true);

      if (allCorrect) {
        res.status(200).json({ message: 'All choices are correct' });
      } else {
        res.status(400).json({ message: 'Some choices are incorrect' });
      }
    } catch (error) {
      console.error('Checking error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
    // async display(req,res){
    //     const user = req.body;
    //     try{
    //         const users = await userModel.display(user);
    //         res.status(200).json({status:1,message:'all options are',users})
    //     }
    //     catch(error){
    //         console.log(error);
    //         res.status(420).json({status:0,message:'error in displaying options'})
    //     }
    // }
    async questiondisplay(req, res) {
      const user = req.body;
  
      try {
          const options = await userModel.display(user);
  
          // Construct an object to organize options by question text
          const uniqueOptions = {};
  
          // Group options by question_text
          options.forEach(option => {
              const { question_text, options, is_correct } = option;
              if (!uniqueOptions[question_text]) {
                  uniqueOptions[question_text] = { options: [], is_correct: [] };
              }
              uniqueOptions[question_text].options.push(options);
              uniqueOptions[question_text].is_correct.push(is_correct);
          });
  
          // Convert uniqueOptions object into an array of objects
          const formattedOptions = Object.keys(uniqueOptions).map(question_text => ({
              question_text,
              options: uniqueOptions[question_text].options,
              is_correct: uniqueOptions[question_text].is_correct
          }));
  
          console.log(formattedOptions);
  
          res.status(200).json({ status: 1, message: 'Answers are', formattedOptions });
      } catch (error) {
          console.log(error);
          res.status(500).json({ status: 0, message: 'Error in displaying questions' });
      }
  }
  
    
}

module.exports = new userController();


