import userRepository from '../repo/userRepo.js';

export const registerUser = async (userData) => {
  try {
    return await userRepository.createUser(userData);
  } catch (error) {
    throw new Error('Error during user registration');
  }
};

export const getUserProfile = async (userId) => {
  try {
    return await userRepository.getUserById(userId);
  } catch (error) {
    throw new Error('Error fetching user profile');
  }
};
