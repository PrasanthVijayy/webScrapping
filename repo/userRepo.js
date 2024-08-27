import User  from '../models/userModel.js';

export const getUserById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw new Error('Error retrieving user');
  }
};

export const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error('Error creating user');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(userData);
    }
    throw new Error('User not found');
  } catch (error) {
    throw new Error('Error updating user');
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      return await user.destroy();
    }
    throw new Error('User not found');
  } catch (error) {
    throw new Error('Error deleting user');
  }
};
