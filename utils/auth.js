const bcrypt = require('bcrypt')
const hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  };
  
  const comparePassword = async (password, hashedPassword) => {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw error;
    }
  };

  module.exports={
    hashPassword,
    comparePassword
  }