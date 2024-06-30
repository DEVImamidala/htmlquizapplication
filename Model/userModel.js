const pool = require('../Config/dbconn');


    class userModel {
        async getQuestionByText(questionText) {
            const query = `
              SELECT question_id
              FROM questions
              WHERE question_text = $1
            `;
            const { rows } = await pool.query(query, [questionText]);
            return rows[0];
          }
          
          async check(userData) {
            const { question_id, options } = userData;
            try {
              const query = `
                SELECT COUNT(*) AS correct_count
                FROM answer
                WHERE question_id = $1
                AND options = ANY($2::text[]) 
                AND is_correct = true
              `;
              const { rows } = await pool.query(query, [question_id, options]);
              const correctCount = parseInt(rows[0].correct_count);
              const allCorrect = correctCount === options.length;
              return allCorrect;
            } catch (error) {
              console.error('Error checking quiz:', error);
              throw error;
            }
          }
          
    

    
    
    async display(user){
        const query = `SELECT options,question_text,is_correct
        FROM answer
        INNER JOIN questions ON answer.question_id = questions.question_id `;
        const {rows} = await pool.query(query);
       

        return rows;
    }
 







    // async questiondisplay(user){
    //     const query = 'select question_text from questions';
    //     const {rows} = await pool.query(query);
    //     return rows;
    // }
}

module.exports = new userModel();

